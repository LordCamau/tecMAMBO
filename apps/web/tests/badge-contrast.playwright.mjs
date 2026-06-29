import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* global console */

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tokensCss = await readFile(join(root, "styles/tokens.css"), "utf8");
const badgeCss = await readFile(join(root, "components/signature/FormatBadge.module.css"), "utf8");
const snapshotDir = join(root, "test-results");

const variants = [
  ["explains", "MAMBO Explains"],
  ["wallet", "Wallet Watch"],
  ["realLife", "MAMBO vs Real Life"],
  ["care", "Should you care?"],
  ["take", "MAMBO Take"],
  ["review", "Review"]
];

async function checkTheme(theme) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 920, height: 260 } });
  const darkClass = theme === "dark" ? "dark" : "";

  await page.setContent(`
    <!doctype html>
    <html class="${darkClass}">
      <head>
        <style>
          ${tokensCss}
          ${badgeCss}
          body {
            margin: 0;
            background: var(--bg);
            color: var(--text);
            font-family: Arial, sans-serif;
          }
          #badge-row {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            align-items: center;
            padding: 38px;
          }
          .format-grid span {
            color: var(--text-secondary);
          }
        </style>
      </head>
      <body>
        <main id="badge-row" class="format-grid">
          ${variants.map(([name, label]) => `<span class="badge ${name}" data-variant="${name}"><span class="mark"></span>${label}</span>`).join("")}
        </main>
      </body>
    </html>
  `);

  const failures = await page.$$eval("[data-variant]", (nodes) => {
    function parseColor(value) {
      const match = value.match(/rgba?\(([^)]+)\)/);
      if (!match) throw new Error(`Unsupported colour value: ${value}`);
      const [r, g, b, a = "1"] = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      return { r, g, b, a };
    }

    function luminance({ r, g, b }) {
      const channel = (value) => {
        const scaled = value / 255;
        return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    }

    function contrast(fg, bg) {
      const lighter = Math.max(luminance(fg), luminance(bg));
      const darker = Math.min(luminance(fg), luminance(bg));
      return (lighter + 0.05) / (darker + 0.05);
    }

    function solidBackground(element) {
      let current = element;
      while (current) {
        const bg = parseColor(globalThis.getComputedStyle(current).backgroundColor);
        if (bg.a !== 0) return bg;
        current = current.parentElement;
      }
      return parseColor("rgb(255, 255, 255)");
    }

    return nodes.flatMap((node) => {
      const style = globalThis.getComputedStyle(node);
      const mark = node.querySelector(".mark");
      const fg = parseColor(style.color);
      const bg = solidBackground(node);
      const ratio = contrast(fg, bg);
      const markColor = globalThis.getComputedStyle(mark).borderBottomColor;
      const errors = [];

      if (ratio < 4.5) {
        errors.push(`${node.dataset.variant} has ${ratio.toFixed(2)}:1 contrast`);
      }

      if (markColor !== style.color) {
        errors.push(`${node.dataset.variant} mark does not inherit currentColor`);
      }

      return errors;
    });
  });

  const row = page.locator("#badge-row");
  const screenshot = await row.screenshot();
  await mkdir(snapshotDir, { recursive: true });
  await writeFile(join(snapshotDir, `badge-contrast-${theme}.png`), screenshot);

  await browser.close();

  if (failures.length) {
    throw new Error(`${theme} badge contrast failed:\\n${failures.join("\\n")}`);
  }
}

await checkTheme("light");
await checkTheme("dark");

console.log("Badge contrast computed-style checks passed for light and dark themes.");
