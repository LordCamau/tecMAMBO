import "server-only";
import { wordpressAuthHeader, wordpressEndpoint, wordpressIsConfigured } from "./env";

type GraphqlRequestOptions = {
  variables?: Record<string, unknown>;
  authenticated?: boolean;
  tags?: string[];
  revalidate?: number;
};

type GraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export class CmsConfigurationError extends Error {}
export class CmsGraphqlError extends Error {}

export async function wordpressRequest<T>(query: string, options: GraphqlRequestOptions = {}) {
  if (!wordpressIsConfigured()) {
    throw new CmsConfigurationError("WORDPRESS_GRAPHQL_ENDPOINT is not configured");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.authenticated ? wordpressAuthHeader() : {})
  };

  const response = await fetch(wordpressEndpoint(), {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: options.variables ?? {} }),
    next: {
      revalidate: options.revalidate ?? 300,
      tags: options.tags ?? ["cms"]
    }
  });

  if (!response.ok) {
    throw new CmsGraphqlError(`WPGraphQL returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as GraphqlResponse<T>;
  if (payload.errors?.length) {
    throw new CmsGraphqlError(payload.errors.map((error) => error.message).join("; "));
  }
  if (!payload.data) {
    throw new CmsGraphqlError("WPGraphQL response did not include data");
  }
  return payload.data;
}
