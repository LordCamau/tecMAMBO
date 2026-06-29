import type { Article, Author, Tag } from "@/lib/types";
import { loadDraftArticles } from "@/lib/article-drafts";
import { buildAiArticles } from "@/lib/ai-articles";
import { getRegion } from "@/lib/regions";

export const authors: Author[] = [
  {
    name: "Tim Humphreys",
    slug: "tim-humphreys",
    role: "tecMAMBO writer",
    bio: "Tim writes plain-English technology stories that connect specs, prices, products, and policy to everyday decisions.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    expertise: ["Phones", "Power & batteries", "Connectivity", "Reviews"]
  },
  {
    name: "Lulu Kiritu",
    slug: "lulu-kiritu",
    role: "Senior Writer and Editor",
    bio: "Lulu Kiritu is a Senior Writer and Editor at tecMAMBO, covering artificial intelligence. She is happiest turning a dense research paper into something you can actually use over lunch, and she writes about how AI shows up in real life, not just on stage at a launch. Based in Nairobi.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    expertise: ["Artificial intelligence"]
  }
];

export const topics: Tag[] = [
  { name: "AI", slug: "ai", kind: "topic" },
  { name: "Apps", slug: "apps", kind: "topic" },
  { name: "Smartphones", slug: "smartphones", kind: "topic" },
  { name: "Computing", slug: "computing", kind: "topic" },
  { name: "Social Media", slug: "social-media", kind: "topic" },
  { name: "Entertainment", slug: "entertainment", kind: "topic" },
  { name: "EVs & Mobility", slug: "evs-mobility", kind: "topic" },
  { name: "Gaming", slug: "gaming", kind: "topic" },
  { name: "Wearables", slug: "wearables", kind: "topic" },
  { name: "Smart Homes", slug: "smart-homes", kind: "topic" },
  { name: "Startups", slug: "startups", kind: "topic" },
  { name: "Audio", slug: "audio", kind: "topic" },
  { name: "Connectivity", slug: "connectivity", kind: "topic" },
  { name: "Power & batteries", slug: "power-batteries", kind: "topic" },
  { name: "Headphones", slug: "headphones", kind: "topic" },
  { name: "Smart Watches", slug: "smart-watches", kind: "topic" },
  { name: "VR & AR", slug: "vr-ar", kind: "topic" },
];

export const brands: Tag[] = [
  { name: "Samsung", slug: "samsung", kind: "brand" },
  { name: "Oraimo", slug: "oraimo", kind: "brand" },
  { name: "Apple", slug: "apple", kind: "brand" },
  { name: "Vivo", slug: "vivo", kind: "brand" },
  { name: "Anthropic", slug: "anthropic", kind: "brand" },
  { name: "OpenAI", slug: "openai", kind: "brand" },
  { name: "Google", slug: "google", kind: "brand" },
  { name: "Microsoft", slug: "microsoft", kind: "brand" }
];

const startupTopic = topics.find((topic) => topic.slug === "startups")!;
const aiTopic = topics.find((topic) => topic.slug === "ai")!;
const appsTopic = topics.find((topic) => topic.slug === "apps")!;
const connectivityTopic = topics.find((topic) => topic.slug === "connectivity")!;
const smartphoneTopic = topics.find((topic) => topic.slug === "smartphones")!;
const mobilityTopic = topics.find((topic) => topic.slug === "evs-mobility")!;
const powerTopic = topics.find((topic) => topic.slug === "power-batteries")!;
const kenyaRegion = getRegion("kenya")!;
const nigeriaRegion = getRegion("nigeria")!;
const southAfricaRegion = getRegion("south-africa")!;
const rwandaRegion = getRegion("rwanda")!;

