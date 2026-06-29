import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";
import { siteUrl } from "@/lib/formats";
import { editorialStandardsPage } from "@/lib/legal-pages";

export const metadata: Metadata = {
  title: "Editorial standards, tecMAMBO",
  description:
    "How tecMAMBO protects editorial independence, sourcing, reviews, corrections, AI use, affiliate links, and reader trust.",
  alternates: {
    canonical: "/editorial-standards",
    types: {
      "text/markdown": "/editorial-standards.md"
    }
  }
};

export default function EditorialStandardsPage() {
  const dateModified = editorialStandardsPage.lastUpdated.startsWith("[") ? undefined : editorialStandardsPage.lastUpdated;
  return (
    <>
      <LegalPageTemplate page={editorialStandardsPage} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: editorialStandardsPage.title,
          url: `${siteUrl}/editorial-standards`,
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
