import type { CodegenConfig } from "@graphql-codegen/cli";

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("WORDPRESS_GRAPHQL_ENDPOINT is required for cms:codegen");
}

const config: CodegenConfig = {
  schema: [
    {
      [endpoint]: {
        headers: process.env.WORDPRESS_API_TOKEN_OR_APP_PASSWORD
          ? {
              Authorization: `Basic ${process.env.WORDPRESS_API_TOKEN_OR_APP_PASSWORD}`
            }
          : {}
      }
    }
  ],
  documents: ["lib/cms/queries.ts"],
  generates: {
    "lib/cms/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        avoidOptionals: true,
        maybeValue: "T | null",
        immutableTypes: true
      }
    }
  }
};

export default config;
