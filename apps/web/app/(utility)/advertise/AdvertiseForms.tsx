"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { consentStorageKey } from "@/lib/cookie-consent";
import { interestOptions, type AdvertiseSettings } from "@/lib/advertise";
import styles from "./page.module.css";

type FormState = {
  name: string;
  company: string;
  email: string;
  website: string;
  interests: string[];
  budget: string;
  message: string;
  consent: boolean;
  websiteUrl: string;
};

type MediaKitState = {
  name: string;
  email: string;
  company: string;
  websiteUrl: string;
};

type FieldErrors = Partial<Record<keyof FormState | "form", string>>;
type MediaKitErrors = Partial<Record<keyof MediaKitState | "form", string>>;

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  website: "",
  interests: [],
  budget: "",
  message: "",
  consent: false,
  websiteUrl: ""
};

const initialMediaKitState: MediaKitState = {
  name: "",
  email: "",
  company: "",
  websiteUrl: ""
};

function isWorkEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(consentStorageKey);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as { choices?: { analytics?: boolean } };
    return parsed.choices?.analytics === true;
  } catch {
    return false;
  }
}

function trackAdvertiseEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const trackedWindow = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  trackedWindow.dataLayer = trackedWindow.dataLayer ?? [];
  trackedWindow.gtag =
    trackedWindow.gtag ??
    function gtag(...args: unknown[]) {
      trackedWindow.dataLayer?.push(args);
    };
  trackedWindow.gtag("event", name, {
    event_category: "advertise",
    ...params
  });
}

function validateLeadForm(form: FormState) {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Tell us your name.";
  if (!form.company.trim()) errors.company = "Tell us the company or agency name.";
  if (!isWorkEmail(form.email)) errors.email = "Use a valid work email.";
  if (!form.consent) errors.consent = "Please confirm that we may contact you about this enquiry.";
  return errors;
}

function validateMediaKitForm(form: MediaKitState) {
  const errors: MediaKitErrors = {};
  if (!form.name.trim()) errors.name = "Tell us your name.";
  if (!isWorkEmail(form.email)) errors.email = "Use a valid work email.";
  return errors;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <span className={styles.errorText} id={id}>
      {children}
    </span>
  );
}

