import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Download, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { advertiseSettings, populatedAudienceStats } from "@/lib/advertise";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, organizationJsonLd } from "@/lib/seo";
import { AdvertiseLeadForm, MediaKitGate } from "./AdvertiseForms";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Advertise with tecMAMBO",
  description:
    "Reach people who are actively trying to understand technology and make better buying decisions with trusted tecMAMBO partnerships.",
  alternates: { canonical: "/advertise" },
  openGraph: {
    title: "Advertise with tecMAMBO",
    description:
      "Reach people who are actively trying to understand technology and make better buying decisions with trusted tecMAMBO partnerships.",
    url: "/advertise",
    type: "website"
  }
};

const settings = advertiseSettings;

function AdvertisePageJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Advertise with tecMAMBO",
          description:
            "A lead-generation page for brands and agencies that want to reach readers as they understand technology and decide what to buy.",
          url: absoluteUrl("/advertise"),
          isPartOf: {
            "@type": "WebSite",
            name: "tecMAMBO",
            url: absoluteUrl("/")
          },
          publisher: organizationJsonLd()
        }}
      />
      <JsonLd data={faqJsonLd(settings.faq)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Advertise with tecMAMBO", path: "/advertise" }])} />
    </>
  );
}

export default function AdvertisePage() {
  return (
    <div className={styles.page}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{settings.hero.eyebrow}</p>
          <h1>{settings.hero.title}</h1>
          <p>{settings.hero.sub}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href="#partnership-enquiry" data-advertise-event="advertise_primary_cta_click">
              Start a conversation
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondaryCta} href="#media-kit" data-advertise-event="advertise_media_kit_cta_click">
              Download the media kit
              <Download size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <aside className={styles.heroPanel} aria-label="Partnership promise">
          <ShieldCheck size={28} aria-hidden="true" />
          <h2>Reader trust is the inventory.</h2>
          <p>
            The promise is simple: useful formats, clear labelling, and a page environment that gives your message a calmer place to land.
          </p>
        </aside>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="why-brands">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>WHY IT WORKS</p>
          <h2 id="why-brands">Why brands work with tecMAMBO</h2>
          <p>
            We built tecMAMBO on one promise: make technology understandable without dumbing it down. That promise is also why we are a
            rare thing for advertisers, a calm, brand-safe place where people arrive ready to learn and to decide.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {settings.pillars.map((pillar) => (
            <article className={styles.card} key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.audienceBand} aria-labelledby="audience-heading">
        <div className={`container ${styles.audienceInner}`}>
          <div>
            <p className={styles.eyebrow}>AUDIENCE SNAPSHOT</p>
            <h2 id="audience-heading">{settings.audience.heading}</h2>
            <p>{settings.audience.intro}</p>
          </div>
          {populatedAudienceStats.length ? (
            <dl className={styles.statsGrid}>
              {populatedAudienceStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                  {stat.note ? <p>{stat.note}</p> : null}
                </div>
              ))}
            </dl>
          ) : (
            <p className={styles.noStats}>
              Audience figures are intentionally left out until the current numbers are added in the editable Advertise settings.
            </p>
          )}
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="ways-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>FORMATS</p>
          <h2 id="ways-heading">Ways to work with us</h2>
        </div>
        <div className={styles.offerGrid}>
          {settings.offerings.map((offering) => (
            <article className={styles.offerCard} key={offering.title}>
              <h3>{offering.title}</h3>
              <p>{offering.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.reviewLine}>
          <p>
            One thing we do not sell: our independent reviews and verdicts. That is what keeps our audience trusting us, which is what makes
            everything else worth your while.
          </p>
          <a className={styles.primaryCta} href="#partnership-enquiry" data-advertise-event="advertise_midpage_cta_click">
            Start a conversation
          </a>
        </div>
      </section>

      <section className={`container ${styles.trustSection}`} aria-labelledby="trust-heading">
        <div>
          <p className={styles.eyebrow}>TRUST</p>
          <h2 id="trust-heading">{settings.trust.heading}</h2>
          <p>{settings.trust.body}</p>
        </div>
        <Link href="/editorial-standards">Read our editorial standards</Link>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="process-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>PROCESS</p>
          <h2 id="process-heading">How it works</h2>
        </div>
        <ol className={styles.processList}>
          {settings.process.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`container ${styles.partnerInvite}`} aria-labelledby="partners-heading">
        <p className={styles.eyebrow}>FOUNDING PARTNERS</p>
        <h2 id="partners-heading">{settings.socialProof.heading}</h2>
        <p>{settings.socialProof.body}</p>
      </section>

      <section className={`container ${styles.faqSection}`} aria-labelledby="faq-heading">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-heading">Questions brands ask first</h2>
        </div>
        <div className={styles.faqList}>
          {settings.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`container ${styles.conversion}`} id="partnership-enquiry" aria-labelledby="form-heading">
        <div className={styles.conversionCopy}>
          <p className={styles.eyebrow}>START HERE</p>
          <h2 id="form-heading">{settings.form.heading}</h2>
          <p>{settings.form.sub}</p>
          <div className={styles.sideOptions}>
            <a href="#media-kit" data-advertise-event="advertise_form_side_media_kit_click">
              Download the media kit
            </a>
            {settings.form.advertisingEmail ? <a href={`mailto:${settings.form.advertisingEmail}`}>Email us at {settings.form.advertisingEmail}</a> : null}
            {settings.form.schedulingLink ? <a href={settings.form.schedulingLink}>Book a call</a> : null}
          </div>
        </div>
        <AdvertiseLeadForm settings={settings} />
      </section>

      <section className={`container ${styles.mediaKit}`} id="media-kit" aria-labelledby="media-kit-heading">
        <div>
          <p className={styles.eyebrow}>MEDIA KIT</p>
          <h2 id="media-kit-heading">Download the media kit</h2>
          <p>
            A short gate captures your name and work email, then delivers the media kit immediately. The current CMS media file can replace
            the fallback PDF at any time.
          </p>
        </div>
        <MediaKitGate />
      </section>

      <AdvertisePageJsonLd />
    </div>
  );
}
