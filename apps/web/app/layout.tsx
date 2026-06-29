import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { consentModeDenied } from "@/lib/cookie-consent";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500"],
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://tecmambo.com"),
  title: {
    default: "tecMAMBO - Made to be understood.",
    template: "%s | tecMAMBO"
  },
  description: "Plain-English technology journalism with depth when you want it.",
  icons: {
    icon: [
      {
        url: "/brand/tecMAMBO-favicon.png",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/brand/tecMAMBO-favicon.png",
        type: "image/png"
      }
    ]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    siteName: "tecMAMBO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#141318" }
  ]
};

const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}>
        <ThemeProvider>
          <Script
            id="tecmambo-consent-defaults"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', ${JSON.stringify(consentModeDenied)});
              `
            }}
          />
          {cookiebotId ? (
            <Script
              id="Cookiebot"
              src="https://consent.cookiebot.com/uc.js"
              data-cbid={cookiebotId}
              data-blockingmode="auto"
              type="text/javascript"
              strategy="beforeInteractive"
            />
          ) : null}
          <span id="top" className="visually-hidden" tabIndex={-1}>
            Top
          </span>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CookieConsent />
        </ThemeProvider>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
