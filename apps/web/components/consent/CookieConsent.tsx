"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  allConsentChoices,
  consentCategories,
  consentExpiryDays,
  consentModeForChoices,
  consentPolicyVersion,
  consentStorageKey,
  defaultConsentChoices,
  type ConsentCategory,
  type ConsentChoices
} from "@/lib/cookie-consent";
import styles from "./CookieConsent.module.css";

type StoredConsent = {
  version: string;
  timestamp: string;
  expiresAt: string;
  choices: ConsentChoices;
  gpc: boolean;
  consentString: string;
};

type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __tecmamboOpenCookiePreferences?: () => void;
  __tecmamboConsent?: StoredConsent;
};

function hasPrivacySignal() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean; doNotTrack?: string };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

function expiryDate() {
  const date = new Date();
  date.setDate(date.getDate() + consentExpiryDays);
  return date.toISOString();
}

function validStoredConsent(value: string | null) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as StoredConsent;
    if (parsed.version !== consentPolicyVersion) return null;
    if (new Date(parsed.expiresAt).getTime() <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function clampForPrivacySignal(choices: ConsentChoices, gpc: boolean): ConsentChoices {
  if (!gpc) return choices;
  return { ...choices, advertising: false, social: false };
}

function consentStringFor(choices: ConsentChoices) {
  return `tecmambo-v1:${Object.entries(choices)
    .map(([key, value]) => `${key}:${value ? "1" : "0"}`)
    .join("|")}`;
}

function applyConsentMode(choices: ConsentChoices) {
  const consentWindow = window as ConsentWindow;
  const mode = consentModeForChoices(choices);
  consentWindow.dataLayer = consentWindow.dataLayer ?? [];
  consentWindow.gtag =
    consentWindow.gtag ??
    function gtag(...args: unknown[]) {
      consentWindow.dataLayer?.push(args);
    };
  consentWindow.gtag("consent", "update", mode);
  window.dispatchEvent(new CustomEvent("tecmambo:consent-change", { detail: { choices, mode } }));
}

function Toggle({
  checked,
  label,
  describedBy,
  onChange
}: {
  checked: boolean;
  label: string;
  describedBy: string;
  onChange: () => void;
}) {
  return (
    <button
      aria-checked={checked}
      aria-describedby={describedBy}
      aria-label={label}
      className={styles.toggle}
      role="switch"
      type="button"
      onClick={onChange}
    >
      <span />
    </button>
  );
}

export function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(defaultConsentChoices);
  const [gpc, setGpc] = useState(false);
  const [detailOpen, setDetailOpen] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const saveChoices = useCallback((nextChoices: ConsentChoices) => {
    const privacySignal = hasPrivacySignal();
    const finalChoices = clampForPrivacySignal(nextChoices, privacySignal);
    const stored: StoredConsent = {
      version: consentPolicyVersion,
      timestamp: new Date().toISOString(),
      expiresAt: expiryDate(),
      choices: finalChoices,
      gpc: privacySignal,
      consentString: consentStringFor(finalChoices)
    };
    window.localStorage.setItem(consentStorageKey, JSON.stringify(stored));
    (window as ConsentWindow).__tecmamboConsent = stored;
    setChoices(finalChoices);
    setGpc(privacySignal);
    applyConsentMode(finalChoices);
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    lastTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setBannerOpen(false);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    const privacySignal = hasPrivacySignal();
    setGpc(privacySignal);
    const stored = validStoredConsent(window.localStorage.getItem(consentStorageKey));
    if (stored) {
      const finalChoices = clampForPrivacySignal(stored.choices, privacySignal);
      setChoices(finalChoices);
      applyConsentMode(finalChoices);
      return;
    }
    applyConsentMode(defaultConsentChoices);
    setBannerOpen(true);
  }, []);

  useEffect(() => {
    const consentWindow = window as ConsentWindow;
    consentWindow.__tecmamboOpenCookiePreferences = openPreferences;
    window.addEventListener("tecmambo:open-cookie-preferences", openPreferences);
    return () => {
      delete consentWindow.__tecmamboOpenCookiePreferences;
      window.removeEventListener("tecmambo:open-cookie-preferences", openPreferences);
    };
  }, [openPreferences]);

  useEffect(() => {
    if (!modalOpen) return;
    const dialog = dialogRef.current;
    const focusableSelector = "button, a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
    const focusable = Array.from(dialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
        lastTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) {
      lastTriggerRef.current?.focus();
    }
  }, [modalOpen]);

  const actions = useMemo(
    () => ({
      reject: () => saveChoices(defaultConsentChoices),
      accept: () => saveChoices(allConsentChoices),
      save: () => saveChoices(choices)
    }),
    [choices, saveChoices]
  );

  if (!bannerOpen && !modalOpen) return null;

  return (
    <>
      {bannerOpen ? (
        <section className={styles.banner} aria-label="Cookie notice">
          <div className={styles.bannerCopy}>
            <h2>A quick word about cookies</h2>
            <p>
              tecMAMBO uses cookies to keep the site working, understand what you read, and show advertising that helps fund our work.
              Essential cookies are always on because the site needs them. Everything else is your choice, and you can change it any
              time.
            </p>
            <p className={styles.links}>
              Read our <Link href="/cookies">Cookie Policy</Link> and <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
          <div className={styles.bannerActions}>
            <button type="button" onClick={actions.reject}>
              Reject all
            </button>
            <button type="button" onClick={openPreferences}>
              Manage preferences
            </button>
            <button type="button" onClick={actions.accept}>
              Accept all
            </button>
          </div>
        </section>
      ) : null}

      {modalOpen ? (
        <div className={styles.modalLayer}>
          <button className={styles.backdrop} type="button" aria-label="Close cookie preferences" onClick={() => setModalOpen(false)} />
          <div
            aria-labelledby="cookie-modal-title"
            aria-modal="true"
            className={styles.dialog}
            ref={dialogRef}
            role="dialog"
          >
            <div className={styles.dialogHeader}>
              <div>
                <p>Cookie preferences</p>
                <h2 id="cookie-modal-title">Your cookie choices</h2>
              </div>
              <button className={styles.closeButton} type="button" aria-label="Close cookie preferences" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>
            <p className={styles.intro}>Pick what you are comfortable with. You can update these any time from the link in our footer.</p>
            {gpc ? (
              <p className={styles.signalNotice}>
                Your browser is sending a privacy opt-out signal, so advertising and social tracking stay off.
              </p>
            ) : null}

            <div className={styles.categoryList}>
              {consentCategories.map((category) => {
                const checked = category.locked ? true : choices[category.id as ConsentCategory];
                const detailId = `cookie-detail-${category.id}`;
                return (
                  <section className={styles.category} key={category.id}>
                    <div>
                      <h3>{category.title}</h3>
                      <p id={`${detailId}-description`}>{category.description}</p>
                    </div>
                    {category.locked ? (
                      <span className={styles.locked}>Always on</span>
                    ) : (
                      <Toggle
                        checked={checked}
                        describedBy={`${detailId}-description`}
                        label={`${category.title} cookies`}
                        onChange={() =>
                          setChoices((current) => ({
                            ...current,
                            [category.id]: !current[category.id as ConsentCategory]
                          }))
                        }
                      />
                    )}
                    <button
                      className={styles.detailsButton}
                      type="button"
                      aria-expanded={detailOpen === category.id}
                      aria-controls={detailId}
                      onClick={() => setDetailOpen(detailOpen === category.id ? null : category.id)}
                    >
                      View cookies and providers
                    </button>
                    <div className={styles.details} id={detailId} hidden={detailOpen !== category.id}>
                      The live cookie and vendor list will be supplied by the certified CMP once the production settings ID is connected.
                    </div>
                  </section>
                );
              })}
            </div>

            <p className={styles.footerLine}>
              See our <Link href="/cookies">Cookie Policy</Link> and <Link href="/privacy">Privacy Policy</Link> for the full detail.
            </p>
            <div className={styles.modalActions}>
              <button type="button" onClick={actions.reject}>
                Reject all
              </button>
              <button type="button" onClick={actions.save}>
                Save my choices
              </button>
              <button type="button" onClick={actions.accept}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
