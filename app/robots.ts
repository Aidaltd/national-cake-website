import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nationalcake.ng'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api/admin',
          '/api/admin/*',
        ],
      },
      // Explicit allowance for AI Search & Answer Engines (Perplexity, ChatGPT, Claude, Google Gemini)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: [
          '/',
          '/order',
          '/about',
          '/gallery',
          '/donate-to-schools',
          '/championship',
          '/activities',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api/admin',
          '/api/admin/*',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
