import "./../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { RadioBackground } from "../components/RadioBackground";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cityvibe.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CityVibe — Milano",
    template: "%s | CityVibe",
  },
  description:
    "Tune into Milano's street vibes. A curated urban radio experience powered by Spotify playlists — from Navigli Nights to Duomo Drift.",
  keywords: [
    "CityVibe",
    "Milano",
    "city vibes",
    "Spotify playlist",
    "urban radio",
    "Navigli Nights",
    "Duomo Drift",
    "Porta Romana",
    "Italy music",
    "street culture",
    "ambient music Milano",
    "musica Milano",
  ],
  authors: [{ name: "CityVibe" }],
  creator: "CityVibe",
  publisher: "CityVibe",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "CityVibe",
    title: "CityVibe — Milano",
    description:
      "Tune into Milano's street vibes. Curated Spotify playlists for the city's urban pulse — Navigli, Duomo, Porta Romana.",
    images: [
      {
        url: "/pov.png",
        width: 1200,
        height: 630,
        alt: "CityVibe Milano — urban radio experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CityVibe — Milano",
    description:
      "Tune into Milano's street vibes via curated Spotify playlists.",
    images: ["/pov.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      name: "CityVibe",
      url: siteUrl,
      description:
        "An urban radio web experience that tunes listeners into city vibes through curated Spotify playlists. Currently focused on Milano, Italy.",
      applicationCategory: "MusicApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      inLanguage: "it",
      audience: {
        "@type": "Audience",
        audienceType: "Urban music listeners, Milano residents and visitors",
      },
    },
    {
      "@type": "BroadcastService",
      "@id": `${siteUrl}/#broadcast`,
      name: "CityVibe Radio — Milano",
      description:
        "A curated radio service streaming urban Spotify playlists themed around Milano's neighbourhoods.",
      broadcastAffiliateOf: {
        "@type": "Organization",
        name: "CityVibe",
        url: siteUrl,
      },
      areaServed: {
        "@type": "City",
        name: "Milano",
        "@id": "https://www.wikidata.org/wiki/Q490",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Milano Stations",
        itemListElement: [
          {
            "@type": "RadioChannel",
            name: "Navigli Nights",
            broadcastFrequency: "97.3 FM",
            description: "Late-night sounds from the canal district of Milano.",
          },
          {
            "@type": "RadioChannel",
            name: "Duomo Drift",
            broadcastFrequency: "101.5 FM",
            description: "Midnight urban mood around the Duomo cathedral.",
          },
          {
            "@type": "RadioChannel",
            name: "Porta Romana",
            broadcastFrequency: "88.7 FM",
            description: "Aperitivo-hour vibes from south Milano.",
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
      </head>

      <body>
        <div className="relative min-h-screen overflow-hidden">
          <RadioBackground src="/pov.png" />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
