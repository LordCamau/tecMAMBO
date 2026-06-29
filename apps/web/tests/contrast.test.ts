import { describe, expect, it } from "vitest";
import { contrastColors, contrastPairs, contrastRatio } from "../lib/contrast-tokens";

describe("text-on-colour contrast tokens", () => {
  it("keeps every registered pairing at WCAG AA or better", () => {
    for (const pair of contrastPairs) {
      const ratio = contrastRatio(pair.fg, pair.bg);
      const minimum = pair.size === "large" ? 3 : 4.5;

      expect(
        ratio,
        `${pair.theme} ${pair.name} has ${ratio.toFixed(2)}:1 contrast for ${pair.fg} on ${pair.bg}`
      ).toBeGreaterThanOrEqual(minimum);
    }
  });

  it("keeps filled badge colours canonical in both themes", () => {
    expect(contrastPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "badge explains", theme: "light", fg: contrastColors.white, bg: contrastColors.brandPurple }),
        expect.objectContaining({ name: "badge explains", theme: "dark", fg: contrastColors.white, bg: contrastColors.brandPurple }),
        expect.objectContaining({ name: "badge real life", theme: "light", fg: contrastColors.white, bg: contrastColors.brandPurpleDark }),
        expect.objectContaining({ name: "badge real life", theme: "dark", fg: contrastColors.white, bg: contrastColors.brandPurpleDark }),
        expect.objectContaining({ name: "badge news", theme: "light", fg: contrastColors.white, bg: contrastColors.brandInk }),
        expect.objectContaining({ name: "badge news", theme: "dark", fg: contrastColors.white, bg: contrastColors.brandInk }),
        expect.objectContaining({ name: "badge wallet", theme: "light", fg: contrastColors.onOrange, bg: contrastColors.brandOrange }),
        expect.objectContaining({ name: "badge wallet", theme: "dark", fg: contrastColors.onOrange, bg: contrastColors.brandOrange })
      ])
    );
  });

  it("never registers white text on orange surfaces", () => {
    const whiteOnOrange = contrastPairs.filter(
      (pair) => pair.bg.toLowerCase() === contrastColors.brandOrange.toLowerCase() && pair.fg.toLowerCase() === contrastColors.white.toLowerCase()
    );

    expect(whiteOnOrange).toEqual([]);
  });

  it("covers approved gradient text surfaces at their lightest tested point", () => {
    expect(contrastPairs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "newsletter gradient lightest stop", theme: "light", fg: contrastColors.white, bg: contrastColors.spark }),
        expect.objectContaining({ name: "newsletter gradient lightest stop", theme: "dark", fg: contrastColors.white, bg: contrastColors.spark }),
        expect.objectContaining({ name: "og aurora scrim worst stop", theme: "light", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan }),
        expect.objectContaining({ name: "og aurora scrim worst stop", theme: "dark", fg: contrastColors.white, bg: contrastColors.ogScrimOverAuroraCyan })
      ])
    );
  });
});
