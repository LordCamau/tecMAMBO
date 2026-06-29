import "server-only";

const articleFragment = /* GraphQL */ `
  fragment ArticleFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    date
    modified
    content
    featuredImage {
      node {
        sourceUrl
        altText
        caption
      }
    }
    author {
      node {
        id
        name
        slug
        description
        avatar {
          url
        }
      }
    }
    formats {
      nodes {
        name
        slug
      }
    }
    topics {
      nodes {
        name
        slug
      }
    }
    brands {
      nodes {
        name
        slug
      }
    }
    regions {
      nodes {
        name
        slug
        description
      }
    }
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
    }
    articleFields {
      subhead
      whyItMatters
      imageCredit
      sponsored
      readTime
      goDeeper {
        intro
        specTable {
          label
          value
        }
      }
      verdict {
        score
        summary
        pros {
          item
        }
        cons {
          item
        }
      }
      deal {
        productName
        retailer
        priceCurrent
        priceWas
        currency
        affiliateUrl
        dealExpiry
        bestUnderThreshold
        verified
      }
      faqs {
        question
        answer
      }
      closingLine
    }
  }
`;

export const ARTICLES_QUERY = /* GraphQL */ `
  ${articleFragment}
  query Articles($first: Int = 100, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...ArticleFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const ARTICLE_BY_SLUG_QUERY = /* GraphQL */ `
  ${articleFragment}
  query ArticleBySlug($slug: ID!, $asPreview: Boolean = false) {
    post(id: $slug, idType: SLUG, asPreview: $asPreview) {
      ...ArticleFields
    }
  }
`;

export const ARTICLE_BY_DATABASE_ID_QUERY = /* GraphQL */ `
  ${articleFragment}
  query ArticleByDatabaseId($id: ID!, $asPreview: Boolean = true) {
    post(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
      ...ArticleFields
    }
  }
`;

export const GLOSSARY_TERMS_QUERY = /* GraphQL */ `
  query GlossaryTerms($first: Int = 200) {
    glossaryTerms(first: $first, where: { status: PUBLISH, orderby: { field: TITLE, order: ASC } }) {
      nodes {
        id
        slug
        title
        content
        date
        modified
        topics {
          nodes {
            name
            slug
          }
        }
        glossaryFields {
          oneLiner
          pronunciation
          aliases {
            alias
          }
          analogy
          fullExplanation
          whyItMatters
          difficulty
          featured
          termOfDay
          relatedTerms {
            nodes {
              ... on GlossaryTerm {
                slug
              }
            }
          }
          notToConfuseWith {
            nodes {
              ... on GlossaryTerm {
                slug
              }
            }
          }
          faqs {
            question
            answer
          }
          sources {
            label
            url
          }
        }
      }
    }
  }
`;

export const TAXONOMIES_QUERY = /* GraphQL */ `
  query Taxonomies {
    topics(first: 200) {
      nodes {
        name
        slug
      }
    }
    brands(first: 200) {
      nodes {
        name
        slug
      }
    }
    regions(first: 200) {
      nodes {
        name
        slug
        description
      }
    }
  }
`;

export const AUTHORS_QUERY = /* GraphQL */ `
  query Authors($first: Int = 100) {
    users(first: $first, where: { hasPublishedPosts: POST }) {
      nodes {
        id
        name
        slug
        description
        avatar {
          url
        }
        authorFields {
          role
          expertise {
            item
          }
        }
      }
    }
  }
`;
