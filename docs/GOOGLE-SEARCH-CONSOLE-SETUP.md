# Google Search Console Setup Guide

## Step 1: Add Property to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"URL prefix"** option
4. Enter: `https://www.kcfhomes.com`
5. Click **Continue**

## Step 2: Verify Ownership

Google will provide several verification options. We recommend **HTML tag method**:

### HTML Tag Verification (Recommended)

1. Google will show you a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```

2. Copy the `content` value (YOUR_CODE_HERE part)

3. Update `/src/app/layout.tsx` to add this to the `<head>`:
   - Find the `metadata` export
   - Add to the `verification` object:
   ```typescript
   export const metadata: Metadata = {
     // ... existing metadata
     verification: {
       google: 'YOUR_CODE_HERE',
     },
   };
   ```

4. Deploy the changes to Vercel
5. Wait 1-2 minutes for deployment
6. Return to Google Search Console and click **"Verify"**

### Alternative: DNS Verification (If you have DNS access)

1. Get the TXT record from Google Search Console
2. Add it to your domain's DNS settings (wherever kcfhomes.com DNS is managed)
3. Wait for DNS propagation (can take 24-48 hours)
4. Click **"Verify"** in Google Search Console

## Step 3: Submit Sitemap

Once verified:

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter sitemap URL: `https://www.kcfhomes.com/sitemap.xml`
3. Click **Submit**

Your sitemap will be automatically discovered and indexed by Google.

## Step 4: Monitor Performance

After 2-3 days, you'll start seeing data:

- **Performance**: Search queries, clicks, impressions, CTR
- **Coverage**: Which pages are indexed
- **Enhancements**: Core Web Vitals, mobile usability
- **Manual Actions**: Any penalties (hopefully none!)

## What You'll See

Within 1-2 weeks, you should see:
- 37 pages indexed (all static pages + blog posts + neighborhoods + services)
- Search queries that drive traffic
- Average position in Google search
- Click-through rates

## Recommended Actions After Setup

1. **Check Coverage Report** - Ensure all 37 pages are indexed
2. **Review Core Web Vitals** - See performance metrics
3. **Monitor Search Queries** - Track which keywords drive traffic
4. **Fix Any Errors** - Address any indexing issues Google finds
5. **Set up Email Alerts** - Get notified of critical issues

## Need Help?

If you get stuck, I can help with:
- Adding the verification meta tag
- Debugging verification issues
- Interpreting GSC reports
