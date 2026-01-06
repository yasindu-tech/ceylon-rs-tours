import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luxvioceylon.com'),
  title: {
    default: "Luxvio Ceylon | Luxury Sri Lanka Travel & Tours",
    template: "%s | Luxvio Ceylon"
  },
  description: "Discover the Pearl of the Indian Ocean. Tailor-made luxury travel itineraries, ancient temples, and pristine beaches in Sri Lanka.",
  keywords: ["Sri Lanka Travel", "Luxury Tours", "Ceylon Tourism", "Private Driver Sri Lanka"],
  openGraph: {
    title: "Luxvio Ceylon | Luxury Sri Lanka Travel & Tours",
    description: "Discover the Pearl of the Indian Ocean. Tailor-made luxury travel itineraries, ancient temples, and pristine beaches in Sri Lanka.",
    url: "https://www.luxvioceylon.com",
    siteName: "Luxvio Ceylon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxvio Ceylon | Luxury Sri Lanka Travel",
    description: "Tailor-made luxury travel itineraries in Sri Lanka.",
  },
  icons: {
    icon: "/favicon-96x96.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${poppins.variable} ${dancingScript.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Luxvio Ceylon",
              "image": "https://luxvio-ceylon.com/hero-sri-lanka.jpg",
              "description": "Tailor-made luxury tours in Sri Lanka. Experience the true spirit of Ceylon.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "LK"
              },
              "priceRange": "$$$",
              "telephone": "+94717777959"
            })
          }}
        />
      </body>
    </html>
  )
}
