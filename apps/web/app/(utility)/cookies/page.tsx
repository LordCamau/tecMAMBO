import type { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/legal/CookiePreferencesButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { cookiePage } from "@/lib/legal-pages";
import styles from "./cookies.module.css";

export const metadata: Metadata = {
  title: "Cookie Policy, tecMAMBO",
  description: "How tecMAMBO uses cookies and similar technologies, including essential cookies, analytics, advertising, preferences, and reader controls.",
  alternates: {
    canonical: "/cookies",
    types: {
      "text/markdown": "/cookies.md"
    }
  }
};

export default function CookiesPage() {
  const dateModified = cookiePage.lastUpdated.startsWith("[") ? undefined : cookiePage.lastUpdated;
  return (
    <>
      <LegalPageTemplate page={cookiePage}>
        <section className={styles.controls} id="manage-cookie-preferences" aria-labelledby="cookie-preferences-title">
          <div>
            <p>Cookie controls</p>
            <h2 id="cookie-preferences-title">Manage cookie preferences</h2>
            <span>
              Use this control to reopen the consent preferences panel. The detailed cookie list is supplied by the consent platform when
              it is connected, so it stays current as tags and partners change.
            </span>
          </div>
          <CookiePreferencesButton />
        </section>
      </LegalPageTemplate>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: cookiePage.title,
          url: `${siteUrl}/cookies`,
          ...(dateModified ? { dateModified } : {}),
          isPartOf: {
            "@type": "WebSite",
            name: "tecMAMBO",
            url: siteUrl
          }
        }}
      />
    </>
  );
}
