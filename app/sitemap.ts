import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nationalcake.ng'
  
  // Only include canonical routes that should be indexed
  const routes = [
    { path: '', priority: 1.0, changeFreq: 'weekly' }, // Home
    { path: '/about', priority: 0.8, changeFreq: 'monthly' },
    { path: '/gallery', priority: 0.8, changeFreq: 'weekly' },
    { path: '/become-an-agent', priority: 0.7, changeFreq: 'monthly' },
    { path: '/community', priority: 0.7, changeFreq: 'weekly' },
    { path: '/order', priority: 0.9, changeFreq: 'weekly' },
    // Excluded: /Order/Price (legacy route, should redirect to /order)
    // Excluded: /not-found (error page, should not be in sitemap)
    // Excluded: /About/*, /Agent/*, /Home/* (section pages, not meant to be standalone)
  ]

  const now = new Date().toISOString()

  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority,
  }))
}