const regionalArticles: Article[] = [
  {
    id: "africa-kenya-ai-policy",
    slug: "kenya-ai-rules-mean-more-than-paperwork",
    format: "business",
    title: "Kenya's AI rules mean more than paperwork",
    subhead: "Good AI policy is not just about control. It is about giving builders, buyers, and citizens a clearer floor to stand on.",
    excerpt: "Kenya's AI debate is really about confidence: who gets protected, who gets to build, and how much of the future is made locally.",
    whyItMatters:
      "Clear rules can help local AI companies sell to cautious customers without making the market feel closed before it has grown.",
    body: [
      "AI policy can sound distant until a startup tries to sell a tool to a bank, a hospital, or a county office. Then the questions get practical very quickly. Where is the data stored? Who is accountable when the answer is wrong? Can a person appeal a decision the system helped make?",
      "Kenya's opportunity is to keep those questions practical. A rulebook that is too loose leaves citizens exposed and serious buyers nervous. A rulebook that is too heavy can make young companies spend more time proving compliance than proving usefulness.",
      "The best version sits in the middle: clear consent, clear accountability, room for local experimentation, and enough certainty that builders do not have to wait for rules written somewhere else."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 26, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 26, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop",
      alt: "A laptop and phone on a tidy desk",
      credit: "Unsplash"
    },
    tags: [startupTopic, aiTopic],
    regions: [kenyaRegion]
  },
  {
    id: "africa-nigeria-fintech",
    slug: "why-nigerian-fintech-keeps-spreading-into-everyday-life",
    format: "business",
    title: "Why Nigerian fintech keeps spreading into everyday life",
    subhead: "The most durable fintech products do not feel like finance. They feel like fewer errands, faster payments, and clearer records.",
    excerpt: "Nigeria's fintech story is not only about big funding rounds. The useful products are the ones that make daily money movement less tiring.",
    whyItMatters:
      "When payments, savings, credit, and business tools meet people where they already transact, software becomes infrastructure.",
    body: [
      "The strongest Nigerian fintech products tend to win by reducing friction. They shorten a payment queue, make a small business ledger easier to trust, or turn a phone into a tool that can receive money without ceremony.",
      "That is why the category keeps spreading beyond the finance team. A market trader, creator, logistics operator, or student may not think of themselves as using fintech. They are simply using the thing that helps money move with less waiting.",
      "The next test is trust. Convenience gets people to try a service. Transparent fees, reliable support, and clear dispute handling are what make them keep it."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 24, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 24, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1800&auto=format&fit=crop",
      alt: "A person paying for a product at a retail counter",
      credit: "Unsplash"
    },
    tags: [startupTopic, appsTopic],
    regions: [nigeriaRegion]
  },
  {
    id: "africa-south-africa-power-apps",
    slug: "south-africas-power-apps-show-what-useful-tech-looks-like",
    format: "real-life",
    title: "South Africa's power apps show what useful tech looks like",
    subhead: "The best local software often starts with a very ordinary question: what do people need to plan their day?",
    excerpt: "Power and connectivity tools are a reminder that useful technology is not always glamorous. Sometimes it just helps people plan.",
    whyItMatters:
      "When infrastructure is uneven, good apps can turn uncertainty into a plan. That is a real consumer benefit.",
    body: [
      "Some apps become useful because they are clever. Others become useful because the world around them is inconvenient. South Africa's power-planning tools sit in that second category, and that is not an insult.",
      "A good local utility app does not need to be beautiful first. It needs to be timely, clear, and honest about what it knows. If it helps someone charge a laptop, schedule a call, or keep a small shop running, it has done something more valuable than most novelty features.",
      "That lesson travels well beyond power cuts. The best local tech starts with the friction people actually feel, then removes just enough of it to make the day easier."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 23, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 23, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
      alt: "Network hardware with connected cables",
      credit: "Unsplash"
    },
    tags: [appsTopic, connectivityTopic],
    regions: [southAfricaRegion]
  },
  {
    id: "africa-rwanda-digital-services",
    slug: "rwandas-digital-services-lesson-is-about-boring-reliability",
    format: "explainer",
    title: "Rwanda's digital services lesson is about boring reliability",
    subhead: "The most impressive public-service technology is often the kind people stop noticing because it simply works.",
    excerpt: "Rwanda's digital-service push is a useful reminder that the real test for civic tech is reliability, not spectacle.",
    whyItMatters:
      "When public services move online, the design challenge is trust. People need to know the service is clear, accessible, and consistent.",
    body: [
      "Civic technology is easy to oversell. A portal, app, or digital ID system can sound transformative in a launch speech, then fail quietly if people cannot understand it or reach it when they need it.",
      "That is why the boring parts matter most: plain language, uptime, support, accessibility, and a clear path when something goes wrong. Digital public services earn trust by being predictable.",
      "Rwanda's lesson for other markets is not that every service should become an app. It is that the technology around public services should make the service feel simpler, not more distant."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 21, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 21, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop",
      alt: "A calm public office with desks and computers",
      credit: "Unsplash"
    },
    tags: [appsTopic, connectivityTopic],
    regions: [rwandaRegion]
  }
];

