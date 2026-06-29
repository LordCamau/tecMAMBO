import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/formats";

export default function robots(): MetadataRoute.Robots {
  const allowAnswerBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bingbot"
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...allowAnswerBots.map((userAgent) => ({ userAgent, allow: "/" }))
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/news-sitemap.xml`]
  };
}
