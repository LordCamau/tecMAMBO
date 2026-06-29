export type LegalSegment = string | { text: string; href: string };

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: LegalSegment[][];
};

export type LegalPage = {
  slug: string;
  title: string;
  eyebrow?: string;
  lastUpdated: string;
  summaryLabel: string;
  summary: LegalSegment[];
  placeholders: string[];
  placeholderTitle?: string;
  placeholderIntro?: string;
  sections: LegalSection[];
};

const privacyPolicy = { text: "Privacy Policy", href: "/privacy" };
const cookiePolicy = { text: "Cookie Policy", href: "/cookies" };
const termsOfUse = { text: "Terms of Use", href: "/terms" };
const aboutPage = { text: "About page", href: "/about" };
const contactPage = { text: "contact details", href: "/contact" };
const consentTool = { text: "consent tool", href: "/cookies#manage-cookie-preferences" };
const consentManagementTool = { text: "consent management tool", href: "/cookies#manage-cookie-preferences" };

export const termsPage: LegalPage = {
  slug: "terms",
  title: "Terms of Use",
  lastUpdated: "April 15, 2026",
  summaryLabel: "The short version (a plain summary, not a replacement for the full terms below).",
  summary: [
    "Welcome to tecMAMBO. By using this website you agree to the terms on this page. In plain English: read and enjoy our content, but do not copy it wholesale or misuse the site; our articles are information, not professional advice, so use your own judgement before spending money or making decisions; some links and content are sponsored or earn us a commission, and we label those; and we do our best to be accurate, but we cannot promise the site will be perfect or always available. The full terms follow, and they are the ones that legally apply."
  ],
  placeholders: [
    "[Legal Entity Name]",
    "[registration number]",
    "[registered address]",
    "[legal contact email]",
    "[general contact email]",
    "[Note for legal review: confirm whether arbitration under the Arbitration Act of Kenya is preferred, and complete this clause accordingly.]"
  ],
  sections: [
    {
      id: "who-we-are",
      title: "1. Who we are and what these terms cover",
      paragraphs: [
        [
          'tecMAMBO is a technology media publication. This website, including all of its pages, articles, the Glossary, newsletters, and related features (together, the "Service"), is operated by [Legal Entity Name], a company registered in Kenya under registration number [registration number], with its registered office at [registered address] ("we", "us", or "our"). These Terms of Use ("Terms") govern your access to and use of the Service. Please read them carefully. If you do not agree with them, please do not use the Service.'
        ]
      ]
    },
    {
      id: "acceptance",
      title: "2. Acceptance of these terms",
      paragraphs: [
        [
          "By accessing, browsing, or otherwise using tecMAMBO, you confirm that you have read, understood, and agree to be bound by these Terms and by our ",
          privacyPolicy,
          " and ",
          cookiePolicy,
          ", which are incorporated into these Terms by reference. These Terms form a binding agreement between you and us."
        ]
      ]
    },
    {
      id: "changes",
      title: "3. Changes to these terms",
      paragraphs: [
        [
          'We may update these Terms from time to time, for example to reflect changes to the Service, to our business, or to the law. When we do, we will revise the "Last updated" date at the top of this page, and where the changes are significant we will take reasonable steps to bring them to your attention. Your continued use of tecMAMBO after any change takes effect means you accept the updated Terms. We encourage you to review this page periodically.'
        ]
      ]
    },
    {
      id: "eligibility",
      title: "4. Eligibility and age",
      paragraphs: [
        [
          "The Service is intended for a general audience. If you are under the age of 18, you may use tecMAMBO only with the involvement and consent of a parent or legal guardian, and that parent or guardian accepts these Terms on your behalf. Some features, such as subscribing to a newsletter or submitting content, may carry their own age requirements, and we may ask you to confirm that you meet them. If we learn that we have collected personal information from a child in a way that does not comply with applicable law, we will take appropriate steps to delete it. Please see our ",
          privacyPolicy,
          " for more detail."
        ]
      ]
    },
    {
      id: "what-we-provide",
      title: "5. What tecMAMBO provides",
      paragraphs: [
        [
          "tecMAMBO publishes editorial content designed to make technology easier to understand. This includes explainers, reviews, buying guides, news, opinion, real-world testing, a plain-English Glossary, and email newsletters. We provide this content for general information and interest. We may add, change, suspend, or remove features, sections, or content at any time, and we may limit the availability of the Service in certain regions or to certain users, without notice and without liability to you."
        ]
      ]
    },
    {
      id: "not-advice",
      title: "6. Editorial content is information, not professional advice",
      paragraphs: [
        [
          "Our content is provided for general informational purposes only. It is not professional advice and should not be relied on as such. Nothing on tecMAMBO is intended to be financial, investment, legal, tax, security, medical, or other professional advice, and reading it does not create any professional or advisory relationship between you and us. Technology, prices, specifications, availability, and laws change quickly, and what is accurate on the date of publication may not remain accurate later. Before making a purchase or any other decision based on our content, you should do your own research and, where appropriate, seek advice from a suitably qualified professional. Any reliance you place on our content is strictly at your own risk."
        ]
      ]
    },
    {
      id: "reviews",
      title: "7. Reviews, recommendations, and buying guides",
      paragraphs: [
        [
          'Our reviews, "best of" lists, and buying guides reflect the honest opinions and testing of our editorial team as at the time of writing. They are subjective assessments, not guarantees of performance, suitability, or value, and they are not promises that any product will meet your particular needs. Prices, deals, discounts, stock levels, and product specifications mentioned on tecMAMBO can change without notice, and we do not guarantee that any price or offer shown is current, available, or applicable to you. Always confirm the details with the retailer or manufacturer before you buy.'
        ]
      ]
    },
    {
      id: "advertising",
      title: "8. Advertising, affiliate links, and sponsored content",
      paragraphs: [
        [
          "tecMAMBO is funded in part by advertising, affiliate links, and clearly labelled partner or sponsored content. This means that some links on the Service are affiliate links, and we may earn a commission if you click them and make a purchase, at no additional cost to you. We also publish some content that is sponsored by, or produced in collaboration with, a third party. We aim to label sponsored and partner content clearly, and our editorial judgement is not for sale: commercial relationships do not determine the conclusions of our independent reviews. We are not responsible for the products, services, offers, or content of any advertiser, affiliate, or sponsor, and any transaction you enter into with a third party is solely between you and that third party. Advertisements and sponsored placements do not constitute an endorsement by us unless we expressly say so."
        ]
      ]
    },
    {
      id: "intellectual-property",
      title: "9. Intellectual property and ownership",
      paragraphs: [
        [
          "All content on tecMAMBO, including articles, text, headlines, photographs, illustrations, graphics, logos, the tecMAMBO name and wordmark, the Glossary, page layouts, design, code, and the selection and arrangement of all of the above, is owned by us or our licensors and is protected by copyright, trademark, and other intellectual property laws in Kenya and internationally. Except as expressly permitted in these Terms or by law, nothing on the Service grants you any right, title, or interest in that content."
        ]
      ]
    },
    {
      id: "limited-licence",
      title: "10. Your limited licence to use tecMAMBO",
      paragraphs: [
        [
          "We grant you a limited, personal, non-exclusive, non-transferable, revocable licence to access and use the Service, and to view, share, and print individual pages, for your own personal, non-commercial use. This licence is subject to these Terms. You may not, without our prior written permission: copy, reproduce, republish, scrape, harvest, mirror, frame, sell, license, distribute, or otherwise exploit any part of the Service or its content; remove or alter any copyright, trademark, or other proprietary notices; or use any automated system, including bots, crawlers, or scrapers, to access, extract, or index the Service in a way that places an unreasonable load on our infrastructure or that breaches any access controls or instructions we publish, including our robots file. Where we make machine-readable versions of our content available, your use of them remains subject to these Terms and to any usage terms we publish alongside them. Reasonable quotation of short extracts with clear attribution and a link back to tecMAMBO is permitted, provided it does not misrepresent our content or imply our endorsement."
        ]
      ]
    },
    {
      id: "trademarks",
      title: "11. Trademarks",
      paragraphs: [
        [
          '"tecMAMBO", the tecMAMBO wordmark, and our associated logos and brand features are trademarks of [Legal Entity Name]. You may not use them without our prior written consent, except to refer fairly and accurately to tecMAMBO in a way that does not suggest any sponsorship, endorsement, or affiliation that does not exist. All other trademarks, product names, and brand names referenced on the Service, including those of the companies and products we write about, belong to their respective owners, and their use on tecMAMBO is for identification and editorial purposes only and does not imply any affiliation or endorsement.'
        ]
      ]
    },
    {
      id: "acceptable-use",
      title: "12. Acceptable use",
      paragraphs: [
        [
          "When you use tecMAMBO, you agree that you will not: use the Service for any unlawful, fraudulent, or harmful purpose; breach any applicable law or regulation; infringe the intellectual property or other rights of us or any third party; upload, post, or transmit any content that is unlawful, defamatory, obscene, hateful, harassing, threatening, or otherwise objectionable; impersonate any person or entity, or misrepresent your affiliation with any person or entity; introduce viruses, malware, or any other harmful or disruptive code; attempt to gain unauthorised access to the Service, to any account, or to any systems or networks connected to the Service; interfere with, disrupt, or place an undue burden on the Service or its infrastructure; or collect or harvest personal information about other users. We reserve the right to investigate and to take appropriate action against anyone who, in our sole discretion, breaches this section, including removing content and restricting or terminating access."
        ]
      ]
    },
    {
      id: "user-content",
      title: "13. Content you submit",
      paragraphs: [
        [
          'The Service may let you submit content, for example comments, questions through an "Ask MAMBO" feature, suggestions for the Glossary, feedback, or messages through a contact form ("User Content"). You are solely responsible for any User Content you submit, and you confirm that you own it or have the necessary rights to submit it, and that it does not breach these Terms or any law or third-party right. By submitting User Content, you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, sublicensable, and transferable licence to use, store, reproduce, adapt, publish, translate, distribute, and display that User Content in connection with operating, promoting, and improving the Service and our publication, in any media now known or later developed. We are not obliged to publish, use, or retain any User Content, and we may remove or edit User Content at our discretion. We do not endorse any User Content, and views expressed in User Content are those of the person who submitted them, not ours.'
        ]
      ]
    },
    {
      id: "newsletters",
      title: "14. Newsletters and communications",
      paragraphs: [
        [
          "If you subscribe to a tecMAMBO newsletter or other email updates, you agree that we may send you the communications you signed up for. You can unsubscribe at any time using the link in any email or by contacting us. Our handling of your email address and related data is described in our ",
          privacyPolicy,
          "."
        ]
      ]
    },
    {
      id: "third-party-links",
      title: "15. Third-party links and services",
      paragraphs: [
        [
          "The Service may contain links to third-party websites, products, services, or content that we do not own or control, including those of advertisers, affiliates, sponsors, and the companies we write about. We provide these links for convenience and information only. We do not endorse and are not responsible for the content, accuracy, products, services, policies, or practices of any third party, and we are not liable for any loss or damage arising from your use of any third-party website or service. Your dealings with any third party, and your use of any third-party site, are governed by that third party's own terms and policies, which you should review."
        ]
      ]
    },
    {
      id: "accuracy",
      title: "16. Accuracy and availability",
      paragraphs: [
        [
          "We put genuine care into our content, but we do not warrant that it is complete, accurate, current, or free from errors or omissions, and we may correct, update, or remove content at any time. We also do not warrant that the Service will be uninterrupted, secure, timely, or error-free, that defects will be corrected, or that the Service or the servers that make it available are free of viruses or other harmful components. We may suspend, withdraw, or restrict the availability of all or any part of the Service for operational, maintenance, legal, or business reasons, and we will try, but are not obliged, to give you notice."
        ]
      ]
    },
    {
      id: "warranties",
      title: "17. Disclaimer of warranties",
      paragraphs: [
        [
          'To the fullest extent permitted by applicable law, the Service and all content on it are provided on an "as is" and "as available" basis, without warranties of any kind, whether express, implied, or statutory, including any implied warranties of merchantability, fitness for a particular purpose, title, accuracy, and non-infringement. We make no warranty that the Service will meet your requirements or expectations. Nothing in these Terms excludes or limits any warranty, right, or liability that cannot lawfully be excluded or limited, including certain rights you may have as a consumer under the laws of Kenya.'
        ]
      ]
    },
    {
      id: "liability",
      title: "18. Limitation of liability",
      paragraphs: [
        [
          "To the fullest extent permitted by applicable law, we, together with our directors, employees, contributors, agents, and licensors, will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, or other intangible losses, arising out of or relating to your access to or use of, or inability to access or use, the Service or any content on it, whether based in contract, tort (including negligence), statute, or otherwise, and whether or not we were advised of the possibility of such damages. To the fullest extent permitted by applicable law, our total aggregate liability to you for all claims arising out of or relating to the Service or these Terms will not exceed one hundred United States dollars (USD 100) or its equivalent in Kenya Shillings. Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be limited or excluded under applicable law."
        ]
      ]
    },
    {
      id: "indemnity",
      title: "19. Indemnity",
      paragraphs: [
        [
          "To the fullest extent permitted by applicable law, you agree to indemnify, defend, and hold harmless tecMAMBO and [Legal Entity Name], together with our directors, employees, contributors, agents, and licensors, from and against any claims, liabilities, damages, losses, costs, and expenses, including reasonable legal fees, arising out of or in any way connected with your breach of these Terms, your misuse of the Service, your User Content, or your violation of any law or the rights of any third party."
        ]
      ]
    },
    {
      id: "privacy-cookies",
      title: "20. Privacy, cookies, and data protection",
      paragraphs: [
        [
          "We respect your privacy and handle personal data in accordance with the Data Protection Act, 2019 of Kenya and other applicable law. Our ",
          privacyPolicy,
          " explains what personal data we collect, how we use and protect it, and the rights you have, and our ",
          cookiePolicy,
          " explains how we use cookies and similar technologies. By using the Service, you acknowledge that you have read those policies. Please review our ",
          privacyPolicy,
          " and our ",
          cookiePolicy,
          " for full details."
        ]
      ]
    },
    {
      id: "copyright-complaints",
      title: "21. Copyright complaints and takedown",
      paragraphs: [
        [
          "We respect the intellectual property rights of others and ask you to do the same. If you believe that content on tecMAMBO infringes your copyright or other intellectual property right, please contact us at [legal contact email] with enough detail to identify the work concerned, the location of the material on the Service, your contact details, and a statement of your good-faith belief that the use is not authorised. We will review valid notices and take appropriate action, which may include removing the material in question."
        ]
      ]
    },
    {
      id: "termination",
      title: "22. Suspension and termination",
      paragraphs: [
        [
          "We may suspend, restrict, or terminate your access to all or part of the Service at any time, with or without notice, if we reasonably believe that you have breached these Terms or any applicable law, or to protect the Service, other users, or our rights. You may stop using the Service at any time. Sections of these Terms that by their nature should survive termination, including those on intellectual property, User Content licences, disclaimers, limitation of liability, indemnity, and governing law, will continue to apply after your use of the Service ends."
        ]
      ]
    },
    {
      id: "governing-law",
      title: "23. Governing law and jurisdiction",
      paragraphs: [
        [
          "These Terms, and any dispute or claim arising out of or in connection with them or your use of the Service, including non-contractual disputes or claims, are governed by and construed in accordance with the laws of the Republic of Kenya. Subject to the dispute resolution section below, you and we agree that the courts of Kenya have jurisdiction to settle any such dispute or claim."
        ]
      ]
    },
    {
      id: "disputes",
      title: "24. Dispute resolution",
      paragraphs: [
        [
          "If a dispute arises between you and us in connection with the Service or these Terms, we encourage you to contact us first so that we can try to resolve it informally and in good faith. If the dispute cannot be resolved informally within a reasonable period, it will be subject to the governing law and jurisdiction set out above, or to any alternative dispute resolution process that you and we agree to in writing. [Note for legal review: confirm whether arbitration under the Arbitration Act of Kenya is preferred, and complete this clause accordingly.]"
        ]
      ]
    },
    {
      id: "general",
      title: "25. General terms",
      paragraphs: [
        [
          "These Terms, together with our ",
          privacyPolicy,
          " and ",
          cookiePolicy,
          ", are the entire agreement between you and us regarding the Service, and they replace any prior agreements on that subject. If any provision of these Terms is found to be invalid or unenforceable, that provision will be limited or removed to the minimum extent necessary, and the remaining provisions will remain in full force and effect. Our failure to enforce any provision of these Terms is not a waiver of that provision or of our right to enforce it later. You may not assign or transfer these Terms or your rights under them without our prior written consent, and we may assign or transfer them freely, for example as part of a merger, acquisition, or sale of assets. We will not be liable for any failure or delay in performing our obligations where that failure or delay results from causes beyond our reasonable control, including acts of God, network or power failures, or other events of force majeure. Nothing in these Terms creates any partnership, agency, employment, or joint venture between you and us, and these Terms do not give any rights to any third party except as expressly stated."
        ]
      ]
    },
    {
      id: "contact",
      title: "26. How to contact us",
      paragraphs: [
        [
          "If you have any questions about these Terms, you can reach us at [general contact email], or by writing to [Legal Entity Name], [registered address]. We are based in Nairobi, Kenya."
        ]
      ]
    }
  ]
};

