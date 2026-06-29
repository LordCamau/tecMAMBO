"use client";

import { useState } from "react";
import styles from "./CookiePreferencesButton.module.css";

type ConsentWindow = Window & {
  __tecmamboOpenCookiePreferences?: () => void;
  Cookiebot?: { renew?: () => void; show?: () => void };
  OneTrust?: { ToggleInfoDisplay?: () => void };
  __tcfapi?: (command: string, version: number, callback: (success: boolean) => void) => void;
};

function openConsentPreferences() {
  const consentWindow = window as ConsentWindow;

  if (consentWindow.__tecmamboOpenCookiePreferences) {
    consentWindow.__tecmamboOpenCookiePreferences();
    return true;
  }

  if (consentWindow.Cookiebot?.renew) {
    consentWindow.Cookiebot.renew();
    return true;
  }

  if (consentWindow.Cookiebot?.show) {
    consentWindow.Cookiebot.show();
    return true;
  }

  if (consentWindow.OneTrust?.ToggleInfoDisplay) {
    consentWindow.OneTrust.ToggleInfoDisplay();
    return true;
  }

  if (consentWindow.__tcfapi) {
    consentWindow.__tcfapi("displayConsentUi", 2, () => undefined);
    return true;
  }

  return false;
}

export function CookiePreferencesButton({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");

  return (
    <div className={compact ? styles.compactWrap : styles.wrap}>
      <button
        className={compact ? styles.compactButton : styles.button}
        type="button"
        onClick={() => {
          const opened = openConsentPreferences();
          setMessage(
            opened
              ? "Cookie preferences opened."
              : "Cookie preferences will open here once the consent platform is connected."
          );
        }}
      >
        Manage cookie preferences
      </button>
      {message ? (
        <p className={compact ? styles.compactMessage : styles.message} role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
