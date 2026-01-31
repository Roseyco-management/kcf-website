# Technical Debt & Security Concerns

## Security Concerns

### 🔴 CRITICAL

**1. Unescaped HTML User Input in Email Templates**

**Location**:
- `src/app/api/contact/route.ts` (lines 54, 60, 63, 66, 100, 110)
- `src/app/api/level-up/route.ts` (lines 29, 56, 61, 66, 72-78, 112)

**Issue**: User-submitted form data (`message`, `name`, `email`, `phone`, `question1`, `question2`, `question3`, `fullName`) is directly interpolated into HTML email templates using template literals without proper escaping.

**Example**:
```typescript
html: `
  <div class="message-box">
    <p>${message.replace(/\n/g, '<br>')}</p>
  </div>
  <span class="info-label">Name:</span> ${name}
`
```

**Risk**:
- If an attacker submits HTML/script content, it could be rendered in email readers
- If email content is ever displayed in a web interface, XSS vulnerability
- While Resend may sanitize, relying on third-party is not secure practice

**Recommendation**:
- Create `escapeHtml()` utility function
- Escape all user data before inserting into HTML templates
- Example: `${escapeHtml(name)}`, `${escapeHtml(message)}`

---

**2. API Key Exposed in URL Query Parameter**

**Location**: `src/lib/roseyco-analytics.ts` (line 81)

**Issue**:
```typescript
const url = `${ROSEYCO_API_BASE_URL}/api/clients/${ROSEYCO_CLIENT_SLUG}/analytics?apiKey=${ROSEYCO_API_KEY}&startDate=${start}&endDate=${endDate}`;
```

**Risk**:
- API keys in URLs can be logged in:
  - Proxy logs
  - Server access logs
  - Browser history
  - Referrer headers
- Violates security best practices

**Recommendation**:
- Use HTTP Authorization header instead:
  ```typescript
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${ROSEYCO_API_KEY}`,
    },
  });
  ```

---

**3. Missing .env.example File**

**Location**: Project root

**Issue**:
- No `.env.example` file in repository
- New developers won't know what environment variables are required
- `src/lib/roseyco-analytics.ts` (line 101) mentions adding to `.env.local` but no template exists

**Required Environment Variables** (inferred from code):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=

# Analytics
META_PIXEL_ID=
META_ACCESS_TOKEN=
ROSEYCO_API_KEY=
ROSEYCO_CLIENT_SLUG=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=

# Other
SITE_URL=
```

**Recommendation**: Create `.env.example` with all required variables (values redacted)

---

### 🟠 HIGH PRIORITY

**4. Potential API Response Logging Exposure**

**Location**:
- `src/app/api/meta-capi/route.ts` (line 81)
- `src/lib/roseyco-analytics.ts` (error handling)
- `src/lib/analytics/fetch-analytics.ts` (error handling)

**Issue**:
```typescript
console.error("Meta CAPI error:", result);
```

**Risk**:
- API responses may contain sensitive data
- Production logs could expose API keys, user data, or internal details
- Console logs in production are security risk

**Recommendation**:
- Sanitize error objects before logging
- Use structured logging (e.g., Winston, Pino)
- Redact sensitive fields in production

---

**5. Missing Input Validation on Regex Operations**

**Location**: `src/app/api/admin/stats/route.ts` (line 106)

**Issue**:
```typescript
const match = asking_price.match(/[\d,]+(?:\.\d+)?/);
```

**Risk**:
- No validation that `asking_price` is a string
- No length limits checked
- Could cause ReDoS (Regular Expression Denial of Service) if input is malicious

**Recommendation**:
- Validate `asking_price` is string and within expected length
- Add input sanitization before regex operations

---

**6. Incomplete Error Handling in Email Routes**

**Location**:
- `src/app/api/contact/route.ts` (lines 133-136)
- `src/app/api/level-up/route.ts` (lines 149-152)