export const privacyPage: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  lastUpdated: "April 15, 2026",
  summaryLabel: "The short version (a plain summary, not a replacement for the full policy below).",
  summary: [
    "Your privacy matters to us. This policy explains, in plain English, what personal information tecMAMBO collects, why we collect it, and what you can do about it. In short: if you sign up for a newsletter or message us, we use the details you give us for those purposes; when you browse, we and our partners use cookies and similar tools to keep the site working, understand what is read, and show advertising, and you can control much of this through your cookie choices; we do not sell your personal information for money; and you have rights over your data, including the right to access it, correct it, or ask us to delete it. The full policy follows, and it is the one that legally applies."
  ],
  placeholders: [
    "[Legal Entity Name]",
    "[registration number]",
    "[registered address]",
    "[privacy contact email]",
    "[Data Protection Officer name or role]",
    "[verify and insert ODPC website and contact details]"
  ],
  sections: [
    {
      id: "about-this-policy",
      title: "1. About this policy and who we are",
      paragraphs: [
        [
          'This Privacy Policy explains how tecMAMBO collects, uses, shares, and protects personal data when you visit our website, read our content, subscribe to our newsletters, or otherwise interact with us (together, the "Service"). For the purposes of the Data Protection Act, 2019 of Kenya (the "Act") and other applicable data protection law, the data controller responsible for your personal data is [Legal Entity Name], a company registered in Kenya under registration number [registration number], with its registered office at [registered address] ("we", "us", or "our"). "Personal data" means any information that relates to an identified or identifiable person. By using the Service, you acknowledge that you have read and understood this policy. This policy should be read together with our ',
          cookiePolicy,
          " and our ",
          termsOfUse,
          "."
        ]
      ]
    },
    {
      id: "personal-data-we-collect",
      title: "2. The personal data we collect",
      paragraphs: [
        ["We collect the following categories of personal data:"],
        [
          'Information you give us directly. This includes your email address when you subscribe to a newsletter, and any information you provide when you contact us, ask a question through an "Ask MAMBO" feature, suggest a Glossary term, leave a comment, respond to a survey, or otherwise communicate with us. This may include your name, your email address, and the content of your message.'
        ],
        [
          "Information we collect automatically when you use the Service. This includes your device and browser type, operating system, IP address, general location inferred from your IP address, the pages and articles you view, the links you click, the date and time of your visit, the website or source you arrived from, and similar usage and diagnostic information. We collect this through cookies, pixels, local storage, server logs, and similar technologies, as described in our ",
          cookiePolicy,
          "."
        ],
        [
          "Information from third parties. We may receive information about you from analytics providers, advertising partners, and platforms you use to interact with us, such as social media networks, in line with their own terms and your settings on those services."
        ],
        [
          "We do not intentionally collect special categories of personal data (such as data about your health, religion, or political views) through the Service, and we ask that you do not send us such data."
        ]
      ]
    },
    {
      id: "how-we-collect",
      title: "3. How we collect your personal data",
      paragraphs: [
        [
          "We collect personal data when you provide it to us directly, for example by subscribing to a newsletter or sending us a message; automatically as you browse and interact with the Service, through cookies and similar technologies; and occasionally from third parties such as our analytics and advertising partners. Where the law requires your consent for a particular form of collection, such as certain cookies, we will ask for it and you can withdraw it later."
        ]
      ]
    },
    {
      id: "cookies",
      title: "4. Cookies and similar technologies",
      paragraphs: [
        [
          "We and our partners use cookies and similar technologies to operate the Service, remember your preferences, measure how the Service is used, and deliver and measure advertising. Where required by law, we ask for your consent before placing non-essential cookies, and you can manage your choices through our ",
          consentTool,
          " and your browser settings. For full details of the cookies we use and how to control them, please see our ",
          cookiePolicy,
          "."
        ]
      ]
    },
    {
      id: "lawful-bases",
      title: "5. How and why we use your personal data, and our lawful bases",
      paragraphs: [
        ["We use your personal data for the following purposes, relying on the lawful bases recognised under the Act:"],
        [
          "To provide, operate, and maintain the Service, including delivering pages, content, and the Glossary to you. Our lawful basis is our legitimate interest in running and improving our publication, and, where relevant, the performance of our agreement with you under our ",
          termsOfUse,
          "."
        ],
        ["To send you newsletters and updates you have asked for. Our lawful basis is your consent, which you can withdraw at any time."],
        [
          "To respond to your questions, comments, suggestions, and other messages. Our lawful basis is our legitimate interest in communicating with our readers, and your consent where you have provided it."
        ],
        [
          "To publish and moderate comments and other content you choose to submit. Our lawful basis is our legitimate interest in operating community and feedback features and keeping them safe and lawful."
        ],
        [
          "To understand how the Service is used and to improve it, through analytics and measurement. Our lawful basis is your consent where required for the relevant cookies, and otherwise our legitimate interest in understanding and improving our content and performance."
        ],
        [
          "To display advertising, including personalised advertising where you have consented, and to measure its performance. Our lawful basis is your consent for personalised advertising and related cookies, and our legitimate interest in funding the Service through advertising that is not personalised."
        ],
        ["To operate affiliate links and report resulting referrals. Our lawful basis is our legitimate interest in funding the Service."],
        [
          "To keep the Service secure, prevent and detect fraud, abuse, and security incidents, and enforce our ",
          termsOfUse,
          ". Our lawful basis is our legitimate interest in protecting the Service, our users, and our rights, and compliance with our legal obligations."
        ],
        ["To comply with our legal obligations and to respond to lawful requests from public authorities. Our lawful basis is compliance with a legal obligation."],
        ["Where we rely on legitimate interests, we balance those interests against your rights and freedoms, and you may object to that processing as described below."]
      ]
    },
    {
      id: "advertising-analytics",
      title: "6. Advertising, analytics, and your choices",
      paragraphs: [
        [
          "tecMAMBO is funded in part by advertising and analytics that help us understand our audience. We work with third-party advertising and measurement partners, which may include advertising networks and platforms, who may use cookies, advertising identifiers, and similar technologies to collect information about your activity in order to deliver and measure advertising. Where personalised advertising and non-essential analytics require your consent, we collect it through our ",
          consentManagementTool,
          ", and you can change or withdraw your choices at any time. You can also use the privacy and advertising settings offered by your browser and device. Some of our content contains affiliate links, and if you click them and make a purchase, the retailer may receive information about that referral, as explained in our ",
          termsOfUse,
          " and ",
          cookiePolicy,
          "."
        ]
      ]
    },
    {
      id: "sharing",
      title: "7. When and with whom we share personal data",
      paragraphs: [
        ["We do not sell your personal data for money. We share personal data only as described in this policy, including with the following recipients:"],
        [
          "Service providers and processors who perform services on our behalf, such as website hosting, content delivery, email and newsletter delivery, analytics, search, and customer communication. These providers act on our instructions and are bound by appropriate confidentiality and data protection obligations."
        ],
        ["Advertising and measurement partners, subject to your consent where required, to deliver and measure advertising on the Service."],
        ["Affiliate partners and retailers, where you choose to follow an affiliate link, so that a resulting purchase can be attributed."],
        [
          "Public authorities, regulators, courts, and law enforcement, where we are required to do so by law, or where disclosure is necessary to protect our rights, your safety, or the safety of others."
        ],
        ["Professional advisers, such as our lawyers, accountants, and insurers, where necessary."],
        [
          "A buyer or successor, in connection with a merger, acquisition, financing, reorganisation, or sale of assets, in which case personal data may be transferred as part of that transaction, subject to this policy."
        ]
      ]
    },
    {
      id: "international-transfers",
      title: "8. International transfers of personal data",
      paragraphs: [
        [
          "Some of the service providers and partners we work with are located outside Kenya, which means your personal data may be transferred to, stored in, or processed in other countries. Where we transfer personal data outside Kenya, we take the steps required by the Act to ensure that your data continues to be protected, which may include transferring to countries or recipients that provide an adequate level of protection, putting appropriate contractual safeguards in place, or relying on another lawful basis for the transfer, such as your consent. You may contact us for more information about the safeguards we use."
        ]
      ]
    },
    {
      id: "retention",
      title: "9. How long we keep personal data",
      paragraphs: [
        [
          "We keep personal data only for as long as is necessary for the purposes for which we collected it, including to satisfy any legal, accounting, or reporting requirements. For example, we keep your newsletter subscription data until you unsubscribe and for a reasonable period afterwards to honour your choice, we keep messages you send us for as long as needed to handle your request and for our records, and we keep usage and log data for a limited period for security and analytics. When we no longer need personal data, we delete it or anonymise it so that it can no longer be associated with you."
        ]
      ]
    },
    {
      id: "security",
      title: "10. How we protect personal data",
      paragraphs: [
        [
          "We use appropriate technical and organisational measures designed to protect personal data against unauthorised access, loss, misuse, or alteration, including encryption in transit, access controls, and limiting access to those who need it. No method of transmission over the internet or method of storage is completely secure, so while we work to protect your personal data, we cannot guarantee its absolute security. If we become aware of a personal data breach that is likely to result in a risk to your rights and freedoms, we will act in accordance with the Act, including notifying the Office of the Data Protection Commissioner and, where required, affected individuals."
        ]
      ]
    },
    {
      id: "rights",
      title: "11. Your data protection rights",
      paragraphs: [
        [
          "Subject to the conditions and exceptions in the Act, you have rights in relation to your personal data, which may include the right to be informed of how your data is used, the right to access the personal data we hold about you, the right to ask us to correct personal data that is inaccurate or misleading, the right to ask us to delete personal data in certain circumstances, the right to object to or restrict certain processing, the right to data portability where it applies, and the right to withdraw your consent at any time where we rely on consent. Where we rely on your consent, withdrawing it does not affect the lawfulness of processing carried out before you withdrew it. To exercise any of these rights, please contact us using the details in Section 17. We may need to verify your identity before acting on your request, and we will respond within the timeframes required by the Act. Exercising these rights is free of charge in most cases."
        ]
      ]
    },
    {
      id: "marketing",
      title: "12. Marketing and newsletters",
      paragraphs: [
        [
          "If you have subscribed to a tecMAMBO newsletter, we will send you the communications you signed up for. You can unsubscribe at any time by using the unsubscribe link in any email we send, or by contacting us. Unsubscribing from marketing communications does not affect any service-related messages we may need to send you, or the lawfulness of communications sent before you unsubscribed."
        ]
      ]
    },
    {
      id: "children",
      title: "13. Children's privacy",
      paragraphs: [
        [
          "The Service is intended for a general audience and is not directed at children under the age of 18. We do not knowingly collect personal data from a child without the consent of a parent or guardian where such consent is required by law. If you are a parent or guardian and you believe that a child has provided us with personal data without appropriate consent, please contact us so that we can take appropriate steps to address it, including deleting the data where required."
        ]
      ]
    },
    {
      id: "automated-decisions",
      title: "14. Automated decision-making and profiling",
      paragraphs: [
        [
          "We do not make decisions that produce legal effects concerning you, or that similarly significantly affect you, based solely on automated processing. Some of our advertising partners may use profiling to show advertising they consider relevant to you, and this takes place subject to your consent and the choices available through our consent tool and your device settings, as described in our ",
          cookiePolicy,
          "."
        ]
      ]
    },
    {
      id: "third-party-services",
      title: "15. Third-party websites and services",
      paragraphs: [
        [
          "The Service contains links to third-party websites, products, and services, including those of advertisers, affiliates, sponsors, and the companies we write about. This policy does not apply to those third parties, and we are not responsible for their privacy practices. We encourage you to read the privacy policies of any third-party site or service you visit."
        ]
      ]
    },
    {
      id: "changes",
      title: "16. Changes to this policy",
      paragraphs: [
        [
          'We may update this policy from time to time, for example to reflect changes to the Service, to our partners, or to the law. When we do, we will revise the "Last updated" date at the top of this page, and where the changes are significant we will take reasonable steps to bring them to your attention. We encourage you to review this page periodically.'
        ]
      ]
    },
    {
      id: "contact",
      title: "17. How to contact us and our Data Protection Officer",
      paragraphs: [
        [
          "If you have any questions about this policy, or if you would like to exercise your data protection rights, you can contact us at [privacy contact email], or by writing to [Legal Entity Name], [registered address]. Our data protection contact is [Data Protection Officer name or role], who can be reached at the same address. We are based in Nairobi, Kenya."
        ]
      ]
    },
    {
      id: "complaints",
      title: "18. How to complain",
      paragraphs: [
        [
          "We hope to resolve any concern you have about how we handle your personal data. If you are not satisfied, you have the right to lodge a complaint with the Office of the Data Protection Commissioner of Kenya, whose current contact details are published on its official website at [verify and insert ODPC website and contact details]. We would, however, appreciate the chance to address your concerns before you approach the regulator, so please consider contacting us first."
        ]
      ]
    }
  ]
};

