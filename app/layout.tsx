import "./../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { RadioBackground } from "../components/RadioBackground";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cityvibe.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CityVibe — Radio Urbana Milano | Playlist Spotify per quartiere",
    template: "%s | CityVibe",
  },
  description:
    "CityVibe è la radio urbana di Milano. Playlist Spotify curate per quartiere: Navigli Nights, Duomo Drift, Porta Romana. Ascolta i vibe della città, gratis.",
  keywords: [
    "CityVibe",
    "city vibe",
    "cityvibe",
    "city vibes Milano",
    "radio urbana Milano",
    "playlist Spotify Milano",
    "musica Milano quartieri",
    "Navigli Nights",
    "Duomo Drift",
    "Porta Romana",
    "musica ambient Milano",
    "urban radio Italia",
    "playlist Milano 2026",
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
    title: "CityVibe — Radio Urbana Milano",
    description:
      "CityVibe: playlist Spotify curate per i quartieri di Milano. Navigli Nights, Duomo Drift, Porta Romana. La radio urbana della città.",
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
    title: "CityVibe — Radio Urbana Milano",
    description:
      "CityVibe: playlist Spotify curate per quartiere a Milano. Gratis, niente algoritmo.",
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
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "CityVibe",
      alternateName: ["city vibe", "cityvibe.space"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/pov.png`,
      },
      description: "CityVibe è una radio urbana online con playlist Spotify curate per quartieri di Milano.",
      foundingLocation: {
        "@type": "City",
        name: "Milano",
      },
      sameAs: [siteUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CityVibe",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
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