const mobilityArticles: Article[] = [
  {
    id: "mobility-1",
    slug: "why-electric-motorbikes-matter-more-than-flashy-ev-launches",
    format: "real-life",
    title: "Why electric motorbikes matter more than flashy EV launches",
    subhead: "The most important electric vehicles may be the ones that lower daily running costs, not the ones on glossy stages.",
    excerpt: "Electric motorbikes are a practical mobility story: battery swaps, charging access, repair networks, and daily earnings all matter more than hype.",
    whyItMatters:
      "If electric mobility is going to work for more people, it has to make the everyday commute and delivery shift cheaper, simpler, and easier to maintain.",
    body: [
      "Electric cars get the dramatic photos, but electric motorbikes may be the more interesting test of whether EVs can fit real urban life. They are cheaper to buy, easier to park, and closer to the daily economics of riders who count every shilling spent on fuel and repairs.",
      "The challenge is not only the bike. It is the system around it: charging, battery swaps, spare parts, financing, and technicians who can keep the fleet moving when something breaks.",
      "That is why the best electric mobility story is not a single launch. It is a network that makes the cheaper choice feel reliable enough to trust every morning."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 25, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
      alt: "Motorbike parked on a city street",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic],
    regions: [kenyaRegion]
  },
  {
    id: "mobility-2",
    slug: "the-real-test-for-ev-charging-isnt-speed-its-location",
    format: "explainer",
    title: "The real test for EV charging isn't speed. It's location.",
    subhead: "Fast chargers are useful, but the charger you can actually reach at the right time matters more.",
    excerpt: "EV charging is not only a battery story. It is a maps, rent, power, parking, and payments story too.",
    whyItMatters:
      "Charging access decides whether an EV feels freeing or stressful. The best network is the one that fits how people already move.",
    body: [
      "Charging speed is easy to advertise because a number looks impressive. Location is harder to sell, but it matters more. A slower charger near home, work, or a regular stop can be more useful than a faster one that sits across town.",
      "Good charging networks solve several small problems at once. They need clear pricing, reliable power, safe parking, simple payments, and enough availability that drivers do not plan their whole day around a socket.",
      "That is why EV adoption depends on maps as much as motors. A charger becomes useful when it appears where life already happens."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 19, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 19, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1800&auto=format&fit=crop",
      alt: "Electric car plugged into a charger",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic]
  },
  {
    id: "mobility-3",
    slug: "what-ride-hailing-apps-changed-after-the-hype-faded",
    format: "business",
    title: "What ride-hailing apps changed after the hype faded",
    subhead: "The real product was never just the app. It was pricing, trust, routing, payments, and a market of drivers trying to make the day add up.",
    excerpt: "Ride-hailing changed how cities move, but the hard questions now are about driver earnings, reliability, and what a fair trip should cost.",
    whyItMatters:
      "Mobility platforms sit between convenience and livelihoods. The design choices show up in both a passenger's bill and a driver's day.",
    body: [
      "The first version of ride hailing felt like magic because it removed uncertainty. You could see the car, the driver, the price, and the route. That was a real improvement over hoping transport would appear at the right time.",
      "The mature version is less magical and more complicated. Prices move, driver incentives change, traffic eats into earnings, and users start comparing reliability instead of novelty.",
      "The next mobility winners will be the companies that treat drivers as part of the product, not as a hidden cost behind the button."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 17, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 17, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1800&auto=format&fit=crop",
      alt: "Cars moving through city traffic",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, appsTopic],
    regions: [kenyaRegion, southAfricaRegion]
  },
  {
    id: "mobility-4",
    slug: "why-cheap-e-bikes-are-harder-to-buy-than-they-look",
    format: "wallet-watch",
    title: "Why cheap e-bikes are harder to buy than they look",
    subhead: "A low price can hide weak batteries, poor brakes, awkward parts, and warranty terms nobody explains at checkout.",
    excerpt: "Buying an e-bike is less about the motor headline and more about battery quality, spares, brakes, weight, and local support.",
    whyItMatters:
      "A bargain e-bike can become expensive if the battery fades quickly or simple replacement parts are hard to find.",
    body: [
      "Cheap e-bikes are tempting because the promise is obvious: easier movement for less money. The part worth slowing down for is ownership after the first week.",
      "Ask about the battery chemistry, replacement cost, brake quality, tyre size, charger warranty, and whether a local repair shop can actually get parts. Those boring details decide whether the bike stays useful.",
      "The best budget buy is not always the cheapest one. It is the one with a battery and support story you can believe."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 15, 7, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 15, 7, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1800&auto=format&fit=crop",
      alt: "A bicycle parked near a city wall",
      credit: "Unsplash"
    },
    tags: [mobilityTopic, powerTopic]
  }
];