export const cookiePage: LegalPage = {
  slug: "cookies",
  title: "Cookie Policy",
  lastUpdated: "April 15, 2026",
  summaryLabel: "The short version (a plain summary, not a replacement for the full policy below).",
  summary: [
    'When you visit tecMAMBO, we and our partners use cookies and similar technologies. Some are essential to make the site work, and others help us understand what is read, remember your preferences such as light or dark mode, and show and measure advertising. You are in control of the ones that are not essential. You can accept or reject them when you first visit, and you can change your mind at any time using the "Manage cookie preferences" control on this page or in our footer. The full policy below explains what we use, why, and how to manage it.'
  ],
  placeholders: [
    "[Legal Entity Name]",
    "[registered address]",
    "[privacy contact email]",
    "[verify and insert ODPC website and contact details]"
  ],
  sections: [
    {
      id: "about-this-policy",
      title: "1. About this policy and who we are",
      paragraphs: [
        [
          'This Cookie Policy explains how tecMAMBO uses cookies and similar technologies when you visit our website (the "Service"), what those technologies are, why we use them, and the choices you have. tecMAMBO is operated by [Legal Entity Name], a company registered in Kenya, with its registered office at [registered address] ("we", "us", or "our"). This Cookie Policy should be read together with our ',
          privacyPolicy,
          ", which explains how we handle personal data more generally, and our ",
          termsOfUse,
          "."
        ]
      ]
    },
    {
      id: "what-cookies-are",
      title: "2. What cookies and similar technologies are",
      paragraphs: [
        [
          'A cookie is a small text file that a website places on your device when you visit, and that your browser sends back to that website on later visits. Cookies let a site remember information about your visit, such as your preferences and how you use the site. We also use technologies that work in a similar way, including pixels and web beacons (small images or snippets of code that record certain activity), local and session storage (which store information in your browser), software development kits, device and advertising identifiers, and server log files. In this policy we use the word "cookies" to refer to cookies and all of these similar technologies, unless we say otherwise.'
        ]
      ]
    },
    {
      id: "why-we-use-cookies",
      title: "3. Why we use cookies",
      paragraphs: [
        [
          "We use cookies to keep the Service running and secure, to remember your choices and preferences, to understand how the Service is used so that we can improve it, and to deliver and measure advertising that helps fund our work. Some of these cookies are essential, and the Service cannot work properly without them. Others are optional, and we set them only where you have given your consent."
        ]
      ]
    },
    {
      id: "cookie-categories",
      title: "4. The categories of cookies we use",
      paragraphs: [
        [
          'We group the cookies we use into the categories below. A current, detailed list of the specific cookies in each category, including their names, providers, purposes, and durations, is available at any time through the "Manage cookie preferences" control on this page, which we keep up to date as our cookies change.'
        ],
        [
          "Strictly necessary cookies. These are essential for the Service to function and cannot be switched off in our systems. They do things like keep the Service secure, balance traffic across our servers, remember your privacy and cookie choices, and remember basic display settings such as whether you are using light or dark mode. Because they are necessary for the Service to work, we do not need your consent to set them, and blocking them in your browser may stop parts of the Service from working."
        ],
        [
          "Performance and analytics cookies. These help us understand how visitors use the Service, for example which articles are read, how people move through the site, and where errors occur, so that we can measure and improve our content and performance. The information they collect is used in aggregate wherever possible. We set these cookies only where you have given your consent, where consent is required."
        ],
        [
          "Functionality and preferences cookies. These let the Service remember choices you make, such as your preferred settings, so that we can offer you a more personalised experience. We set non-essential functionality cookies only where you have given your consent."
        ],
        [
          "Advertising and targeting cookies. These are set by us and by our advertising partners to deliver and measure advertising, to limit how often you see the same advertisement, and, where you have consented, to show you advertising that is more relevant to you. They may be used to build a profile of your interests. We set these cookies only where you have given your consent, and you can withdraw that consent at any time."
        ],
        [
          "Social media cookies. These may be set when pages include content or features from social media platforms, such as embedded posts or share buttons. They are controlled by the relevant platform and may be used by it to track your activity. We allow these only where you have given your consent."
        ]
      ]
    },
    {
      id: "first-third-party",
      title: "5. First-party and third-party cookies",
      paragraphs: [
        [
          'Some cookies are set by tecMAMBO directly, and these are known as first-party cookies. Others are set by third parties that provide services to us or that deliver content or advertising on the Service, such as analytics providers, advertising partners, and social media platforms, and these are known as third-party cookies. We do not control how third parties use the cookies they set, and we encourage you to review the privacy and cookie policies of those third parties. The "Manage cookie preferences" control lists the third parties currently active on the Service.'
        ]
      ]
    },
    {
      id: "duration",
      title: "6. How long cookies stay on your device",
      paragraphs: [
        [
          'Cookies are either session cookies or persistent cookies. Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device for a set period, or until you delete them, so that the Service can remember you on later visits. The duration of each cookie is shown in the detailed list available through the "Manage cookie preferences" control.'
        ]
      ]
    },
    {
      id: "manage-cookies",
      title: "7. Your choices and how to manage cookies",
      paragraphs: [
        ["You have several ways to control cookies."],
        [
          'Our consent tool. When you first visit tecMAMBO, we ask for your choices about non-essential cookies, and you can accept all, reject all, or set your own preferences. You can change your choices at any time by selecting "Manage cookie preferences" on this page or in our footer.'
        ],
        [
          "Your browser. Most browsers let you view, delete, and block cookies through their settings. The method varies by browser, and the help section of your browser will explain how. Please note that if you block or delete strictly necessary cookies, parts of the Service may not work properly."
        ],
        [
          "Advertising choices. You can often limit interest-based advertising through the settings offered by your device and browser, and through industry opt-out tools provided by advertising organisations."
        ],
        [
          "Browser privacy signals. Where required by applicable law, and where it is technically feasible for us to do so, we aim to honour recognised browser privacy signals, such as Global Privacy Control."
        ]
      ]
    },
    {
      id: "consent-lawful-basis",
      title: "8. Consent and lawful basis",
      paragraphs: [
        [
          "We rely on your consent to set non-essential cookies, including performance, analytics, functionality, advertising, and social media cookies, and you can withdraw that consent at any time. For strictly necessary cookies, we rely on the fact that they are essential to provide the Service you have asked for. Withdrawing consent does not affect the lawfulness of any use of cookies that took place before you withdrew it. We record your consent choices so that we can respect them, and we ask you to confirm your choices again from time to time, or when our cookies change significantly."
        ]
      ]
    },
    {
      id: "changes",
      title: "9. Changes to this policy",
      paragraphs: [
        [
          'We may update this Cookie Policy from time to time, for example when we add or remove cookies, change partners, or to reflect changes in the law. When we do, we will revise the "Last updated" date at the top of this page, and the detailed cookie list available through the "Manage cookie preferences" control will reflect the current position. We encourage you to review this page periodically.'
        ]
      ]
    },
    {
      id: "contact",
      title: "10. More information and how to contact us",
      paragraphs: [
        [
          "For more information about how we handle personal data, please see our ",
          privacyPolicy,
          ", and for the terms that govern your use of the Service, please see our ",
          termsOfUse,
          ". If you have any questions about our use of cookies, you can contact us at [privacy contact email], or by writing to [Legal Entity Name], [registered address]. We are based in Nairobi, Kenya. If you have a concern about how we handle your personal data that we are not able to resolve, you have the right to lodge a complaint with the Office of the Data Protection Commissioner of Kenya, whose current contact details are published on its official website at [verify and insert ODPC website and contact details]."
        ]
      ]
    }
  ]
};