**Issue**:
```typescript
if (adminEmail.error || userEmail.error) {
  console.error("Resend error:", adminEmail.error || userEmail.error);
  return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
}
```

**Risk**:
- No retry logic if email service is temporarily down
- No differentiation between error types (auth error vs network error)
- Silent failures could occur if Resend API partially fails

**Recommendation**:
- Add retry logic for transient errors
- Differentiate error types
- Log detailed error information for debugging

---

**7. Missing JSON Parsing Error Handling**

**Location**:
- `src/app/level-up/page.tsx` (line 42)
- `src/components/sections/contact-form.tsx` (line 59)

**Issue**:
```typescript
const response = await fetch("/api/contact", { ... });
// Missing content-type check
const data = await response.json(); // Could throw if not JSON
```

**Risk**:
- If server returns non-JSON (e.g., HTML error page), this will throw
- Unhandled promise rejections
- Poor user experience

**Recommendation**:
```typescript
if (!response.ok) {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const data = await response.json();
    throw new Error(data.error || "Failed to submit");
  } else {
    throw new Error("Server returned non-JSON response");
  }
}
```

---

## Code Quality Issues

### 🟡 MEDIUM PRIORITY

**8. Duplicate Code in Email Routes**

**Location**:
- `src/app/api/contact/route.ts` (147 lines)
- `src/app/api/level-up/route.ts` (162 lines)

**Issue**: Both routes follow same pattern (95% identical code):
1. Validate input
2. Check honeypot
3. Send admin email
4. Send user email
5. Catch errors

**Impact**:
- Maintenance burden (changes must be made in 2 places)
- Risk of inconsistent behavior
- Violates DRY principle

**Recommendation**:
- Extract shared logic to `src/lib/email-service.ts`:
  ```typescript
  export async function sendFormEmails({
    formType,
    adminEmailTemplate,
    userEmailTemplate,
    replyTo,
  }) {
    // Shared email sending logic
  }
  ```

---

**9. Large Static Data Files**

**Location**:
- `src/data/blog-posts.ts` - 1,134 lines (53KB)
- `src/data/neighborhoods.ts` - 1,124 lines (36KB)
- `src/data/services.ts` - 867 lines (33KB)

**Issue**:
- Static TypeScript arrays for all content
- Difficult to update (requires redeployment)
- No version history (git only)
- Schema duplication (every post has same structure)

**Impact**:
- Non-technical users cannot update content
- Requires developer for blog posts
- Risk of merge conflicts if multiple people edit

**Recommendation** (Long-term):
- Migrate to Supabase database
- Create CMS interface for content management
- Use Incremental Static Regeneration (ISR)

**Note**: This is exactly what the user wants to do with blog posts!

---

**10. Missing ESLint Configuration Visibility**

**Location**: `eslint.config.mjs`

**Issue**:
- ESLint 9 FlatConfig format
- No explicit rules defined (only extends `next/core-web-vitals`)
- Custom rules not documented

**Impact**:
- Team members may not know what rules are enforced
- Inconsistent code style
- Difficult to customize linting

**Recommendation**:
- Document ESLint rules in `eslint.config.mjs`
- Add custom rules for project-specific patterns
- Document in README or CONTRIBUTING.md

---

**11. Hardcoded Configuration Values**

**Location**:
- `src/app/api/admin/analytics/route.ts` (line 31) - GA4 Measurement ID: `"G-RH9LPW46VV"`
- `src/app/api/admin/analytics/route.ts` (line 45) - Clarity Project ID: `"ujsyihkbft"`
- `src/app/layout.tsx` - Same hardcoded IDs

**Issue**: IDs should be environment variables for deployment flexibility

**Recommendation**:
```typescript
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
```

---

## Performance Concerns

### 🟡 MEDIUM PRIORITY

**12. Analytics Cache Strategy**

**Location**:
- `src/lib/roseyco-analytics.ts` (line 84)
- `src/lib/analytics/fetch-analytics.ts` (line 73)

