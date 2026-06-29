export type ConsentCategory = "analytics" | "functionality" | "advertising" | "social";

export type ConsentChoices = Record<ConsentCategory, boolean>;

export type ConsentCategoryInfo = {
  id: "necessary" | ConsentCategory;
  title: string;
  description: string;
  locked?: boolean;
};

export const consentPolicyVersion = "2026-04-15";
export const consentStorageKey = "tecmambo.cookieConsent";
export const consentExpiryDays = 180;

export const optionalConsentCategories: ConsentCategory[] = ["analytics", "functionality", "advertising", "social"];

export const defaultConsentChoices: ConsentChoices = {
  analytics: false,
  functionality: false,
  advertising: false,
  social: false
};

export const allConsentChoices: ConsentChoices = {
  analytics: true,
  functionality: true,
  advertising: true,
  social: true
};

export const consentCategories: ConsentCategoryInfo[] = [
  {
    id: "necessary",
    title: "Strictly necessary",
    description: "Needed for tecMAMBO to work, stay secure, and remember your choices. These are always on.",
    locked: true
  },
  {
    id: "analytics",
    title: "Performance and analytics",
    description: "Help us see what is read so we can make tecMAMBO clearer and better."
  },
  {
    id: "functionality",
    title: "Functionality and preferences",
    description: "Remember settings like light or dark mode for a smoother visit."
  },
  {
    id: "advertising",
    title: "Advertising",
    description: "Used by us and our partners to show and measure ads, including more relevant ones where you allow it."
  },
  {
    id: "social",
    title: "Social media",
    description: "Allow embedded posts and share buttons from social platforms."
  }
];

export const consentModeDenied = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted"
} as const;

export function consentModeForChoices(choices: ConsentChoices) {
  return {
    ad_storage: choices.advertising ? "granted" : "denied",
    analytics_storage: choices.analytics ? "granted" : "denied",
    ad_user_data: choices.advertising ? "granted" : "denied",
    ad_personalization: choices.advertising ? "granted" : "denied",
    functionality_storage: choices.functionality ? "granted" : "denied",
    personalization_storage: choices.functionality ? "granted" : "denied",
    security_storage: "granted"
  } as const;
}
