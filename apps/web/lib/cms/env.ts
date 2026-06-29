import "server-only";

export type ContentSource = "local" | "wordpress";

export function contentSource(): ContentSource {
  return process.env.CONTENT_SOURCE === "wordpress" ? "wordpress" : "local";
}

export function shouldUseWordPress() {
  return contentSource() === "wordpress";
}

export function wordpressEndpoint() {
  return process.env.WORDPRESS_GRAPHQL_ENDPOINT?.trim() || "";
}

export function wordpressAuthHeader(): Record<string, string> {
  const token = process.env.WORDPRESS_API_TOKEN_OR_APP_PASSWORD?.trim();
  return token ? { Authorization: `Basic ${token}` } : {};
}

export function wordpressIsConfigured() {
  return Boolean(wordpressEndpoint());
}

export function cmsWarning(message: string, error?: unknown) {
  if (process.env.NODE_ENV === "test") return;
  const detail = error instanceof Error ? error.message : error ? String(error) : "";
  console.warn(`[tecMAMBO CMS] ${message}${detail ? `: ${detail}` : ""}`);
}
