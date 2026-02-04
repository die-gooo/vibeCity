import "./../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { RadioBackground } from "../components/RadioBackground";

export const metadata: Metadata = {
  title: "CityVibe — Milano",
  description: "Tune into your city via public Spotify playlists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="it">
      <head>
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
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}

        <div className="relative min-h-screen overflow-hidden">
          <RadioBackground src="/pov.jpg" />
          {children}
        </div>
      </body>
    </html>
  );
}
