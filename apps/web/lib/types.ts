export type Format =
  | "explainer"
  | "review"
  | "wallet-watch"
  | "real-life"
  | "news"
  | "opinion"
  | "business";

export type Tag = {
  name: string;
  slug: string;
  kind: "topic" | "brand";
};

export type RegionTerm = {
  name: string;
  slug: string;
  group: "Africa" | "Global";
  description: string;
  flag?: string;
  icon?: string;
  heroImage?: {
    src: string;
    alt: string;
    credit: string;
  };
};

export type Author = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
};

export type SpecRow = {
  label: string;
  value: string;
};

export type Deal = {
  productName: string;
  retailer: string;
  priceCurrent: number;
  priceWas?: number;
  currency: "KSh" | "USD";
  affiliateUrl: string;
  expiry?: string;
  bestUnderThreshold?: number;
  verified: boolean;
};

export type Article = {
  id: string;
  slug: string;
  format: Format;
  title: string;
  seo?: {
    title: string;
    description: string;
  };
  subhead: string;
  excerpt: string;
  whyItMatters: string;
  body: string[];
  goDeeper?: {
    intro: string;
    specs: SpecRow[];
  };
  closingLine?: string;
  verdict?: {
    score: string;
    summary: string;
    pros: string[];
    cons: string[];
  };
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  image: {
    src: string;
    alt: string;
    credit: string;
  };
  tags: Tag[];
  regions?: RegionTerm[];
  faq?: Array<{ question: string; answer: string }>;
  itemList?: string[];
  sponsored?: boolean;
  deal?: Deal;
};

export type GlossaryTerm = {
  term: string;
  slug: string;
  oneLiner: string;
  pronunciation?: string;
  aliases: string[];
  analogy?: string;
  fullExplanation: string;
  whyItMatters?: string;
  notToConfuseWith?: string[];
  relatedTerms: string[];
  topics: string[];
  difficulty: "Everyday" | "Getting technical" | "Deep cut";
  faqs?: Array<{ question: string; answer: string }>;
  featured?: boolean;
  termOfDay?: string;
  sources?: Array<{ label: string; url: string }>;
  publishedAt: string;
  updatedAt: string;
  trendingScore?: number;
};
