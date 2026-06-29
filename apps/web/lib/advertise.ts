export type AdvertiseStat = {
  label: string;
  value?: string;
  note?: string;
};

export type AdvertiseOffering = {
  title: string;
  body: string;
};

export type AdvertiseFaq = {
  question: string;
  answer: string;
};

export type AdvertiseSettings = {
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
  };
  pillars: AdvertiseOffering[];
  audience: {
    heading: string;
    intro: string;
    stats: AdvertiseStat[];
  };
  offerings: AdvertiseOffering[];
  trust: {
    heading: string;
    body: string;
  };
  process: AdvertiseOffering[];
  socialProof: {
    heading: string;
    body: string;
    partners: Array<{ name: string; logoUrl?: string; quote?: string }>;
  };
  faq: AdvertiseFaq[];
  form: {
    heading: string;
    sub: string;
    responseTime: string;
    advertisingEmail?: string;
    partnershipsInbox?: string;
    schedulingLink?: string;
    currency: string;
    budgetRanges: string[];
    mediaKitFile?: string;
  };
  editorPlaceholders: string[];
};

export const advertiseSettings: AdvertiseSettings = {
  hero: {
    eyebrow: "ADVERTISE WITH tecMAMBO",
    title: "Reach people at the moment they are trying to understand tech.",
    sub:
      "tecMAMBO is where everyday people and curious enthusiasts come to make sense of technology, and to decide what to buy. Put your brand in that moment, in a place readers actually trust."
  },
  pillars: [
    {
      title: "An audience that is deciding.",
      body:
        "Our readers are not idly scrolling. They are researching phones, tools, and services, and working out what to spend their money on. That is a high-intent moment, and a valuable one."
    },
    {
      title: "Trust that transfers.",
      body:
        "We are independent, we label everything sponsored, and we never let advertising bend our verdicts. Readers know it, which is exactly why a message here lands differently from a banner on a clickbait page."
    },
    {
      title: "We make complex things clear.",
      body:
        "If your product is powerful but hard to explain, you are who we can help most. Making complicated technology make sense is the single thing we do best."
    },
    {
      title: "Rooted in Kenya, read beyond it.",
      body:
        "We understand this market: the prices, the networks, the realities. And we speak to a growing pan-African and global audience of tech-curious readers."
    }
  ],
  audience: {
    heading: "Our audience",
    intro:
      "Here is who you reach. We are a young, fast-growing publication, and we would rather show you real, current numbers than impressive-looking ones. The figures here are kept up to date, and the media kit has the full breakdown.",
    stats: [
      { label: "Monthly readers" },
      { label: "Newsletter subscribers" },
      { label: "Average engagement / time on page" },
      { label: "Top regions" },
      { label: "Device split" },
      { label: "Reader interests" }
    ]
  },
  offerings: [
    {
      title: "Display advertising.",
      body:
        "Clean, viewable placements that respect the reader and sit well beside quality content. No clutter, no pop-ups, no dark patterns. Your brand in good company."
    },
    {
      title: "Sponsored and partner content.",
      body:
        "Plain-English branded stories, written to the same standard as our journalism and clearly labelled. Ideal when your product needs explaining, not just showing."
    },
    {
      title: "Newsletter sponsorship.",
      body:
        "A clear, well-placed message in The MAMBO Briefing, in front of readers who opted in and actually pay attention."
    },
    {
      title: "Commerce and Wallet Watch.",
      body:
        "Product inclusion in our buying guides and deals coverage, through honest, disclosed affiliate partnerships. Merit based: we recommend on value."
    },
    {
      title: "Custom partnerships.",
      body:
        "Sponsored explainer series, Glossary sponsorships, events, video, and longer-term brand partnerships built around your goals."
    }
  ],
  trust: {
    heading: "Honest by design",
    body:
      "Everything sponsored is clearly labelled, and our editorial team keeps the final say on quality. That transparency is not a limitation, it is the reason our audience trusts what they read here, and why your message benefits from being in that environment."
  },
  process: [
    {
      title: "Tell us your goals.",
      body: "Send a short message about what you are trying to achieve, and your rough budget."
    },
    {
      title: "We propose a plan.",
      body: "We come back with formats and ideas suited to your goals, not a generic rate card."
    },
    {
      title: "We create and launch.",
      body: "For content, we craft it to tecMAMBO quality, with your input and clear labelling."
    },
    {
      title: "We report back.",
      body: "You get clear results, so you know what your spend did."
    }
  ],
  socialProof: {
    heading: "Be one of our first partners",
    body:
      "We are building tecMAMBO into the clearest tech publication in the region, and we are choosing our early partners carefully. If that sounds like the kind of company you want to keep, let us talk.",
    partners: []
  },
  faq: [
    {
      question: "What does it cost?",
      answer:
        "We tailor to your goals and budget rather than a one-size rate card. Tell us your budget and we will propose options. The media kit includes guide pricing."
    },
    {
      question: "Can we choose where our ads appear?",
      answer: "Yes. We can place by section and topic, in the newsletter, or within specific campaigns, depending on the format."
    },
    {
      question: "How is sponsored content labelled?",
      answer: "Clearly and visibly, in line with our editorial standards, so readers always know what they are reading."
    },
    {
      question: "Can we sponsor a review, or pay for a good verdict?",
      answer:
        "No. Our reviews are independent and not for sale. We are happy to suggest other formats that fit your goals."
    },
    {
      question: "What are your ad standards?",
      answer:
        "Brand-safe, non-intrusive, and privacy-compliant. No pop-ups, no content-covering units, and consent-based personalisation."
    },
    {
      question: "How do I get started?",
      answer: "Fill in the form on this page or email us, and we will reply within two business days."
    }
  ],
  form: {
    heading: "Let us make your brand understood.",
    sub: "Tell us a little about your goals and we will be in touch.",
    responseTime: "two business days",
    currency: "USD",
    budgetRanges: ["Under USD 1,000", "USD 1,000 to 2,500", "USD 2,500 to 5,000", "USD 5,000 to 10,000", "USD 10,000+", "Not sure yet"],
    mediaKitFile: "/api/advertise/media-kit"
  },
  editorPlaceholders: [
    "Monthly readers",
    "Newsletter subscribers",
    "Average engagement / time on page",
    "Top regions",
    "Device split",
    "Reader interests",
    "advertising email",
    "partnerships inbox",
    "scheduling link",
    "media kit file",
    "CRM or email integration keys"
  ]
};

export const populatedAudienceStats = advertiseSettings.audience.stats.filter((stat) => stat.value?.trim());

export const interestOptions = [
  "Display",
  "Sponsored content",
  "Newsletter",
  "Commerce / Wallet Watch",
  "Custom partnership",
  "Not sure yet"
];