**Issue**:
```typescript
const response = await fetch(url, {
  cache: "no-store", // Forces dynamic fetch on every request
});
```

**Impact**:
- Admin dashboard makes external API calls on every page load
- Slow on poor connections
- Unnecessary load on RoseyCo API

**Recommendation**:
```typescript
const response = await fetch(url, {
  next: { revalidate: 300 }, // Cache for 5 minutes
});
```

---

**13. Mock Data Calculations On Every Request**

**Location**: `src/app/admin/page.tsx` (lines 66-90)

**Issue**: `generateDailyTrendData()` function runs calculations on every dashboard request

**Impact**:
- Unnecessary CPU usage
- Slower page loads
- Could be cached or memoized

**Recommendation**:
- Move to React.memo or Next.js cache
- Pre-calculate on server-side

---

## Documentation Gaps

### 🟢 LOW PRIORITY

**14. Minimal Project Documentation**

**Location**: `README.md`

**Issue**:
- Generic Next.js template README
- No project-specific information
- No onboarding guide
- No API documentation

**Recommendation**:
- Update README with:
  - Project description
  - Setup instructions
  - Environment variables
  - Development workflow
  - Deployment process

---

**15. Complex Logic Without Comments**

**Location**:
- `src/app/api/admin/stats/route.ts` (lines 92-98) - Status grouping logic
- `src/lib/analytics/fetch-analytics.ts` (lines 119-130) - Sparkline generation

**Issue**: Complex algorithms not explained

**Recommendation**: Add inline comments explaining business logic

---

## Testing Gaps

### 🟡 MEDIUM PRIORITY

**16. Zero Test Coverage**

**See**: `TESTING.md` for full details

**Critical untested areas**:
- API routes (contact, level-up, meta-capi)
- Form validation
- Authentication flow
- Admin dashboard calculations
- Email template rendering

**Recommendation**:
- Add Vitest (1-2 days)
- Write unit tests for utilities (2-3 days)
- Write integration tests for API routes (3-4 days)
- Add E2E tests for critical paths (3-5 days)

---

## Dependency Concerns

### 🟢 LOW PRIORITY

**17. No Automated Vulnerability Scanning**

**Issue**:
- No `npm audit` in CI/CD
- No Snyk or similar integration
- Dependencies current but no monitoring

**Recommendation**:
- Add `npm audit` to CI pipeline
- Set up Dependabot or Renovate
- Monitor for security advisories

---

## Summary

### Immediate Action Items (This Sprint)

1. ✅ **Escape HTML in email templates** (Security - 2 hours)
2. ✅ **Move API key to Authorization header** (Security - 1 hour)
3. ✅ **Create .env.example** (Developer experience - 30 minutes)
4. ✅ **Add input validation to regex operations** (Security - 1 hour)

**Total Estimated Time**: 4-5 hours

### Next Sprint

5. Extract duplicate email logic to shared service (Code quality - 3 hours)
6. Add Vitest testing framework (Quality - 1-2 days)
7. Fix analytics cache strategy (Performance - 2 hours)
8. Update documentation (Developer experience - 3 hours)

### Long-Term (Blog Migration Project)

9. **Migrate blog posts to Supabase** (Current user goal!)
   - Will address large static data files issue
   - Enables CMS for non-technical users
   - Allows dynamic content updates
   - Foundation for automated blog generation

---

## Positive Findings

Despite these concerns, the codebase has several **strong security practices**:

✅ Security headers properly configured (HSTS, CSP, X-Frame-Options)
✅ Honeypot field implementation for bot protection
✅ Proper authentication middleware protecting admin routes
✅ Supabase SSR for server-side auth
✅ SHA256 hashing of PII data before Meta API
✅ No obvious SQL injection patterns (using Supabase SDK)
✅ No use of `eval()` or dynamic `Function()` constructors
✅ TypeScript strict mode enabled
✅ ESLint for code quality

---

*Last analyzed: 2026-01-31*