export function AdvertiseLeadForm({ settings }: { settings: AdvertiseSettings }) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(Date.now());
  const formStarted = useRef(false);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-advertise-event]") : null;
      if (!target) return;
      trackAdvertiseEvent(target.dataset.advertiseEvent ?? "advertise_cta_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
    if (!formStarted.current) {
      formStarted.current = true;
      trackAdvertiseEvent("advertise_form_start");
    }
  }

  function toggleInterest(option: string) {
    update(
      "interests",
      form.interests.includes(option) ? form.interests.filter((item) => item !== option) : [...form.interests, option]
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateLeadForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      setServerMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/advertise/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt: startedAt.current, source: "advertise-page" })
      });
      const payload = (await response.json()) as { ok?: boolean; message?: string; errors?: FieldErrors };
      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? { form: payload.message ?? "Something went wrong." });
        setStatus("error");
        setServerMessage(payload.message ?? "Something went wrong. You can still email us from this page.");
        return;
      }
      trackAdvertiseEvent("advertise_form_submit", { conversion: true });
      setStatus("success");
      setServerMessage(payload.message ?? `Thanks. We will reply within ${settings.form.responseTime}.`);
      setForm(initialFormState);
      startedAt.current = Date.now();
      formStarted.current = false;
    } catch {
      setStatus("error");
      setErrors({ form: "The enquiry could not be sent." });
      setServerMessage("The enquiry could not be sent. Please try again or use the email option once it is available.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website-url">Website URL</label>
        <input id="website-url" name="website-url" tabIndex={-1} autoComplete="off" value={form.websiteUrl} onChange={(event) => update("websiteUrl", event.target.value)} />
      </div>

      <div className={styles.fieldGrid}>
        <label>
          <span>Name</span>
          <input
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
          />
          <FieldError id="name-error">{errors.name}</FieldError>
        </label>
        <label>
          <span>Company</span>
          <input
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            autoComplete="organization"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            required
          />
          <FieldError id="company-error">{errors.company}</FieldError>
        </label>
      </div>

      <div className={styles.fieldGrid}>
        <label>
          <span>Work email</span>
          <input
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
            inputMode="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            required
          />
          <FieldError id="email-error">{errors.email}</FieldError>
        </label>
        <label>
          <span>Website</span>
          <input autoComplete="url" inputMode="url" type="url" value={form.website} onChange={(event) => update("website", event.target.value)} />
        </label>
      </div>

      <fieldset className={styles.chipGroup}>
        <legend>Interested in</legend>
        <div>
          {interestOptions.map((option) => (
            <button
              aria-pressed={form.interests.includes(option)}
              className={form.interests.includes(option) ? styles.chipSelected : undefined}
              key={option}
              type="button"
              onClick={() => toggleInterest(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label>
        <span>Budget range</span>
        <select value={form.budget} onChange={(event) => update("budget", event.target.value)}>
          <option value="">Select a range</option>
          {settings.form.budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} />
      </label>

      <label className={styles.consent}>
        <input
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          required
        />
        <span>
          I agree to be contacted about my enquiry and have read the <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      <FieldError id="consent-error">{errors.consent}</FieldError>

      <button className={styles.submitButton} disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending..." : "Send enquiry"}
      </button>

      <p className={status === "success" ? styles.successState : status === "error" ? styles.errorState : styles.formNote} aria-live="polite">
        {serverMessage || `We use this information only to respond to your enquiry. Expected reply time: ${settings.form.responseTime}.`}
      </p>
      {errors.form ? <FieldError id="form-error">{errors.form}</FieldError> : null}
    </form>
  );
}

export function MediaKitGate() {
  const [form, setForm] = useState<MediaKitState>(initialMediaKitState);
  const [errors, setErrors] = useState<MediaKitErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "ready" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const startedAt = useMemo(() => Date.now(), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateMediaKitForm(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/advertise/media-kit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt, source: "advertise-page-media-kit" })
      });
      const payload = (await response.json()) as { ok?: boolean; downloadUrl?: string; errors?: MediaKitErrors };
      if (!response.ok || !payload.ok || !payload.downloadUrl) {
        setErrors(payload.errors ?? { form: "The media kit could not be prepared." });
        setStatus("error");
        return;
      }
      setDownloadUrl(payload.downloadUrl);
      setStatus("ready");
      trackAdvertiseEvent("advertise_media_kit_download", { conversion: true });
    } catch {
      setErrors({ form: "The media kit could not be prepared." });
      setStatus("error");
    }
  }

  return (
    <form className={styles.mediaKitForm} onSubmit={onSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="media-kit-website-url">Website URL</label>
        <input
          id="media-kit-website-url"
          tabIndex={-1}
          autoComplete="off"
          value={form.websiteUrl}
          onChange={(event) => setForm((current) => ({ ...current, websiteUrl: event.target.value }))}
        />
      </div>
      <label>
        <span>Name</span>
        <input
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "media-kit-name-error" : undefined}
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
        />
        <FieldError id="media-kit-name-error">{errors.name}</FieldError>
      </label>
      <label>
        <span>Work email</span>
        <input
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "media-kit-email-error" : undefined}
          autoComplete="email"
          inputMode="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <FieldError id="media-kit-email-error">{errors.email}</FieldError>
      </label>
      <label>
        <span>Company</span>
        <input
          autoComplete="organization"
          value={form.company}
          onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
        />
      </label>
      <button className={styles.mediaKitButton} disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Preparing..." : "Get the media kit"}
      </button>
      {status === "ready" && downloadUrl ? (
        <a className={styles.downloadReady} href={downloadUrl} download onClick={() => trackAdvertiseEvent("advertise_media_kit_file_click", { conversion: true })}>
          Download now
        </a>
      ) : null}
      <p className={status === "error" ? styles.errorState : styles.formNote} aria-live="polite">
        {errors.form ?? "We will use this only for media-kit follow-up and partnership replies."}
      </p>
    </form>
  );
}
