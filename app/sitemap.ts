import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.luxvioceylon.com'

    // Static routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tours`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ]

    // Example of how to add dynamic routes from a database
    /*
    const tours = await getToursFromDatabase()
    const tourRoutes = tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      lastModified: new Date(tour.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
    return [...routes, ...tourRoutes]
    */

    return routes
}
