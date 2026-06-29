import Link from "next/link";
import { CookiePreferencesButton } from "@/components/legal/CookiePreferencesButton";
import { Wordmark } from "@/components/signature/Wordmark";
import { footerCompanyLinks, footerLegalLinks, footerReadLinks, socialLinks } from "@/lib/nav";
import styles from "./SiteFooter.module.css";

const socialIconPaths: Record<string, string> = {
  Facebook:
    "M18.77 7.46h-3.3V5.58c0-.9.6-1.1 1.02-1.1h2.22V.68L15.44.67c-3.64 0-4.47 2.72-4.47 4.46v2.33H8.12v3.92h2.85v11.95h4.5V11.38h3.04l.26-3.92Z",
  Instagram:
    "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.95Zm0 2A2.95 2.95 0 1 0 12 15a2.95 2.95 0 0 0 0-5.95Z",
  YouTube:
    "M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.58 12 3.58 12 3.58s-7.5 0-9.38.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3 3 0 0 0 2.12-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.75 15.5v-7l6.25 3.5-6.25 3.5Z",
  "Twitter / X":
    "M18.9 2h3.68l-8.04 9.2L24 22h-7.4l-5.8-6.82L4.17 22H.48l8.6-9.83L0 2h7.58l5.24 6.18L18.9 2Zm-1.29 18h2.04L6.47 3.9H4.28L17.61 20Z",
  TikTok:
    "M19.6 6.4a6.6 6.6 0 0 1-3.86-1.24v8.1a6.74 6.74 0 1 1-5.82-6.68v3.64a3.2 3.2 0 1 0 2.2 3.04V1h3.62a6.6 6.6 0 0 0 3.86 5.96v-.56Z"
};

function SocialIcon({ label }: { label: string }) {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={socialIconPaths[label]} />
    </svg>
  );
}

function LinkColumn({ title, links }: { title: string; links: Array<{ label: string; path: string }> }) {
  return (
    <section className={styles.linkColumn} aria-labelledby={`footer-${title.toLowerCase()}`}>
      <h2 id={`footer-${title.toLowerCase()}`}>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const footerSocialLinks = socialLinks.filter((link) => link.external);

  return (
    <footer className={styles.footer}>
      <div className={styles.accent} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <section className={styles.brandBlock} aria-labelledby="footer-brand-title">
            <Wordmark inverted />
            <h2 id="footer-brand-title" className="visually-hidden">
              tecMAMBO
            </h2>
            <p className={styles.tagline}>Made to be understood.</p>
            <p className={styles.mission}>
              Tech, explained the way a friend would. Plain English first, the depth there when you want it.
            </p>
            <nav className={styles.socials} aria-label="tecMAMBO social links">
              {footerSocialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`tecMAMBO on ${link.label} (opens in a new tab)`}
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </nav>
          </section>

          <nav className={styles.footerNav} aria-label="Footer">
            <LinkColumn title="READ" links={footerReadLinks} />
            <LinkColumn title="COMPANY" links={footerCompanyLinks} />
            <section className={styles.linkColumn} aria-labelledby="footer-legal">
              <h2 id="footer-legal">LEGAL</h2>
              <ul>
                {footerLegalLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <CookiePreferencesButton compact />
            </section>
          </nav>

          <section className={styles.newsletter} aria-labelledby="footer-newsletter-title">
            <p className={styles.eyebrow}>THE MAMBO BRIEFING</p>
            <h2 id="footer-newsletter-title">Plain-English tech, once a week.</h2>
            <p>No spam, no hype.</p>
            <form className={styles.form} action="/newsletter" method="get">
              <label className="visually-hidden" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input id="footer-newsletter-email" name="email" type="email" placeholder="you@example.com" required />
              <button type="submit">Subscribe</button>
            </form>
            <p className={styles.privacyNote}>
              By subscribing, you agree to our <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </section>
        </div>

        <div className={styles.bottomBar}>
          <p>© {year} tecMAMBO. All rights reserved.</p>
          <p>Made in Nairobi, Kenya.</p>
          <p>Plain English first. Always.</p>
          <div className={styles.utilityLinks}>
            <Link href="/feed.xml">RSS</Link>
            <Link href="#top">Back to top</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
