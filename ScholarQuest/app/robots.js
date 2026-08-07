export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/provider/', '/dashboard/', '/dashboard/*'],
    },
    sitemap: 'https://scholar-quest-ten.vercel.app/sitemap.xml',
  }
}
