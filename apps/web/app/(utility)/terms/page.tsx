import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { termsPage } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "Terms of Use, tecMAMBO",
  description: "The plain-English terms for using tecMAMBO, including content use, sponsorships, privacy links, and legal responsibilities.",
  alternates: {
    canonical: "/terms",
    types: {
      "text/markdown": "/terms.md"
    }
  }
};

export default function TermsPage() {
  const dateModified = termsPage.lastUpdated.startsWith("[") ? undefined : termsPage.lastUpdated;
  return (
    <>
      <LegalPageTemplate page={termsPage} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: termsPage.title,
          url: `${siteUrl}/terms`,
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
