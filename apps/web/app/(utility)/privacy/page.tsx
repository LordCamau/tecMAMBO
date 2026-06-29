import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { privacyPage } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "Privacy Policy, tecMAMBO",
  description: "How tecMAMBO collects, uses, shares, and protects personal data, including cookies, newsletters, analytics, advertising, and reader rights.",
  alternates: {
    canonical: "/privacy",
    types: {
      "text/markdown": "/privacy.md"
    }
  }
};

export default function PrivacyPage() {
  const dateModified = privacyPage.lastUpdated.startsWith("[") ? undefined : privacyPage.lastUpdated;
  return (
    <>
      <LegalPageTemplate page={privacyPage} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: privacyPage.title,
          url: `${siteUrl}/privacy`,
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