const businessArticles: Article[] = [
  {
    id: "business-1",
    slug: "why-local-ai-startups-are-selling-workflows-not-magic",
    format: "business",
    title: "Why local AI startups are selling workflows, not magic",
    subhead: "The useful companies are packaging AI around customer support, finance, logistics, and routine office tasks.",
    excerpt: "AI startup winners are less interested in spectacle and more interested in boring jobs that save teams time every week.",
    whyItMatters:
      "This is where AI becomes a real budget line for small companies. The best products will feel practical before they feel futuristic.",
    body: [
      "The clearest AI startup pitches are not trying to sound like science fiction. They start with a task a business already pays someone to repeat, then ask whether software can make that task faster, safer, or easier to audit.",
      "That shift matters because it changes what buyers should ask. The right question is not whether a startup uses the newest model. It is whether the product fits the workflow, protects the data, and leaves a human in charge of important decisions.",
      "For founders, the lesson is just as direct. A narrow tool with clear savings will usually beat a broad AI promise that nobody knows how to deploy."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 22, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 22, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1800&auto=format&fit=crop",
      alt: "Startup team discussing product plans around a laptop",
      credit: "Unsplash"
    },
    tags: [startupTopic, aiTopic],
    regions: [kenyaRegion, nigeriaRegion, southAfricaRegion, rwandaRegion]
  },
  {
    id: "business-2",
    slug: "the-quiet-business-behind-pay-later-gadget-shops",
    format: "business",
    title: "The quiet business behind pay-later gadget shops",
    subhead: "Device financing can help buyers access better gear, but the fine print decides whether the deal is fair.",
    excerpt: "Pay-later gadget offers are spreading because they solve a real cash-flow problem, but buyers need the total cost in plain sight.",
    whyItMatters:
      "A low deposit can hide a high final price. Clear comparisons help buyers separate useful financing from expensive pressure.",
    body: [
      "A phone or laptop paid over several months can make sense when the device helps someone study, work, or earn. The problem starts when the shelf price, deposit, fees, and penalties are shown in different places.",
      "For retailers, financing increases the number of people who can say yes. For customers, it only works when the full repayment amount is visible before the first payment is made.",
      "The better version of this market is boring in the best way: clear prices, clear deadlines, and no surprise lockouts."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 20, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 20, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1800&auto=format&fit=crop",
      alt: "A person paying for a product at a retail counter",
      credit: "Unsplash"
    },
    tags: [startupTopic, appsTopic],
    regions: [kenyaRegion]
  },
  {
    id: "business-3",
    slug: "why-repair-networks-may-be-the-next-phone-battleground",
    format: "business",
    title: "Why repair networks may be the next phone battleground",
    subhead: "As phones last longer, repair access is becoming part of the buying decision, not an afterthought.",
    excerpt: "Brands that make batteries, screens, and diagnostics easier to access may earn trust long after launch day.",
    whyItMatters:
      "A phone that is easy to repair can be cheaper over its full life. That matters more as flagship prices keep climbing.",
    body: [
      "The phone market is no longer only about launch specs. People are keeping devices longer, which means batteries, screens, and software support now shape the real cost of ownership.",
      "Repair networks are becoming a competitive advantage because they reduce anxiety. Buyers want to know what happens after a cracked display, a weak battery, or a charging port failure.",
      "The brands that treat repair as part of the product may end up looking more premium than brands that only win on launch-day hardware."
    ],
    author: authors[0]!,
    publishedAt: new Date(Date.UTC(2026, 5, 18, 6, 0, 0)).toISOString(),
    updatedAt: new Date(Date.UTC(2026, 5, 18, 6, 0, 0)).toISOString(),
    readTime: "4 min read",
    image: {
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1800&auto=format&fit=crop",
      alt: "Technician working on electronics at a repair bench",
      credit: "Unsplash"
    },
    tags: [startupTopic, smartphoneTopic],
    regions: [kenyaRegion, nigeriaRegion, southAfricaRegion]
  }
];

const aiArticles = buildAiArticles({ authors, topics, brands });

const regionAssignments: Record<string, string[]> = {
  "kenya-ai-rules-quiet-advantage": ["kenya"],
  "three-ai-assistants-real-nairobi-week": ["kenya"],
  "end-of-free-ai-not-a-disaster": ["kenya"],
  "anthropic-mythos-models-export-control": ["kenya"]
};

function attachRegions(article: Article): Article {
  if (article.regions?.length) return article;
  const assigned = regionAssignments[article.slug]?.map((slug) => getRegion(slug)).filter((region): region is NonNullable<typeof region> => Boolean(region));
  return assigned?.length ? { ...article, regions: assigned } : article;
}

export const articles: Article[] = [...regionalArticles, ...mobilityArticles, ...businessArticles, ...aiArticles, ...loadDraftArticles({ authors, topics, brands })].map(attachRegions).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export { glossaryTerms } from "./glossary-data";
