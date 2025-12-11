import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      disabled: false,
    },
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  };

  // Run against production URL or localhost
  const url = process.env.LIGHTHOUSE_URL || 'http://localhost:3000';
  console.log(`\nRunning Lighthouse audit on: ${url}\n`);

  const runnerResult = await lighthouse(url, options);

  // Output the report to file
  const reportJson = runnerResult.report;
  fs.writeFileSync('lighthouse-report.json', reportJson);

  // Parse and display key metrics
  const results = JSON.parse(reportJson);
  const audits = results.audits;

  console.log('\n========================================');
  console.log('LIGHTHOUSE AUDIT RESULTS');
  console.log('========================================\n');

  console.log('Scores:');
  console.log(`  Performance: ${Math.round(results.categories.performance.score * 100)}/100`);
  console.log(`  Accessibility: ${Math.round(results.categories.accessibility.score * 100)}/100`);
  console.log(`  Best Practices: ${Math.round(results.categories['best-practices'].score * 100)}/100`);
  console.log(`  SEO: ${Math.round(results.categories.seo.score * 100)}/100\n`);

  console.log('Core Web Vitals:');
  console.log(`  LCP (Largest Contentful Paint): ${audits['largest-contentful-paint'].displayValue}`);
  console.log(`  TBT (Total Blocking Time): ${audits['total-blocking-time'].displayValue}`);
  console.log(`  CLS (Cumulative Layout Shift): ${audits['cumulative-layout-shift'].displayValue}\n`);

  console.log('Key Performance Metrics:');
  console.log(`  First Contentful Paint: ${audits['first-contentful-paint'].displayValue}`);
  console.log(`  Speed Index: ${audits['speed-index'].displayValue}`);
  console.log(`  Time to Interactive: ${audits['interactive'].displayValue}\n`);

  console.log('Performance Opportunities:');
  const opportunities = [
    'render-blocking-resources',
    'unused-javascript',
    'unused-css-rules',
    'uses-optimized-images',
    'modern-image-formats',
    'offscreen-images',
    'unminified-javascript',
    'unminified-css',
    'uses-text-compression',
    'uses-responsive-images',
    'efficient-animated-content',
    'duplicated-javascript',
    'legacy-javascript',
    'total-byte-weight',
    'uses-long-cache-ttl',
    'font-display',
    'uses-rel-preconnect',
  ];

  let hasOpportunities = false;
  opportunities.forEach(id => {
    const audit = audits[id];
    if (audit && audit.score !== null && audit.score < 1 && audit.details && audit.details.overallSavingsMs > 100) {
      hasOpportunities = true;
      console.log(`  ⚠️  ${audit.title}`);
      console.log(`      Potential savings: ${audit.details.overallSavingsMs}ms`);
      if (audit.displayValue) {
        console.log(`      Current: ${audit.displayValue}`);
      }
    }
  });

  if (!hasOpportunities) {
    console.log('  ✅ No major opportunities found!\n');
  } else {
    console.log('');
  }

  console.log('SEO Issues:');
  const seoAudits = [
    'meta-description',
    'document-title',
    'link-text',
    'crawlable-anchors',
    'is-crawlable',
    'robots-txt',
    'image-alt',
    'hreflang',
    'canonical',
  ];

  let hasSEOIssues = false;
  seoAudits.forEach(id => {
    const audit = audits[id];
    if (audit && audit.score !== null && audit.score < 1) {
      hasSEOIssues = true;
      console.log(`  ⚠️  ${audit.title}`);
      if (audit.description) {
        console.log(`      ${audit.description}`);
      }
    }
  });

  if (!hasSEOIssues) {
    console.log('  ✅ No major SEO issues found!\n');
  } else {
    console.log('');
  }

  console.log('========================================');
  console.log(`Full report saved to: lighthouse-report.json`);
  console.log('========================================\n');

  await chrome.kill();
}

runLighthouse().catch(err => {
  console.error('Error running Lighthouse:', err);
  process.exit(1);
});
