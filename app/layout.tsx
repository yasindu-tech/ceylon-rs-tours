import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter, Dancing_Script } from "next/font/google"
import Script from "next/script"
import { Toaster } from "@/components/ui/sonner"
import { getSiteSettings } from "@/lib/data/site-settings"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} ${dancingScript.variable} font-sans antialiased bg-background text-foreground`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7NFMZ3TV1D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7NFMZ3TV1D');
          `}
        </Script>
        {children}
        <Toaster />
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
              "telephone": `+${settings.phoneNumber}`
            })
          }}
        />
      </body>
    </html>
  )
}
