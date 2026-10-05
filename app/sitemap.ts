import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nationalcake.ng'
  
  // Canonical routes indexed for search engines and AI knowledge graphs
  const routes = [
    { path: '', priority: 1.0, changeFreq: 'weekly' }, // Home
    { path: '/order', priority: 0.95, changeFreq: 'daily' }, // Product & Order
    { path: '/donate-to-schools', priority: 0.9, changeFreq: 'weekly' }, // Project GIANT
    { path: '/about', priority: 0.85, changeFreq: 'monthly' },
    { path: '/gallery', priority: 0.85, changeFreq: 'weekly' },
    { path: '/championship', priority: 0.8, changeFreq: 'weekly' },
    { path: '/activities', priority: 0.8, changeFreq: 'monthly' },
    { path: '/become-an-agent', priority: 0.75, changeFreq: 'monthly' },
    { path: '/community', priority: 0.7, changeFreq: 'weekly' },
  ]

  const now = new Date().toISOString()

  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: changeFreq as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority,
  }))
}
