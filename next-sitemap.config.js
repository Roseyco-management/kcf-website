/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kcfhomes.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://kcfhomes.com/server-sitemap.xml', // For dynamic routes if needed
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Blog posts change less frequently
    else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Neighborhoods are updated regularly
    else if (path.startsWith('/neighborhoods')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Services are important but static
    else if (path.startsWith('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // Contact and other pages
    else if (path === '/contact' || path === '/about' || path === '/agents') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
};
