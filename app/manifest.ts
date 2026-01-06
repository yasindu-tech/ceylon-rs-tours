import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Luxvio Ceylon',
        short_name: 'Luxvio',
        description: 'Luxury Sri Lanka Travel Experiences',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#C5A059',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