export const editorialStandardsPage: LegalPage = {
  slug: "editorial-standards",
  title: "Editorial standards",
  eyebrow: "Trust",
  lastUpdated: "April 15, 2026",
  summaryLabel: "The short version (a plain summary, not a replacement for the full standards below).",
  summary: [
    "tecMAMBO exists to make technology genuinely understandable, and that promise only works if you can trust us. So here is how we work: our journalism is independent, and no advertiser, sponsor, or affiliate partner gets to decide what we say. We test products ourselves and write honest verdicts. We label anything sponsored, plainly. People, not machines, write and check our work, and we tell you when we use AI tools. When we get something wrong, we fix it openly. The full standards below explain all of this in detail."
  ],
  placeholders: ["[Effective date]", "[editorial contact email]", "[Legal Entity Name]", "[registered address]"],
  placeholderTitle: "Complete before publishing",
  placeholderIntro:
    "This trust document must reflect how tecMAMBO actually works. Complete these CMS fields and review every clause before launch.",
  sections: [
    {
      id: "our-editorial-promise",
      title: "1. Our editorial promise",
      paragraphs: [
        [
          "tecMAMBO is a technology publication built on a single idea: that technology can be made genuinely clear without being dumbed down. We write plain English first, and we keep the deeper technical detail available for those who want it. Everything we publish is meant to help a real person understand or decide something, whether they are buying their first smartphone or following the industry closely. These standards explain the principles and practices behind that promise, and they apply to everyone who writes, edits, tests, or produces content for tecMAMBO."
        ]
      ]
    },
    {
      id: "editorial-independence",
      title: "2. Editorial independence",
      paragraphs: [
        [
          "Our editorial decisions are ours alone. What we cover, how we cover it, and the conclusions we reach are determined by our editorial team in the interest of our readers, and never by advertisers, sponsors, affiliate partners, or any other commercial relationship. Commercial teams and partners do not see, approve, or influence our independent editorial coverage before it is published. If a commercial relationship is ever relevant to a story, we disclose it. Our independence is the most valuable thing we have, and we protect it."
        ]
      ]
    },
    {
      id: "funding-separation",
      title: "3. How we make money, and how we keep it separate from coverage",
      paragraphs: [
        [
          "tecMAMBO is funded by advertising, affiliate links, and clearly labelled sponsored or partner content. We keep a firm line between that funding and our journalism. Three rules hold that line: we label anything sponsored, plainly and visibly; affiliate commissions never change a verdict or a recommendation; and our independent reviews are written before, and independently of, any commercial conversation. If we recommend something, it earned the place on merit. You can read more about our advertising and affiliate terms in our ",
          termsOfUse,
          "."
        ]
      ]
    },
    {
      id: "sponsored-partner-content",
      title: "4. Sponsored and partner content, and labelling",
      paragraphs: [
        [
          'Some content on tecMAMBO is sponsored by, or produced in partnership with, a third party. We treat this differently from our independent journalism, and we label it clearly so you always know what you are reading. Sponsored and partner content is marked with a visible label such as "Partner" or "Sponsored", and any partner involvement is disclosed. Even where a partner funds a piece, we aim to keep it useful and honest, and our editorial team retains the final say on whether it meets our standards at all. We do not disguise advertising as independent editorial.'
        ]
      ]
    },
    {
      id: "affiliate-links",
      title: "5. Affiliate links and recommendations",
      paragraphs: [
        [
          "Some of our articles, especially in Wallet Watch and our buying guides, contain affiliate links. If you click one and make a purchase, we may earn a commission, at no extra cost to you. This never decides which products we recommend or how we rate them. We choose and rank products on the basis of our own research and testing, and we would make the same recommendation whether or not a retailer ran an affiliate programme. Where a piece contains affiliate links, we disclose it."
        ]
      ]
    },
    {
      id: "research-reporting-writing",
      title: "6. How we research, report, and write",
      paragraphs: [
        [
          "We aim to be accurate, clear, and fair. We research before we write, we explain our reasoning, and we write in plain English so that our work is understood by as many readers as possible. Clarity is not the same as oversimplifying: where detail matters, we include it, and we separate the deeper technical material so it is available without getting in the way. We distinguish clearly between news, explanation, review, and opinion, and we label opinion as opinion."
        ]
      ]
    },
    {
      id: "sourcing-attribution-originality",
      title: "7. Sourcing, attribution, and originality",
      paragraphs: [
        [
          "We base our reporting on credible, verifiable sources, and we attribute information to its source so you can judge it for yourself. Where we rely on another publication's reporting, we say so and link to it. We prefer primary sources, such as official announcements, documentation, data, and people with direct knowledge, over second-hand accounts. We use unnamed sources only where there is a clear public-interest reason and the information cannot be obtained on the record, and such use is approved by an editor. We do not plagiarise, and we do not pass off others' work as our own."
        ]
      ]
    },
    {
      id: "testing-reviews",
      title: "8. How we test and review products",
      paragraphs: [
        [
          "Our reviews are based on genuine, hands-on experience with the product, not on press releases or spec sheets alone. We test in real conditions, including the everyday conditions our readers actually use technology in. Our verdicts and any scores reflect the independent judgement of the reviewer and our editorial team. We do not accept payment in exchange for a review or a particular verdict. Where a manufacturer lends us a product to review, it is a loan, we disclose it where relevant, and we are not obliged to review it favourably or at all. We say clearly when a review is based on limited time with a product, on pre-release hardware or software, or on a unit provided by the maker."
        ]
      ]
    },
    {
      id: "deals-pricing-accuracy",
      title: "9. Deals and pricing accuracy",
      paragraphs: [
        [
          "In Wallet Watch and other deal coverage, we work to show accurate prices and offers as at the time of writing. Prices, stock, and discounts change quickly and vary by retailer and region, so we cannot guarantee that any price shown is current when you read it, and we encourage you to confirm details with the retailer before buying. We aim to recommend deals that are genuinely good value, not simply ones that earn us a commission, and we apply the same independence and labelling rules described above."
        ]
      ]
    },
    {
      id: "artificial-intelligence",
      title: "10. How we use artificial intelligence",
      paragraphs: [
        [
          "We are a publication about technology, and we use technology thoughtfully, including artificial intelligence, but always under human control. People research, write, edit, and stand behind our journalism. We may use AI tools to assist with tasks such as research, transcription, summarising our own notes, suggesting headlines, or checking spelling and grammar, but a human is responsible for everything we publish, and our reviews and testing are carried out by people. We do not publish AI-generated articles passed off as human work, and we do not let AI invent facts, sources, or quotes. Where we publish an image that was generated or substantially altered by AI, we label it. We treat AI as a tool that serves our standards, never as a substitute for them."
        ]
      ]
    },
    {
      id: "accuracy-verification-fact-checking",
      title: "11. Accuracy, verification, and fact-checking",
      paragraphs: [
        [
          "We take accuracy seriously. We check facts, figures, names, and claims before publication, and we verify information against reliable sources. Where a claim is significant or contested, we seek to confirm it with more than one source or with a primary source. If we are uncertain about something, we say so rather than state it as settled fact. Despite our care, mistakes can happen, and when they do we deal with them openly, as described next."
        ]
      ]
    },
    {
      id: "corrections-updates",
      title: "12. Corrections and updates",
      paragraphs: [
        [
          "When we get something wrong, we fix it. If you spot an error, please tell us using the ",
          contactPage,
          " below, and we will review it promptly. We correct significant errors transparently rather than quietly, noting that a correction has been made where the change is material. We also update articles over time as technology, prices, and circumstances change, and we indicate when a piece has been updated. Our goal is for the version you read to be as accurate as we can make it, and for our corrections to be honest about what changed."
        ]
      ]
    },
    {
      id: "authors-bylines-expertise",
      title: "13. Authors, bylines, and expertise",
      paragraphs: [
        [
          "Our articles carry the name of the person who wrote them, and our authors have profile pages describing their role and areas of expertise. We believe you have a right to know who is telling you something and why their view is worth your time. Contributions from outside writers are identified as such, and any relevant background or interest is disclosed."
        ]
      ]
    },
    {
      id: "fairness-balance-even-handedness",
      title: "14. Fairness, balance, and even-handedness",
      paragraphs: [
        [
          "We treat the companies, products, and people we write about fairly, whether or not they advertise with us or partner with us. We represent brands even-handedly, we give credit where it is due and criticism where it is warranted, and we do not let commercial relationships soften or sharpen our coverage. Where a story concerns a person or company, and fairness calls for it, we seek their response and give them a reasonable opportunity to reply."
        ]
      ]
    },
    {
      id: "conflicts-gifts",
      title: "15. Conflicts of interest and gifts",
      paragraphs: [
        [
          "We avoid conflicts of interest, and we disclose them where they cannot be avoided. The people who make our editorial decisions do not let personal financial interests, relationships, or gifts influence our coverage. We do not accept payment, gifts, or hospitality in exchange for favourable coverage, and we return or decline anything that could reasonably be seen to compromise our independence, in line with our internal policy."
        ]
      ]
    },
    {
      id: "images-media-visual-integrity",
      title: "16. Images, media, and visual integrity",
      paragraphs: [
        [
          "We use real, properly credited images, and we do not alter photographs in ways that mislead about what they show. Illustrations and diagrams are used to clarify, not to deceive. As noted above, images that are generated or substantially changed by AI are labelled. We respect the intellectual property of photographers and other creators, and we use their work only with permission or where the law allows."
        ]
      ]
    },
    {
      id: "reader-contributions-community",
      title: "17. Reader contributions, comments, and community",
      paragraphs: [
        [
          'We welcome questions, tips, suggestions, and feedback, including through features such as "Ask MAMBO" and suggestions for our Glossary. Contributions and comments are subject to our ',
          termsOfUse,
          ", and we may moderate or remove content that is unlawful, abusive, or otherwise breaches our terms. Views expressed by readers are their own and do not represent tecMAMBO. We value good-faith engagement and aim to treat our readers with the same respect we ask for."
        ]
      ]
    },
    {
      id: "feedback-complaints-right-of-reply",
      title: "18. Feedback, complaints, and right of reply",
      paragraphs: [
        [
          "We want to hear from you, including when you think we have got something wrong. If you have a concern, a correction, a complaint, or a request for a right of reply, please contact us at [editorial contact email]. We will consider it seriously and respond fairly. Where a complaint identifies a genuine error, we will correct it. Where it concerns a matter of judgement, we will explain our reasoning."
        ]
      ]
    },
    {
      id: "changes-to-standards",
      title: "19. Changes to these standards",
      paragraphs: [
        [
          'We may update these standards from time to time as our publication and the wider landscape evolve. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to revisit it, and we welcome suggestions for how we can do better.'
        ]
      ]
    },
    {
      id: "contact-us",
      title: "20. Contact us",
      paragraphs: [
        [
          "You can reach our editorial team at [editorial contact email], or by writing to [Legal Entity Name], [registered address]. We are based in Nairobi, Kenya. To learn more about who we are, please see our ",
          aboutPage,
          "."
        ]
      ]
    }
  ]
};

export const legalPages = [termsPage, privacyPage, cookiePage, editorialStandardsPage];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}

export function segmentText(segment: LegalSegment) {
  return typeof segment === "string" ? segment : segment.text;
}

export function segmentsToText(segments: LegalSegment[]) {
  return segments.map(segmentText).join("");
}

export function legalPageText(page: LegalPage) {
  return [
    page.title,
    page.lastUpdated,
    segmentsToText(page.summary),
    ...page.placeholders,
    ...page.sections.flatMap((section) => [section.title, ...section.paragraphs.map(segmentsToText)])
  ].join("\n");
}
