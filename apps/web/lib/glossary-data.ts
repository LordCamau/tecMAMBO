import type { GlossaryTerm } from "@/lib/types";

type SeedTerm = {
  term: string;
  slug: string;
  oneLiner: string;
  topics: string[];
  difficulty?: GlossaryTerm["difficulty"];
  aliases?: string[];
  analogy?: string;
  whyItMatters?: string;
  relatedTerms?: string[];
  notToConfuseWith?: string[];
  faqs?: GlossaryTerm["faqs"];
  featured?: boolean;
  trendingScore?: number;
};

const publishedAt = "2026-06-01T08:00:00.000Z";
const updatedAt = "2026-06-26T08:00:00.000Z";

const seedTerms: SeedTerm[] = [
  {
    term: "eSIM",
    slug: "esim",
    oneLiner: "An eSIM is a digital SIM built into your phone, so you can activate a mobile plan without inserting a card.",
    topics: ["Connectivity", "Smartphones"],
    aliases: ["embedded SIM", "digital SIM"],
    analogy: "Think of it like saving your SIM card as a secure profile inside the phone.",
    whyItMatters: "It makes switching plans easier and can be useful for travel, but not every carrier supports it well.",
    relatedTerms: ["physical-sim", "dual-sim", "roaming"],
    notToConfuseWith: ["physical-sim"],
    faqs: [{ question: "Can I use eSIM and a physical SIM together?", answer: "Many dual SIM phones can use one eSIM and one physical SIM at the same time, but support depends on the model and carrier." }],
    featured: true,
    trendingScore: 98
  },
  {
    term: "Physical SIM",
    slug: "physical-sim",
    oneLiner: "A physical SIM is the small removable card that identifies your phone number to a mobile network.",
    topics: ["Connectivity", "Smartphones"],
    aliases: ["SIM card", "nano SIM"],
    analogy: "It is like a tiny ID badge your phone shows the network.",
    relatedTerms: ["esim", "dual-sim", "imei"],
    notToConfuseWith: ["esim"],
    trendingScore: 62
  },
  {
    term: "Refresh rate",
    slug: "refresh-rate",
    oneLiner: "Refresh rate is how many times per second a screen updates what you see.",
    topics: ["Smartphones", "Gaming"],
    aliases: ["Hz", "screen refresh"],
    analogy: "Like flipping pages in a notebook faster, higher refresh can make motion look smoother.",
    whyItMatters: "A high refresh rate can make scrolling and gaming feel smoother, but it can use more battery.",
    relatedTerms: ["adaptive-refresh-rate", "ltpo", "frame-rate"],
    featured: true,
    trendingScore: 90
  },
  {
    term: "Adaptive refresh rate",
    slug: "adaptive-refresh-rate",
    oneLiner: "Adaptive refresh rate lets a display slow down or speed up depending on what is on screen.",
    topics: ["Smartphones", "Power & batteries"],
    aliases: ["variable refresh rate", "VRR"],
    relatedTerms: ["refresh-rate", "ltpo", "battery-life"],
    difficulty: "Getting technical",
    trendingScore: 65
  },
  {
    term: "LTPO",
    slug: "ltpo",
    oneLiner: "LTPO is display tech that helps phones change refresh rate efficiently to save battery.",
    topics: ["Smartphones", "Power & batteries"],
    aliases: ["low temperature polycrystalline oxide"],
    relatedTerms: ["adaptive-refresh-rate", "oled", "refresh-rate"],
    difficulty: "Getting technical"
  },
  {
    term: "mAh",
    slug: "mah",
    oneLiner: "mAh is a battery capacity rating that hints at how much charge a device can store.",
    topics: ["Power & batteries"],
    aliases: ["milliamp hours", "battery capacity"],
    analogy: "Think of it like the size of a fuel tank, not the whole story of fuel economy.",
    relatedTerms: ["fast-charging", "wattage", "battery-life"],
    trendingScore: 88
  },
  {
    term: "Fast charging",
    slug: "fast-charging",
    oneLiner: "Fast charging uses higher power to refill a battery more quickly than a basic charger.",
    topics: ["Power & batteries", "Smartphones"],
    aliases: ["quick charge", "rapid charging"],
    relatedTerms: ["wattage", "usb-c-pd", "mah"],
    trendingScore: 86
  },
  {
    term: "Wattage",
    slug: "wattage",
    oneLiner: "Wattage tells you how much power a charger can deliver at a given moment.",
    topics: ["Power & batteries"],
    aliases: ["watts", "W"],
    analogy: "It is the speed of the tap, while battery capacity is the bucket size.",
    relatedTerms: ["fast-charging", "usb-c-pd", "mah"]
  },
  {
    term: "USB-C PD",
    slug: "usb-c-pd",
    oneLiner: "USB-C PD is a charging standard that lets devices and chargers agree on the right power level.",
    topics: ["Power & batteries", "Connectivity"],
    aliases: ["USB Power Delivery", "Power Delivery", "PD charging"],
    relatedTerms: ["usb-c", "wattage", "fast-charging"],
    featured: true,
    trendingScore: 84
  },
  {
    term: "OLED",
    slug: "oled",
    oneLiner: "OLED is a screen type where each pixel can light itself, which helps blacks look truly dark.",
    topics: ["Smartphones", "Entertainment"],
    aliases: ["organic LED"],
    relatedTerms: ["amoled", "lcd", "nits"],
    notToConfuseWith: ["lcd"],
    trendingScore: 82
  },
  {
    term: "LCD",
    slug: "lcd",
    oneLiner: "LCD is a screen type that uses a backlight behind liquid crystals to show images.",
    topics: ["Smartphones", "Computing"],
    aliases: ["liquid crystal display"],
    relatedTerms: ["oled", "amoled", "nits"],
    notToConfuseWith: ["oled"]
  },
  {
    term: "AMOLED",
    slug: "amoled",
    oneLiner: "AMOLED is an OLED display type often used in phones for rich contrast and efficient dark pixels.",
    topics: ["Smartphones"],
    aliases: ["active matrix OLED"],
    relatedTerms: ["oled", "refresh-rate", "always-on-display"]
  },
  {
    term: "Nits",
    slug: "nits",
    oneLiner: "Nits measure screen brightness, especially how visible a display can be outdoors.",
    topics: ["Smartphones", "Entertainment"],
    aliases: ["brightness", "peak brightness"],
    relatedTerms: ["hdr", "oled", "lcd"],
    trendingScore: 79
  },
  {
    term: "PPI",
    slug: "ppi",
    oneLiner: "PPI means pixels per inch, a rough measure of how sharp a screen looks up close.",
    topics: ["Smartphones", "Computing"],
    aliases: ["pixels per inch", "pixel density"],
    relatedTerms: ["resolution", "oled", "lcd"]
  },
  {
    term: "Aperture",
    slug: "aperture",
    oneLiner: "Aperture is the camera lens opening that affects how much light reaches the sensor.",
    topics: ["Smartphones"],
    aliases: ["f-number", "f-stop"],
    relatedTerms: ["megapixel", "ois", "pixel-binning"],
    difficulty: "Getting technical"
  },
  {
    term: "OIS",
    slug: "ois",
    oneLiner: "OIS physically steadies a camera lens or sensor to reduce blur from shaky hands.",
    topics: ["Smartphones"],
    aliases: ["optical image stabilization"],
    relatedTerms: ["eis", "aperture", "megapixel"],
    notToConfuseWith: ["eis"],
    trendingScore: 77
  },
  {
    term: "EIS",
    slug: "eis",
    oneLiner: "EIS uses software to smooth shaky video or photos after the camera captures them.",
    topics: ["Smartphones"],
    aliases: ["electronic image stabilization"],
    relatedTerms: ["ois", "aperture", "video-stabilization"],
    notToConfuseWith: ["ois"]
  },
  {
    term: "Megapixel",
    slug: "megapixel",
    oneLiner: "A megapixel is one million pixels, but more megapixels do not automatically mean better photos.",
    topics: ["Smartphones"],
    aliases: ["MP", "camera resolution"],
    relatedTerms: ["pixel-binning", "aperture", "ois"],
    trendingScore: 92
  },
  {
    term: "Pixel binning",
    slug: "pixel-binning",
    oneLiner: "Pixel binning combines nearby camera pixels so a phone can capture cleaner photos in low light.",
    topics: ["Smartphones"],
    aliases: ["binned pixels"],
    relatedTerms: ["megapixel", "aperture", "night-mode"],
    difficulty: "Getting technical"
  },
  {
    term: "RAM",
    slug: "ram",
    oneLiner: "RAM is short-term working memory that helps a device keep apps and tasks ready.",
    topics: ["Smartphones", "Computing"],
    aliases: ["memory"],
    relatedTerms: ["storage", "chipset", "ufs"],
    trendingScore: 91
  },
  {
    term: "Storage",
    slug: "storage",
    oneLiner: "Storage is the space where your apps, photos, videos, and files live on a device.",
    topics: ["Smartphones", "Computing"],
    aliases: ["internal storage", "ROM"],
    relatedTerms: ["ram", "ufs", "emmc"]
  },
  {
    term: "UFS",
    slug: "ufs",
    oneLiner: "UFS is fast phone storage that helps apps open and files move more quickly.",
    topics: ["Smartphones", "Computing"],
    aliases: ["Universal Flash Storage"],
    relatedTerms: ["storage", "emmc", "ram"],
    difficulty: "Getting technical"
  },
  {
    term: "eMMC",
    slug: "emmc",
    oneLiner: "eMMC is older, slower storage often found in budget phones and low-cost tablets.",
    topics: ["Smartphones", "Computing"],
    aliases: ["embedded MultiMediaCard"],
    relatedTerms: ["ufs", "storage", "ram"],
    difficulty: "Getting technical"
  },
  {
    term: "Chipset",
    slug: "chipset",
    oneLiner: "A chipset is the main package of processors that runs your phone or computer.",
    topics: ["Smartphones", "Computing"],
    aliases: ["SoC", "system on a chip"],
    relatedTerms: ["gpu", "nanometer", "ram"],
    trendingScore: 83
  },
  {
    term: "GPU",
    slug: "gpu",
    oneLiner: "A GPU is the processor that handles graphics, games, animations, and some AI tasks.",
    topics: ["Gaming", "Computing", "AI"],
    aliases: ["graphics processor"],
    relatedTerms: ["chipset", "ray-tracing", "frame-rate"]
  },
  {
    term: "Nanometer",
    slug: "nanometer",
    oneLiner: "Nanometer labels in chips loosely describe the manufacturing generation, not a simple speed score.",
    topics: ["Computing", "Smartphones"],
    aliases: ["nm", "process node"],
    relatedTerms: ["chipset", "gpu", "battery-life"],
    difficulty: "Deep cut"
  },
  {
    term: "NFC",
    slug: "nfc",
    oneLiner: "NFC is short-range wireless tech used for tap-to-pay, quick pairing, and some access cards.",
    topics: ["Connectivity", "Smartphones"],
    aliases: ["near field communication"],
    relatedTerms: ["tap-to-pay", "mobile-money", "bluetooth"],
    trendingScore: 87
  },
  {
    term: "Bluetooth codec",
    slug: "bluetooth-codec",
    oneLiner: "A Bluetooth codec is the format your phone and earbuds use to send wireless audio.",
    topics: ["Audio", "Connectivity"],
    aliases: ["SBC", "AAC", "LDAC", "aptX"],
    relatedTerms: ["anc", "latency-audio", "spatial-audio"],
    difficulty: "Getting technical"
  },
  {
    term: "ANC",
    slug: "anc",
    oneLiner: "ANC uses microphones and processing to reduce steady background noise in headphones or earbuds.",
    topics: ["Audio", "Wearables"],
    aliases: ["active noise cancellation", "noise cancelling"],
    relatedTerms: ["bluetooth-codec", "transparency-mode", "spatial-audio"],
    trendingScore: 80
  },
  {
    term: "Wi-Fi 6",
    slug: "wi-fi-6",
    oneLiner: "Wi-Fi 6 is a newer Wi-Fi generation designed to handle faster speeds and crowded networks better.",
    topics: ["Connectivity", "Smart Homes"],
    aliases: ["802.11ax"],
    relatedTerms: ["wi-fi-7", "bandwidth", "latency"]
  },
  {
    term: "Wi-Fi 7",
    slug: "wi-fi-7",
    oneLiner: "Wi-Fi 7 is the latest Wi-Fi generation, built for higher speeds and lower delay on supported devices.",
    topics: ["Connectivity", "Smart Homes"],
    aliases: ["802.11be"],
    relatedTerms: ["wi-fi-6", "bandwidth", "latency"],
    difficulty: "Getting technical"
  },
  {
    term: "4G LTE",
    slug: "4g-lte",
    oneLiner: "4G LTE is the mobile network generation that made fast everyday smartphone internet normal.",
    topics: ["Connectivity"],
    aliases: ["LTE", "4G"],
    relatedTerms: ["5g", "volte", "data-bundle"]
  },
  {
    term: "5G",
    slug: "5g",
    oneLiner: "5G is a newer mobile network generation that can offer faster speeds and lower delay where coverage is strong.",
    topics: ["Connectivity"],
    aliases: ["fifth generation network"],
    relatedTerms: ["4g-lte", "bandwidth", "latency"],
    featured: true,
    trendingScore: 93
  },
  {
    term: "VoLTE",
    slug: "volte",
    oneLiner: "VoLTE lets phone calls travel over a 4G network, often improving call quality and connection speed.",
    topics: ["Connectivity"],
    aliases: ["Voice over LTE"],
    relatedTerms: ["4g-lte", "5g", "roaming"]
  },
  {
    term: "Bandwidth",
    slug: "bandwidth",
    oneLiner: "Bandwidth is how much data a connection can move at once.",
    topics: ["Connectivity"],
    aliases: ["internet capacity"],
    analogy: "Think of it like the number of lanes on a road.",
    relatedTerms: ["latency", "ping", "data-bundle"],
    notToConfuseWith: ["latency"],
    trendingScore: 75
  },
  {
    term: "Latency",
    slug: "latency",
    oneLiner: "Latency is the delay before data starts moving between your device and a server.",
    topics: ["Connectivity", "Gaming"],
    aliases: ["delay"],
    analogy: "If bandwidth is road width, latency is the time before the first car starts moving.",
    relatedTerms: ["bandwidth", "ping", "latency-audio"],
    notToConfuseWith: ["bandwidth"]
  },
  {
    term: "Ping",
    slug: "ping",
    oneLiner: "Ping is a simple latency test that measures how quickly a server responds.",
    topics: ["Connectivity", "Gaming"],
    aliases: ["ping time"],
    relatedTerms: ["latency", "bandwidth", "throttling"]
  },
  {
    term: "APN",
    slug: "apn",
    oneLiner: "An APN is the carrier setting that tells your phone how to connect to mobile internet.",
    topics: ["Connectivity", "Smartphones"],
    aliases: ["Access Point Name"],
    relatedTerms: ["data-bundle", "roaming", "physical-sim"]
  },
  {
    term: "Data bundle",
    slug: "data-bundle",
    oneLiner: "A data bundle is a prepaid or plan-based amount of mobile internet you can use.",
    topics: ["Connectivity"],
    aliases: ["internet bundle", "mobile data"],
    relatedTerms: ["throttling", "bandwidth", "apn"],
    trendingScore: 89
  },
  {
    term: "The cloud",
    slug: "the-cloud",
    oneLiner: "The cloud means your files or services live on internet-connected servers instead of only on your device.",
    topics: ["Apps", "Computing"],
    aliases: ["cloud storage", "cloud computing"],
    analogy: "It is like renting a secure drawer somewhere online.",
    relatedTerms: ["cache", "api", "end-to-end-encryption"]
  },
  {
    term: "VPN",
    slug: "vpn",
    oneLiner: "A VPN creates an encrypted tunnel between your device and the internet service you connect through.",
    topics: ["Apps", "Connectivity"],
    aliases: ["virtual private network"],
    whyItMatters: "A VPN can help on public Wi-Fi, but it does not make you anonymous or immune to scams.",
    relatedTerms: ["end-to-end-encryption", "phishing", "cookies"],
    trendingScore: 95
  },
  {
    term: "Two-factor authentication",
    slug: "two-factor-authentication",
    oneLiner: "Two-factor authentication adds a second proof of identity beyond your password.",
    topics: ["Apps", "Security"],
    aliases: ["2FA", "MFA", "two-step verification"],
    relatedTerms: ["phishing", "end-to-end-encryption", "passkey"],
    trendingScore: 81
  },
  {
    term: "End-to-end encryption",
    slug: "end-to-end-encryption",
    oneLiner: "End-to-end encryption keeps a message readable only to the sender and intended recipient.",
    topics: ["Apps", "Security"],
    aliases: ["E2EE"],
    relatedTerms: ["vpn", "two-factor-authentication", "phishing"],
    difficulty: "Getting technical"
  },
  {
    term: "Cookies",
    slug: "cookies",
    oneLiner: "Cookies are small browser files sites use to remember you, save settings, or track activity.",
    topics: ["Apps", "Security"],
    aliases: ["browser cookies"],
    relatedTerms: ["cache", "vpn", "phishing"]
  },
  {
    term: "Cache",
    slug: "cache",
    oneLiner: "Cache is saved temporary data that helps apps and websites load faster next time.",
    topics: ["Apps", "Computing"],
    aliases: ["cached data"],
    relatedTerms: ["cookies", "storage", "the-cloud"]
  },
  {
    term: "Bloatware",
    slug: "bloatware",
    oneLiner: "Bloatware is unwanted preinstalled software that can take up space or push extra services.",
    topics: ["Apps", "Smartphones"],
    aliases: ["preinstalled apps"],
    relatedTerms: ["apk", "sideloading", "ota-update"],
    trendingScore: 70
  },
  {
    term: "APK",
    slug: "apk",
    oneLiner: "An APK is the installable app package file used by Android.",
    topics: ["Apps", "Smartphones"],
    aliases: ["Android package"],
    relatedTerms: ["sideloading", "bloatware", "malware"]
  },
  {
    term: "Sideloading",
    slug: "sideloading",
    oneLiner: "Sideloading means installing an app from outside the official app store.",
    topics: ["Apps", "Smartphones"],
    aliases: ["manual app install"],
    whyItMatters: "It can unlock useful apps, but it also raises the risk of malware if the source is not trustworthy.",
    relatedTerms: ["apk", "malware", "bootloader"]
  },
  {
    term: "OTA update",
    slug: "ota-update",
    oneLiner: "An OTA update is software sent wirelessly to your device without plugging it into a computer.",
    topics: ["Apps", "Smartphones"],
    aliases: ["over-the-air update", "system update"],
    relatedTerms: ["firmware", "bootloader", "bloatware"]
  },
  {
    term: "Bootloader",
    slug: "bootloader",
    oneLiner: "A bootloader is the startup program that helps your device load its operating system.",
    topics: ["Smartphones", "Computing"],
    aliases: ["device bootloader"],
    relatedTerms: ["root", "firmware", "sideloading"],
    difficulty: "Deep cut"
  },
  {
    term: "Root",
    slug: "root",
    oneLiner: "Root access gives deeper control over Android, but it can weaken security and break some apps.",
    topics: ["Smartphones", "Apps"],
    aliases: ["rooting"],
    relatedTerms: ["bootloader", "sideloading", "firmware"],
    difficulty: "Deep cut"
  },
  {
    term: "IP rating",
    slug: "ip-rating",
    oneLiner: "An IP rating tells you how well a device resists dust and water.",
    topics: ["Smartphones", "Wearables"],
    aliases: ["IP68", "water resistance rating"],
    relatedTerms: ["gorilla-glass", "durability", "smartwatch"],
    trendingScore: 76
  },
  {
    term: "Gorilla Glass",
    slug: "gorilla-glass",
    oneLiner: "Gorilla Glass is a toughened display glass brand used to reduce scratches and cracks.",
    topics: ["Smartphones"],
    aliases: ["Corning Gorilla Glass"],
    relatedTerms: ["ip-rating", "durability", "oled"]
  },
  {
    term: "Haptics",
    slug: "haptics",
    oneLiner: "Haptics are the tiny vibrations that make taps, typing, and alerts feel physical.",
    topics: ["Smartphones", "Wearables"],
    aliases: ["vibration feedback"],
    relatedTerms: ["always-on-display", "smartwatch", "gaming"]
  },
  {
    term: "Always-on display",
    slug: "always-on-display",
    oneLiner: "An always-on display shows basic information while the screen is mostly asleep.",
    topics: ["Smartphones", "Wearables"],
    aliases: ["AOD"],
    relatedTerms: ["oled", "ltpo", "battery-life"]
  },
  {
    term: "Frame rate",
    slug: "frame-rate",
    oneLiner: "Frame rate is how many images a game or video shows each second.",
    topics: ["Gaming", "Entertainment"],
    aliases: ["fps", "frames per second"],
    relatedTerms: ["refresh-rate", "gpu", "ray-tracing"],
    notToConfuseWith: ["refresh-rate"]
  },
  {
    term: "Ray tracing",
    slug: "ray-tracing",
    oneLiner: "Ray tracing is graphics tech that simulates light more realistically in games and 3D scenes.",
    topics: ["Gaming", "Computing"],
    aliases: ["real-time ray tracing"],
    relatedTerms: ["gpu", "frame-rate", "hdr"],
    difficulty: "Getting technical"
  },
  {
    term: "Cross-play",
    slug: "cross-play",
    oneLiner: "Cross-play lets people on different gaming platforms play together online.",
    topics: ["Gaming"],
    aliases: ["cross platform play"],
    relatedTerms: ["latency", "ping", "frame-rate"]
  },
  {
    term: "Foldable hinge",
    slug: "foldable-hinge",
    oneLiner: "A foldable hinge is the mechanical part that lets a folding phone open and close smoothly.",
    topics: ["Smartphones"],
    aliases: ["hinge", "foldable phone hinge"],
    relatedTerms: ["ip-rating", "under-display-camera", "durability"]
  },
  {
    term: "Under-display camera",
    slug: "under-display-camera",
    oneLiner: "An under-display camera hides beneath screen pixels so a display can look uninterrupted.",
    topics: ["Smartphones"],
    aliases: ["UDC", "under-screen camera"],
    relatedTerms: ["foldable-hinge", "oled", "megapixel"],
    difficulty: "Getting technical"
  },
  {
    term: "Wireless charging",
    slug: "wireless-charging",
    oneLiner: "Wireless charging refills a device by placing it on a compatible charging pad.",
    topics: ["Power & batteries", "Smartphones"],
    aliases: ["Qi charging", "Qi2"],
    relatedTerms: ["fast-charging", "usb-c-pd", "wattage"]
  },
  {
    term: "USB-C",
    slug: "usb-c",
    oneLiner: "USB-C is the small reversible connector now common on phones, laptops, chargers, and accessories.",
    topics: ["Connectivity", "Power & batteries"],
    aliases: ["Type-C"],
    relatedTerms: ["usb-c-pd", "thunderbolt", "hdmi"],
    trendingScore: 85
  },
  {
    term: "Thunderbolt",
    slug: "thunderbolt",
    oneLiner: "Thunderbolt is a high-speed connection standard that can carry data, display, and power through USB-C-shaped ports.",
    topics: ["Computing", "Connectivity"],
    aliases: ["Thunderbolt 4", "Thunderbolt 5"],
    relatedTerms: ["usb-c", "hdmi", "bandwidth"],
    difficulty: "Getting technical"
  },
  {
    term: "HDMI",
    slug: "hdmi",
    oneLiner: "HDMI is a cable standard for sending video and audio to TVs, monitors, and projectors.",
    topics: ["Entertainment", "Computing"],
    aliases: ["High-Definition Multimedia Interface"],
    relatedTerms: ["4k", "hdr", "thunderbolt"]
  },
  {
    term: "4K",
    slug: "4k",
    oneLiner: "4K is a video resolution with roughly four times as many pixels as 1080p.",
    topics: ["Entertainment", "Computing"],
    aliases: ["Ultra HD", "UHD"],
    relatedTerms: ["1080p", "hdr", "hdmi"]
  },
  {
    term: "1080p",
    slug: "1080p",
    oneLiner: "1080p is a common Full HD video resolution that is still sharp enough for many screens.",
    topics: ["Entertainment", "Computing"],
    aliases: ["Full HD", "FHD"],
    relatedTerms: ["4k", "hdr", "hdmi"]
  },
  {
    term: "HDR",
    slug: "hdr",
    oneLiner: "HDR helps video and photos show brighter highlights, deeper shadows, and richer contrast.",
    topics: ["Entertainment", "Smartphones"],
    aliases: ["high dynamic range"],
    relatedTerms: ["nits", "4k", "oled"],
    difficulty: "Getting technical"
  },
  {
    term: "Bitrate",
    slug: "bitrate",
    oneLiner: "Bitrate is how much data a video or audio stream uses each second.",
    topics: ["Entertainment", "Connectivity"],
    aliases: ["bits per second", "Mbps"],
    relatedTerms: ["codec", "bandwidth", "4k"],
    difficulty: "Getting technical"
  },
  {
    term: "Codec",
    slug: "codec",
    oneLiner: "A codec compresses and decompresses audio or video so it can be stored or streamed efficiently.",
    topics: ["Entertainment", "Computing"],
    aliases: ["H.264", "AV1", "HEVC"],
    relatedTerms: ["bitrate", "bluetooth-codec", "4k"],
    difficulty: "Getting technical"
  },
  {
    term: "Audio latency",
    slug: "latency-audio",
    oneLiner: "Audio latency is the delay between an action and the sound you hear.",
    topics: ["Audio", "Gaming"],
    aliases: ["sound delay"],
    relatedTerms: ["bluetooth-codec", "latency", "spatial-audio"]
  },
  {
    term: "Spatial audio",
    slug: "spatial-audio",
    oneLiner: "Spatial audio makes sound feel like it is coming from around you instead of only left and right.",
    topics: ["Audio", "Entertainment"],
    aliases: ["3D audio"],
    relatedTerms: ["bluetooth-codec", "anc", "latency-audio"]
  },
  {
    term: "Tap-to-pay",
    slug: "tap-to-pay",
    oneLiner: "Tap-to-pay lets you pay by holding a phone, card, or watch near a payment terminal.",
    topics: ["Connectivity", "Apps"],
    aliases: ["contactless payment"],
    relatedTerms: ["nfc", "mobile-money", "two-factor-authentication"]
  },
  {
    term: "Mobile money",
    slug: "mobile-money",
    oneLiner: "Mobile money lets people send, receive, store, and spend money through a phone service.",
    topics: ["Apps", "Connectivity"],
    aliases: ["M-Pesa", "phone money"],
    relatedTerms: ["tap-to-pay", "nfc", "two-factor-authentication"],
    trendingScore: 78
  },
  {
    term: "Refurbished",
    slug: "refurbished",
    oneLiner: "A refurbished device has been previously owned, checked, repaired if needed, and resold.",
    topics: ["Wallet Watch", "Smartphones"],
    aliases: ["renewed", "pre-owned"],
    relatedTerms: ["imei", "battery-life", "warranty"]
  },
  {
    term: "IMEI",
    slug: "imei",
    oneLiner: "An IMEI is a unique identity number for a mobile device.",
    topics: ["Smartphones", "Connectivity"],
    aliases: ["International Mobile Equipment Identity"],
    relatedTerms: ["physical-sim", "dual-sim", "refurbished"]
  },
  {
    term: "Dual SIM",
    slug: "dual-sim",
    oneLiner: "Dual SIM means a phone can use two mobile lines on the same device.",
    topics: ["Smartphones", "Connectivity"],
    aliases: ["two SIMs"],
    relatedTerms: ["esim", "physical-sim", "roaming"]
  },
  {
    term: "Roaming",
    slug: "roaming",
    oneLiner: "Roaming is when your phone connects through another network outside your usual carrier area.",
    topics: ["Connectivity"],
    aliases: ["international roaming"],
    relatedTerms: ["esim", "dual-sim", "data-bundle"]
  },
  {
    term: "Throttling",
    slug: "throttling",
    oneLiner: "Throttling is when a provider or device deliberately slows performance or connection speed.",
    topics: ["Connectivity", "Power & batteries"],
    aliases: ["speed limiting"],
    relatedTerms: ["data-bundle", "bandwidth", "thermal-throttling"]
  },
  {
    term: "Phishing",
    slug: "phishing",
    oneLiner: "Phishing is a scam that tricks you into giving away passwords, money, or private information.",
    topics: ["Apps", "Security"],
    aliases: ["scam link"],
    relatedTerms: ["malware", "two-factor-authentication", "vpn"],
    trendingScore: 94
  },
  {
    term: "Malware",
    slug: "malware",
    oneLiner: "Malware is software designed to harm, spy on, or take control of a device.",
    topics: ["Apps", "Security"],
    aliases: ["malicious software"],
    relatedTerms: ["phishing", "sideloading", "apk"]
  },
  {
    term: "Firmware",
    slug: "firmware",
    oneLiner: "Firmware is low-level software that helps hardware know how to behave.",
    topics: ["Computing", "Smartphones"],
    aliases: ["device firmware"],
    relatedTerms: ["ota-update", "bootloader", "open-source"],
    difficulty: "Getting technical"
  },
  {
    term: "Open source",
    slug: "open-source",
    oneLiner: "Open source software makes its code available for people to inspect, use, or improve under a license.",
    topics: ["Apps", "Computing"],
    aliases: ["OSS"],
    relatedTerms: ["api", "firmware", "llm"],
    difficulty: "Getting technical"
  },
  {
    term: "API",
    slug: "api",
    oneLiner: "An API is a structured way for software systems to talk to each other.",
    topics: ["Apps", "Computing"],
    aliases: ["application programming interface"],
    analogy: "It is like a menu that tells another app what it can ask for.",
    relatedTerms: ["open-source", "the-cloud", "ai-agent"],
    difficulty: "Getting technical"
  },
  {
    term: "LLM",
    slug: "llm",
    oneLiner: "An LLM is an AI model trained to understand and generate text, code, and other language-like patterns.",
    topics: ["AI"],
    aliases: ["large language model", "AI model"],
    relatedTerms: ["ai-agent", "token-ai", "hallucination-ai"],
    featured: true,
    trendingScore: 96
  },
  {
    term: "AI agent",
    slug: "ai-agent",
    oneLiner: "An AI agent is software that can plan steps, use tools, and complete a bounded task with your permission.",
    topics: ["AI", "Apps"],
    aliases: ["agentic AI", "AI assistant"],
    analogy: "Think of it like an assistant that can use a keyboard, not just answer from memory.",
    relatedTerms: ["llm", "api", "token-ai"],
    featured: true,
    trendingScore: 99
  },
  {
    term: "AI token",
    slug: "token-ai",
    oneLiner: "An AI token is a small chunk of text an AI model reads or writes while processing a prompt.",
    topics: ["AI"],
    aliases: ["token", "context token"],
    relatedTerms: ["llm", "ai-agent", "hallucination-ai"],
    difficulty: "Getting technical"
  },
  {
    term: "AI hallucination",
    slug: "hallucination-ai",
    oneLiner: "An AI hallucination is when a model gives an answer that sounds confident but is wrong or unsupported.",
    topics: ["AI"],
    aliases: ["hallucination", "AI error"],
    relatedTerms: ["llm", "ai-agent", "on-device-ai"],
    trendingScore: 97
  },
  {
    term: "On-device AI",
    slug: "on-device-ai",
    oneLiner: "On-device AI runs AI features locally on your phone or computer instead of sending everything to the cloud.",
    topics: ["AI", "Smartphones"],
    aliases: ["local AI"],
    relatedTerms: ["llm", "chipset", "the-cloud"],
    difficulty: "Getting technical"
  },
  {
    term: "Battery life",
    slug: "battery-life",
    oneLiner: "Battery life is how long a device lasts between charges in real use.",
    topics: ["Power & batteries", "Smartphones"],
    aliases: ["screen-on time", "SOT"],
    relatedTerms: ["mah", "ltpo", "fast-charging"],
    trendingScore: 88
  },
  {
    term: "Thermal throttling",
    slug: "thermal-throttling",
    oneLiner: "Thermal throttling is when a device slows itself down to avoid overheating.",
    topics: ["Power & batteries", "Gaming"],
    aliases: ["heat throttling"],
    relatedTerms: ["throttling", "chipset", "battery-life"],
    difficulty: "Getting technical"
  },
  {
    term: "Passkey",
    slug: "passkey",
    oneLiner: "A passkey lets you sign in with device security like fingerprint, face unlock, or screen lock instead of a password.",
    topics: ["Apps", "Security"],
    aliases: ["passwordless login"],
    relatedTerms: ["two-factor-authentication", "phishing", "end-to-end-encryption"]
  },
  {
    term: "Transparency mode",
    slug: "transparency-mode",
    oneLiner: "Transparency mode lets earbuds pipe outside sound in so you can hear people and traffic.",
    topics: ["Audio", "Wearables"],
    aliases: ["ambient mode"],
    relatedTerms: ["anc", "bluetooth-codec", "spatial-audio"]
  },
  {
    term: "Smartwatch",
    slug: "smartwatch",
    oneLiner: "A smartwatch is a wrist-worn computer for notifications, health tracking, apps, and quick controls.",
    topics: ["Wearables"],
    aliases: ["smart watch"],
    relatedTerms: ["ip-rating", "haptics", "always-on-display"]
  },
  {
    term: "Night mode",
    slug: "night-mode",
    oneLiner: "Night mode combines multiple camera frames to make low-light photos brighter and cleaner.",
    topics: ["Smartphones"],
    aliases: ["low light mode"],
    relatedTerms: ["pixel-binning", "ois", "aperture"]
  },
  {
    term: "Video stabilization",
    slug: "video-stabilization",
    oneLiner: "Video stabilization reduces shake so footage looks smoother while you move.",
    topics: ["Smartphones"],
    aliases: ["stabilized video"],
    relatedTerms: ["eis", "ois", "frame-rate"]
  },
  {
    term: "Resolution",
    slug: "resolution",
    oneLiner: "Resolution is the number of pixels used to make an image, video, or screen.",
    topics: ["Entertainment", "Smartphones"],
    aliases: ["screen resolution"],
    relatedTerms: ["ppi", "4k", "1080p"]
  },
  {
    term: "Warranty",
    slug: "warranty",
    oneLiner: "A warranty is a promise that a seller or maker will fix certain problems within a set period.",
    topics: ["Wallet Watch", "Smartphones"],
    aliases: ["guarantee"],
    relatedTerms: ["refurbished", "imei", "durability"]
  },
  {
    term: "Durability",
    slug: "durability",
    oneLiner: "Durability describes how well a device survives drops, dust, water, bending, and daily wear.",
    topics: ["Smartphones", "Wearables"],
    aliases: ["ruggedness"],
    relatedTerms: ["ip-rating", "gorilla-glass", "warranty"]
  }
];

function explanation(seed: SeedTerm) {
  return `${seed.oneLiner} In everyday buying decisions, the useful question is not just what the spec says, but what it changes for comfort, cost, speed, safety, or battery life.`;
}

export const glossaryTerms: GlossaryTerm[] = seedTerms
  .map((seed, index) => ({
    term: seed.term,
    slug: seed.slug,
    oneLiner: seed.oneLiner,
    pronunciation: undefined,
    aliases: seed.aliases ?? [],
    analogy: seed.analogy,
    fullExplanation: explanation(seed),
    whyItMatters: seed.whyItMatters,
    notToConfuseWith: seed.notToConfuseWith,
    relatedTerms: seed.relatedTerms ?? [],
    topics: seed.topics,
    difficulty: seed.difficulty ?? "Everyday",
    faqs: seed.faqs,
    featured: seed.featured,
    termOfDay: index === 0 ? "2026-06-26" : undefined,
    sources: [],
    publishedAt,
    updatedAt,
    trendingScore: seed.trendingScore ?? Math.max(20, 72 - index)
  }))
  .sort((a, b) => a.term.localeCompare(b.term));

