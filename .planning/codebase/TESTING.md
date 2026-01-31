# Testing Practices

## Current State

### ❌ NO TESTING INFRASTRUCTURE

**Zero test coverage** across the entire codebase.

- **No test framework installed**:
  - ❌ Jest
  - ❌ Vitest
  - ❌ Playwright
  - ❌ Cypress

- **No test utilities**:
  - ❌ @testing-library/react
  - ❌ @testing-library/jest-dom
  - ❌ @testing-library/user-event

- **No test files**:
  - ❌ No `.test.ts` files
  - ❌ No `.test.tsx` files
  - ❌ No `.spec.ts` files
  - ❌ No `.spec.tsx` files
  - ❌ No `__tests__/` directories

## Code Quality Tools

### Linting

**ESLint 9.x (FlatConfig)**
- Configuration: `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`
- Global ignores: `.next`, `out`, `build`, `next-env.d.ts`

**Run command**:
```bash
npm run lint
```

### Type Checking

**TypeScript 5.x**
- Configuration: `tsconfig.json`
- `"strict": true` enabled
- Type coverage: 100% (no `any` types used)
- Compiler options:
  - `"target": "ES2017"`
  - `"jsx": "react-jsx"`
  - `"moduleResolution": "bundler"`
  - `"isolatedModules": true`

**Type check command**:
```bash
npx tsc --noEmit
```

### Performance Testing

**Lighthouse CLI**
- Script: `lighthouse-audit.mjs`
- Audits: Performance, Accessibility, Best Practices, SEO
- Can test locally or against production

**Run commands**:
```bash
npm run lighthouse           # Test local build
npm run lighthouse:prod      # Test production site
npm run perf:test            # Build + start + audit
```

**Output**: Lighthouse reports saved to disk (no automated threshold enforcement)

## Manual Testing Approach

### Current Workflow
1. Developer makes changes
2. Run `npm run dev` to test locally
3. Check browser console for errors
4. Manually test forms and interactions
5. Check `npm run lint` for linting errors
6. Deploy to Vercel preview
7. Manually test preview deployment
8. Merge to production

### No Automated Testing Gates
- No pre-commit hooks for tests
- No CI/CD test pipeline
- No automated regression testing
- No coverage reports

## Testing Gaps

### Critical Gaps

**1. API Route Testing**
- No tests for `/api/contact` form submission
- No tests for `/api/level-up` form submission
- No tests for `/api/meta-capi` event tracking
- No tests for `/api/admin/analytics` data fetching
- No validation that error handling works correctly

**2. Form Validation Testing**
- Contact form submission not tested
- Level-up questionnaire not tested
- Login form not tested
- Honeypot spam protection not tested

**3. Authentication Testing**
- Login flow not tested
- Logout flow not tested
- Protected route access not tested
- Session expiration not tested

**4. Component Testing**
- UI components (Button, Card, etc.) not tested
- Section components (Hero, FAQ, etc.) not tested
- Admin dashboard components not tested
- Chart components not tested

**5. Integration Testing**
- Email sending not tested (Resend integration)
- Analytics tracking not tested (Meta, GA)
- Database operations not tested (Supabase)
- RoseyCo API integration not tested

**6. E2E Testing**
- No user journey tests
- No critical path testing (contact form → email → tracking)
- No admin dashboard workflow testing

### High-Risk Areas (No Test Coverage)

**1. Admin Dashboard** (`src/app/admin/page.tsx`)
- 336 lines of complex data formatting logic
- No tests for metric calculations
- No tests for chart data generation
- Changes could break dashboard display silently

**2. Email Templates** (`src/app/api/contact/route.ts`, `src/app/api/level-up/route.ts`)
- HTML email templates with user data interpolation
- Security risk: unescaped HTML (no validation tests)
- No tests that emails are actually sent

**3. Analytics Tracking** (`src/lib/track-event.ts`, `src/lib/meta-events.ts`)
- Complex dual-platform tracking (client + server)
- No tests that events are fired
- No tests for PII hashing before CAPI
- No tests for error handling

**4. Static Data** (`src/data/*.ts`)
- 3,284 lines of data
- No tests that data structures are valid
- No tests for SEO metadata completeness
- No tests for image path validity

## Recommended Testing Strategy

### Phase 1: Foundation (Estimated 1-2 days)

**Install Vitest** (recommended over Jest for Next.js):
```bash
npm install -D vitest @vitejs/plugin-react
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
```

**Configure Vitest** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Add test scripts** to `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Phase 2: Unit Tests (Estimated 2-3 days)

**Priority 1: Utility Functions**
- `src/lib/utils.ts` - `cn()` function
- `src/lib/analytics/formatters.ts` - Data formatting
- `src/lib/analytics/calculations.ts` - Metric calculations

**Priority 2: UI Components**
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- Test variants, props, accessibility

**Priority 3: Section Components**
- `src/components/sections/hero.tsx`
- `src/components/sections/faq-section.tsx`
- Test rendering, props, animations

### Phase 3: Integration Tests (Estimated 3-4 days)

**API Route Tests** (using `next-test-api-route-handler`):
```typescript
import { testApiHandler } from 'next-test-api-route-handler'
import * as contactHandler from '@/app/api/contact/route'

describe('POST /api/contact', () => {
  it('should send emails on valid submission', async () => {
    await testApiHandler({
      handler: contactHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            message: 'Test message',
          }),
        })
        const data = await response.json()
        expect(data.success).toBe(true)
      },
    })
  })

  it('should reject submissions with honeypot filled', async () => {
    // Test bot protection
  })
})
```

**Form Submission Tests**:
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/sections/contact-form'

describe('ContactForm', () => {
  it('should submit form data successfully', async () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })
})
```

### Phase 4: E2E Tests (Estimated 3-5 days)

**Install Playwright**:
```bash
npm install -D @playwright/test
npx playwright install
```

**Critical User Journeys**:
```typescript
import { test, expect } from '@playwright/test'

test('contact form submission flow', async ({ page }) => {
  await page.goto('/contact')

  // Fill form
  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'Test message')

  // Submit
  await page.click('button[type="submit"]')

  // Verify success
  await expect(page.locator('text=Thank You!')).toBeVisible()
})

test('admin login flow', async ({ page }) => {
  await page.goto('/admin/login')

  await page.fill('input[name="email"]', 'admin@kcfhomes.com')
  await page.fill('input[name="password"]', 'test-password')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL('/admin')
  await expect(page.locator('h1')).toContainText('Analytics Dashboard')
})
```

### Phase 5: Coverage Goals

**Target Coverage**:
- **Utilities**: 90%+
- **Components**: 70%+
- **API Routes**: 80%+
- **Overall**: 60%+

**Coverage Report**:
```bash
npm run test:coverage
```

## Continuous Integration

### Recommended CI Pipeline (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Quick Win Implementation

### Immediate Action Items

1. **Install Vitest** (1-2 hours)
   - Add dependencies
   - Configure `vitest.config.ts`
   - Add test scripts to `package.json`

2. **Write First Tests** (2-3 hours)
   - Test `cn()` utility function
   - Test Button component variants
   - Test one API route (contact form)

3. **Set Up CI** (1 hour)
   - Add GitHub Actions workflow
   - Run tests on every PR

**Total Time**: 4-6 hours for basic testing infrastructure

---

*Last analyzed: 2026-01-31*
