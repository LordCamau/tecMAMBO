export type ContrastTheme = "light" | "dark";
export type ContrastSize = "normal" | "large";

export type ContrastPair = {
  name: string;
  theme: ContrastTheme;
  fg: string;
  bg: string;
  size: ContrastSize;
};

export const contrastColors = {
  brandPurple: "#4C1FC4",
  brandPurpleMid: "#3F18A8",
  brandPurpleDark: "#2E1568",
  spark: "#6E2BFF",
  auroraCyan: "#2BD4E6",
  spectrumPink: "#FF6FAE",
  ogScrimOverAuroraCyan: "#1E646F",
  darkPurple: "#9A78FF",
  darkPurpleStrong: "#B6A2FF",
  darkSpark: "#8A5BFF",
  brandOrange: "#FF8A00",
  darkOrange: "#FFA033",
  brandInk: "#1A1A1F",
  onOrange: "#281400",
  white: "#FFFFFF",
  lavender: "#F3F0FB",
  lavenderLine: "#E4DEF6",
  darkBg: "#141318",
  darkSurface: "#1C1B22",
  darkRaised: "#201F27",
  darkPill: "#211B3A",
  darkPillBorder: "#2F2752",
  lightBg: "#FAFAFC",
  lightSurface: "#FFFFFF",
  text: "#1A1A1F",
  textSecondary: "#56565F",
  textMuted: "#72727B",
  darkText: "#ECEAF2",
  darkTextSecondary: "#B9B7C4",
  darkTextMuted: "#8C8A98",
  footer: "#2E1568",
  footerDark: "#0D0C10"
} as const;

const c = contrastColors;

export const contrastPairs: ContrastPair[] = [
  { name: "badge explains", theme: "light", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "badge explains", theme: "dark", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "badge real life", theme: "light", fg: c.white, bg: c.brandPurpleDark, size: "normal" },
  { name: "badge real life", theme: "dark", fg: c.white, bg: c.brandPurpleDark, size: "normal" },
  { name: "badge news", theme: "light", fg: c.white, bg: c.brandInk, size: "normal" },
  { name: "badge news", theme: "dark", fg: c.white, bg: c.brandInk, size: "normal" },
  { name: "badge wallet", theme: "light", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "badge wallet", theme: "dark", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "badge take", theme: "light", fg: c.brandPurpleDark, bg: c.lightBg, size: "normal" },
  { name: "badge take", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkBg, size: "normal" },
  { name: "badge review", theme: "light", fg: c.brandPurpleDark, bg: c.lavender, size: "normal" },
  { name: "badge review", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkPill, size: "normal" },
  { name: "orange price pill", theme: "light", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "orange price pill", theme: "dark", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "accent button", theme: "light", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "accent button", theme: "dark", fg: c.onOrange, bg: c.brandOrange, size: "normal" },
  { name: "primary button", theme: "light", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "primary button", theme: "dark", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "glossary and tag pill", theme: "light", fg: c.brandPurpleDark, bg: c.lavender, size: "normal" },
  { name: "glossary and tag pill", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkPill, size: "normal" },
  { name: "newsletter card", theme: "light", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "newsletter card", theme: "dark", fg: c.white, bg: c.brandPurple, size: "normal" },
  { name: "newsletter gradient lightest stop", theme: "light", fg: c.white, bg: c.spark, size: "normal" },
  { name: "newsletter gradient lightest stop", theme: "dark", fg: c.white, bg: c.spark, size: "normal" },
  { name: "og aurora scrim worst stop", theme: "light", fg: c.white, bg: c.ogScrimOverAuroraCyan, size: "normal" },
  { name: "og aurora scrim worst stop", theme: "dark", fg: c.white, bg: c.ogScrimOverAuroraCyan, size: "normal" },
  { name: "footer text", theme: "light", fg: c.white, bg: c.footer, size: "normal" },
  { name: "footer text", theme: "dark", fg: c.white, bg: c.footerDark, size: "normal" },
  { name: "why it matters heading", theme: "light", fg: c.brandPurpleDark, bg: c.lavender, size: "normal" },
  { name: "why it matters heading", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkPill, size: "normal" },
  { name: "glossary peek link", theme: "light", fg: c.brandPurpleDark, bg: c.lightSurface, size: "normal" },
  { name: "glossary peek link", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkSurface, size: "normal" },
  { name: "secondary text on surface", theme: "light", fg: c.textSecondary, bg: c.lightSurface, size: "normal" },
  { name: "secondary text on surface", theme: "dark", fg: c.darkTextSecondary, bg: c.darkSurface, size: "normal" },
  { name: "muted byline on page", theme: "light", fg: c.textMuted, bg: c.lightBg, size: "normal" },
  { name: "muted byline on page", theme: "dark", fg: c.darkTextMuted, bg: c.darkBg, size: "normal" },
  { name: "mono eyebrow", theme: "light", fg: c.brandPurpleDark, bg: c.lightBg, size: "normal" },
  { name: "mono eyebrow", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkBg, size: "normal" },
  { name: "nav active", theme: "light", fg: c.brandPurpleDark, bg: c.lightBg, size: "normal" },
  { name: "nav active", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkBg, size: "normal" },
  { name: "dark brand link", theme: "dark", fg: c.darkPurple, bg: c.darkBg, size: "normal" },
  { name: "dark brand link hover", theme: "dark", fg: c.darkPurpleStrong, bg: c.darkBg, size: "normal" }
];

export function contrastRatio(foreground: string, background: string) {
  const foregroundLum = relativeLuminance(foreground);
  const backgroundLum = relativeLuminance(background);
  const lighter = Math.max(foregroundLum, backgroundLum);
  const darker = Math.min(foregroundLum, backgroundLum);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function channel(value: number) {
  const scaled = value / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`Expected six-digit hex colour, received ${hex}`);
  }
  const numeric = Number.parseInt(value, 16);
  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255
  };
}
