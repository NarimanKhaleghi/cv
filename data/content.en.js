/* ============================================================
   NK — THE PM · English content (v2 — Journey edition)
   Edit freely — every visible string of the site lives here.
   Persian twin: content.fa.js (keep the same keys/shape).
   ============================================================ */

window.NK_CONTENT = window.NK_CONTENT || {};

window.NK_CONTENT.en = {
  meta: {
    title: "Nariman Khaleghi — The PM · Senior Product Manager, FinTech & Payments",
    description: "Official site of Nariman Khaleghi (The PM): Senior Product Manager in FinTech & Payments. 2M+ user super-app owner, 5 products launched 0→1, AI-native PM. Resume, journey and auto-synced GitHub projects.",
    htmlLang: "en",
    dir: "ltr",
    switchLabel: "فا"
  },

  /* chapter registry — order = the journey (must match main.js) */
  chapters: [
    { id: "cover",   no: "00", label: "Boarding" },
    { id: "about",   no: "01", label: "Who" },
    { id: "numbers", no: "02", label: "Numbers" },
    { id: "journey", no: "03", label: "Stations" },
    { id: "toolbox", no: "04", label: "Toolbox" },
    { id: "lab",     no: "05", label: "Lab" },
    { id: "edu",     no: "06", label: "Foundations" },
    { id: "contact", no: "07", label: "Destination" }
  ],

  ui: {
    menu: "Menu",
    close: "Close",
    themeLabel: "Toggle light / dark",
    resume: "Résumé",
    readMore: "Click to read",
    readLess: "Collapse",
    expandHint: "+",
    backTop: "Back to boarding gate",
    madeWith: "Hand-built with vanilla JS · zero frameworks",
    skip: "Skip intro"
  },

  loader: {
    doc: "BOARDING PASS",
    passTitle: "THE PM AIRLINES",
    from: "TEH",
    fromName: "TEHRAN",
    to: "WLD",
    toName: "THE WORLD",
    flight: "FLIGHT NK-2016",
    gate: "GATE PM·01",
    seat: "SEAT 1A",
    stamp: "BOARDED",
    name: "PASSenger: NARIMAN KHALEGHI"
  },

  cover: {
    kicker: "TEHRAN, IRAN — 35.6892°N, 51.3890°E",
    nameLines: [
      { text: "NARIMAN",  style: "solid" },
      { text: "KHALEGHI", style: "outline" }
    ],
    role: "Senior Product Manager",
    roleSep: "FinTech & Payments",
    pitch: "I take products from messy, regulated problems to measurable business results. Currently owning <b>PutLife</b> — a fintech super-app with <b>2M+ registered users</b>.",
    ctaStart: "Start the journey",
    ctaResume: "Résumé ↗",
    ctaResumeHint: "cv.thepm.ir — opens in a new tab",
    photoAlt: "Black & white portrait of Nariman Khaleghi",
    ring: "THE PM · FINTECH · PAYMENTS · AI-NATIVE · PRODUCT · ",
    stickerA: "2M+ USERS",
    stickerB: "5 PRODUCTS 0→1",
    scroll: "SCROLL",
    ticker: [
      "NOW BOARDING · FLIGHT NK-2026",
      "TEHRAN ⇄ THE WORLD",
      "FINTECH & PAYMENTS",
      "AI-NATIVE PRODUCT",
      "2M+ USERS",
      "5 PRODUCTS 0→1"
    ]
  },

  about: {
    no: "01",
    label: "Who is The PM",
    title: "A hybrid of business, engineering & obsession",
    teaser: "I'm Nariman Khaleghi — a Senior Product Manager with <b>4+ years in product management</b> and <b>8+ years in digital business</b>, currently responsible for <b>PutLife</b>, the fintech super-app of Iran Kish (a Tejarat Bank subsidiary) with <b>2M registered users</b>.",
    moreTitle: "The full story",
    paragraphs: [
      "I've launched <b>five products from scratch</b> and built digital products for <b>startups and national-scale platforms</b> across fintech, tax technology, travel, media and e-commerce — and I was <b>promoted quickly at four companies</b>, because I treat products like living systems: discover, measure, cut, ship, repeat.",
      "My edge is a <b>hybrid business + engineering profile</b>: strategy and marketing on one side, data, coding and solution design on the other. I work hands-on with <b>AI</b> — local LLMs, RAG pipelines, AI agents, n8n automation and vibe-coded MVP prototypes — and I'm comfortable in <b>fast-moving, regulated environments</b>, with fintech and payments as my home turf."
    ],
    factsTitle: "QUICK FACTS",
    facts: [
      { k: "CURRENTLY", v: "Senior PM · PutLife Super-App @ Iran Kish (KICCC)" },
      { k: "BASE",      v: "Tehran, Iran · On-site / Hybrid" },
      { k: "EDUCATION", v: "M.Sc. Industrial Management — Semnan University" },
      { k: "LANGUAGES", v: "Persian (native) · English (professional working)" },
      { k: "FOCUS",     v: "FinTech & Payments · AI-native product work" },
      { k: "OPEN TO",   v: "Any industry that takes product seriously" }
    ],
    quote: "Products don't win because of features. They win because someone obsessed over the user's problem — and measured everything.",
    quoteBy: "— MY PERSONAL RULE #1",
    beyondTitle: "BEYOND THE DESK",
    beyond: ["Photography instructor (45+ students)", "Financial markets trader (6 yrs)", "Motorsport media founder", "AI tinkerer"]
  },

  numbers: {
    no: "02",
    label: "Proof, not promises",
    title: "In numbers",
    items: [
      { value: 2,   suffix: "M+", label: "Registered users on the PutLife super-app" },
      { value: 5,   suffix: "×",  label: "Products launched from scratch to production" },
      { value: 8,   suffix: "+",  label: "Years in digital business & product" },
      { value: 4,   suffix: "×",  label: "Fast-tracked promotions, 4 companies" },
      { value: 81,  suffix: "%",  label: "Invoice volume growth → ~50% national share" },
      { value: 318, suffix: "%",  label: "Organic traffic growth in 4 months (SEO)" }
    ]
  },

  journey: {
    no: "03",
    label: "The journey",
    title: "10 years, 8 stations, one obsession",
    sub: "A live route map. Click any station to open its full story — every stop taught me a different layer of the product craft.",
    expand: "Open station",
    promoBadge: "⇡ PROMOTED",
    sideTripTitle: "SIDE TRIPS",
    alsoNote: "On the record: <b>6 years as a self-employed financial markets trader & analyst</b> (2019–2024) and <b>photography instructor</b> at Saheb Kosar High School (45+ students, 92% end-of-term satisfaction). References available from direct managers at every company.",
    jobs: [
      {
        role: "Senior Product Manager — PutLife Super-App",
        company: "Iran Kish Credit Card Co. (KICCC)",
        companyDesc: "Knowledge-based PSP, subsidiary of Tejarat Bank",
        period: "FEB 2026 → NOW",
        promo: false,
        intro: "Owning PutLife end to end — the company's flagship fintech super-app for payments, credit and value-added services — with <b>2M+ registered users</b> and <b>300K+ active users</b> across Android, iOS and PWA.",
        bullets: [
          "Own product strategy, roadmap and the full product lifecycle with continuous <b>product discovery</b> and <b>data-driven prioritization</b> against quarterly OKRs. Lead <b>Agile/Scrum</b> delivery across Android, iOS and PWA squads — sprint planning, backlog refinement, reviews, retros and release management — and write epics, user stories, acceptance criteria and PRDs in Jira/Confluence with an <b>AI-assisted documentation workflow</b>. Manage a 2-person product cell and help hire for the product team.",
          "Led the <b>Kashef security-compliance</b> program — a Shaparak requirement for renewing card-to-card contracts with partner banks. Worked directly with the banks, prioritized fixes by <b>risk</b> across releases and designed workarounds where structural fixes could have caused churn, protecting retention and keeping bank partnerships on track.",
          "Cut internal <b>payment errors from 24% to 2%</b> through root-cause analysis, bug triage and structured UAT — tracked on <b>Power BI KPI dashboards</b> with cohort, retention and LTV reporting as part of continuous improvement.",
          "Delivered a portfolio of payment and credit products: the <b>TVO Wallet</b> and <b>Maharat Skill Wallet</b> with Iran's Technical & Vocational Organization, a <b>Digital Rial (CBDC) wallet</b>, a <b>multi-budget card</b>, <b>SMART</b> field-support software for POS teams and SMART Banking (a customer–banker platform for Tejarat Bank). Also ran a <b>blockchain asset-tokenization pilot</b> letting tokenized assets serve as loan collateral (with DiaChain & Nozohoor Tejarat), and was trusted with <b>confidential national-scale projects</b> for Tejarat Bank.",
          "Took the <b>Modular POS Repair System</b> — a white-label service-management product for POS hardware — from proposal to a sellable release. Ran requirements discovery, aligned stakeholders, designed the modular architecture and built the CEO-approved business case (<b>1.5-year break-even</b>, <b>~2.8B Tomans projected annual profit</b>) that created a new revenue line.",
          "Kept PutLife fully available during a nationwide banking outage that took the POS infrastructure of <b>four major banks</b> offline — then drove <b>+5% transactions and +10% user growth</b> the next quarter.",
          "Grew <b>+1,000 daily organic users at zero acquisition cost</b> by improving UX and quality (lifting the app's Cafe Bazaar rating), building an SEO-optimized landing page and turning the POS field-support team into a zero-budget merchant referral channel. Launched a merchant services suite (transactions, reporting, repair requests, paper-roll orders) across the POS/IPG ecosystem, deepening B2B engagement."
        ]
      },
      {
        role: "Senior Product Manager",
        company: "Tiss TSP (Dadeh Pardazi Motamed Tiss)",
        companyDesc: "Authorized tax-service provider transmitting e-invoices to Iran's national Moadian platform",
        period: "DEC 2024 → FEB 2026",
        promo: true,
        intro: "Joined as Project Manager and was promoted to Senior Product Manager after four months. Acted as the bridge between the VP office and technical/operations teams — <b>5 direct reports</b>, oversight of <b>22</b> — running product processes in Jira with a growing focus on platform development and market expansion.",
        bullets: [
          "Rebuilt the core e-invoice submission platform while customer growth outpaced capacity: redesigned submission queues, added pre-processing validators and planned server expansion. Invoice volume grew from <b>5.7B to 10.3B (+81%)</b>, reaching <b>~50% market share</b> of all e-invoices submitted to Moadian — the industry's key competitive metric. Kept the service fully stable through the 12-day war and received the <b>“Exemplary Colleague” award</b>.",
          "Shipped the <b>Android tax app</b> for Android POS terminals and phones with a simple, free e-invoicing flow — onboarding thousands of retail B2C merchants (gold & produce trades) through field training and trust-building. Grew users from <b>20K to 43K (+115%)</b>.",
          "Redesigned the end-to-end customer experience: mapped the customer journey, improved acquisition & retention with cohort/LTV tracking, launched self-service flows and <b>n8n ticket automation</b> — including a <b>RAG-based AI tax assistant</b> answering taxpayers' questions. Complaints fell <b>83%</b>, <b>call-response rate hit 99.3%</b>. Also monetized value-added services (API access, premium support) via annual subscriptions and restructured teams as part of change management.",
          "Supervised the full rebuild of the company website with SEO and content-structure work that delivered <b>+318% organic traffic in 4 months</b> (35.8K impressions, 2.7K clicks), measured in GA4/Search Console dashboards built in Looker Studio.",
          "Led <b>process improvement & re-documentation</b> for the VP office based on the APQC standard, modeled in BPMN 2.0 through interviews and aligned with the business — contributing decisively to winning the <b>Iran National Quality Award (2025)</b> as the <b>only authorized tax-service provider ever to receive it</b>."
        ]
      },
      {
        role: "Product Manager",
        company: "Afaq Seir — SafarMall",
        companyDesc: "Travel & tourism company; multi-supplier travel-booking marketplace (PWA)",
        period: "MAY → DEC 2024",
        promo: false,
        intro: "Led SafarMall end to end — from supplier integrations and booking infrastructure to new product lines — managing a 6-person development team.",
        bullets: [
          "Redesigned the booking funnel and user flows (search, filters, payment, wallet) through A/B testing and data analysis: search-to-book conversion up from <b>2.3% to 3.8% (+65%)</b>, payment drop-off cut from <b>32% to 19%</b>, reservation completion up <b>21%</b>.",
          "Led technical & commercial negotiations with 4 major airlines (Mahan, IranAir, Sepehran, Aseman) and integrated their REST APIs — validated via <b>Postman/Swagger</b>. Ticket issuance dropped from <b>5 to 3 minutes</b>; domestic flight coverage reached <b>85%</b>, international <b>40%</b>.",
          "Launched two new revenue streams: smart cross-sell of add-ons (insurance, hotels, transfers) with a <b>+132% attach rate</b>, and a luxury product line built on market-needs assessment, two-tier segmentation and pricing — <b>+35% AOV</b> and <b>+28% repeat purchase rate</b> in 6 months.",
          "Implemented <b>CRM/VOIP</b> and rebuilt the response workflow: response time fell from <b>5 to 2 minutes</b>, lead-to-customer conversion rose <b>22%</b>, missed calls fell <b>21%</b>.",
          "Delivered <b>92% of planned story points</b> per sprint, shipped the MVP on schedule and cut legacy dependencies by <b>20%</b>."
        ]
      },
      {
        role: "Product Marketing Manager",
        company: "Almassazeh Gostar Semnan",
        companyDesc: "Knowledge-based manufacturer of dry-mix building materials (waterproof & fire-resistant gypsum)",
        period: "FEB 2022 → MAY 2024",
        promo: false,
        intro: "Launched the company's first online sales channel from scratch, built the dealership & export networks, defined the <b>go-to-market strategy</b> and managed a 3-person sales + digital-marketing team.",
        bullets: [
          "Built the company's first <b>e-commerce</b> store on <b>WordPress/WooCommerce</b> with zero prior digital sales — scaled from zero to an average of <b>3 tons/day</b> online within <b>10 months</b>.",
          "Expanded <b>B2B</b> sales across channels: onboarded <b>14 new dealerships</b>, activated Torob, Sheypoor and Divar (generating <b>45% of online sales leads</b> and cutting <b>CAC by 28%</b>), and closed the company's first export deals to Iraq, Russia, Afghanistan and Turkey (<b>15% of annual sales volume</b>).",
          "Led <b>CRO and GTM strategy</b>: redesigned landing pages and the purchase funnel, lifting conversion from <b>1.4% to 3.2% (+129%)</b>; defined <b>positioning & value propositions</b> for new lines from competitive research, shortening the sales cycle by <b>30%</b>.",
          "Improved <b>technical SEO & web performance</b>: PageSpeed 68 → <b>100 (desktop)</b> and 54 → <b>98 (mobile)</b>, load time 6.2s → <b>1.9s</b>, bounce rate down <b>45%</b>, organic traffic up <b>120%</b> — with GA4 + <b>Looker Studio</b> dashboards. Earned top Google rankings for <b>5+ strategic keywords</b> and <b>tripled monthly organic impressions</b>."
        ]
      },
      {
        role: "Content Strategist & Audience Development Lead",
        company: "Ring Sport",
        companyDesc: "Iran's specialized automotive tuning & motorsport media",
        period: "FEB 2021 → FEB 2022",
        promo: false,
        intro: "Led content strategy, on-site multimedia production and audience development for Iran's specialized automotive tuning & motorsport publication.",
        bullets: [
          "Launched <b>Ring Sport Magazine</b> from scratch with <b>3 editorial pillars</b> (vehicle reviews, racing coverage, industry analysis) and on-site multimedia production — growing traffic from zero to <b>+500 daily visits</b> with a <b>3+ minute</b> average session.",
          "Earned the trust of <b>SAIPA and Iran Khodro (IKCO)</b> for dedicated reviews of their production vehicles through content quality and media credibility — establishing Ring Sport as one of Iran's leading automotive tuning references."
        ]
      },
      {
        role: "Product Owner",
        company: "Sebyan Company",
        companyDesc: "EdTech company; builder of the “Daneshjouyar” platform",
        period: "MAY 2020 → MAY 2021",
        promo: false,
        intro: "Launched <b>Daneshjouyar</b> from scratch — a single-window PWA for students' non-academic university services, born during COVID-19. Led needs assessment, user research, market & competitor analysis (TAM/SAM/SOM), benchmarking and roadmap definition.",
        bullets: [
          "Applied <b>Design Thinking</b> end to end — from user research to prototyping and usability testing. Benchmarked global products to define the “<b>Single Window for Student Services</b>” vision and an executable roadmap, and launched v1 with <b>14 active student services</b>.",
          "Built step-by-step request-status tracking and direct student-to-provider connection — cutting status-inquiry tickets by <b>60%</b> and acquiring <b>9,000 users from zero in 6 months</b> at a <b>42% active usage rate</b>.",
          "Designed and ran end-to-end user research: <b>120+ surveys</b> and <b>35+ in-depth interviews</b> across <b>12 universities</b>, then prioritized <b>8 core need areas</b> (welfare, nutrition, dormitory, extracurricular) as the MVP backlog.",
          "Designed <b>user flows with fewer than 5 clicks</b> and clickable prototypes (Figma/Adobe XD) replacing in-person visits and physical queues — <b>87% success rate</b> in usability testing — with <b>privacy by design</b> and informed-consent flows."
        ]
      },
      {
        role: "Senior Product Marketing Specialist",
        company: "Avangard Tech",
        companyDesc: "Raymon Amitis holding subsidiary; full-service digital agency & developer of the “Viva Vital” luxury FMCG brand",
        period: "JAN 2018 → DEC 2019",
        promo: true,
        intro: "Led brand building and digital-marketing delivery for the agency and its FMCG client — brand strategy, distribution design and B2B client acquisition.",
        bullets: [
          "Developed the <b>Viva Vital</b> brand during R&D: premium visual identity & positioning, <b>3 SKUs</b> (Classic, Healthy, Sport) with distinct shelf visibility, and a three-phase GTM plan covering premium pricing, messaging and a regional launch calendar.",
          "Managed the agency's digital-marketing unit: acquired <b>18 new B2B clients</b> (<b>+120% client base in 3 months</b>), shipped 7 websites with PageSpeed above 85, and lifted <b>2.3× organic traffic</b> plus <b>180% social engagement</b> for 12 active clients. Standardized the sales cycle, cutting onboarding time by <b>40%</b>.",
          "Researched affluent Tehran consumer behavior, identified <b>four purchase drivers</b> (design, brand story, water quality, social value), shaped a premium B2C distribution model and signed <b>35+ points of sale</b> (luxury supermarkets & sports clubs, Districts 1–3)."
        ]
      },
      {
        role: "Senior Digital Marketing Specialist",
        company: "Bakhtar Flower",
        companyDesc: "Online flower & plant retailer",
        period: "JAN 2016 → JAN 2018",
        promo: true,
        intro: "Led digital strategy end to end — the digital team and the marketing budget — driving online sales and the e-commerce app.",
        bullets: [
          "Grew monthly online revenue from <b>120M to 340M+ Tomans (+180%)</b> in 2 years through cross-sell and seasonal bundles; lifted <b>AOV</b> from <b>560K to 830K Tomans</b>; launched the e-commerce app reaching <b>500+ active installs</b> in 18 months.",
          "Drove <b>+300% organic traffic</b> (8K → <b>32K monthly visits</b>) through SEO with top Google rankings for <b>5+ transactional keywords</b>; ran 12 seasonal campaigns (Valentine's, Mother's Day, Yalda) at <b>4.8× average ROI</b> with a single-day record of <b>2,400+ orders</b>.",
          "Improved <b>CRO & UX</b> by redesigning product pages and checkout — bounce rate down from <b>68% to 41%</b> — and split the Instagram presence into <b>4 specialized pages</b>, growing total followers to <b>125K</b>."
        ]
      }
    ]
  },

  toolbox: {
    no: "04",
    label: "The toolbox",
    title: "What I actually use",
    sub: "Eight drawers. Click a drawer to open it — bold chips are the heavy hitters I reach for every single week.",
    groups: [
      { name: "Product Management", items: [
        { t: "Product Strategy & Vision", key: true }, { t: "Product Discovery", key: true },
        { t: "Roadmap Planning" }, { t: "Prioritization & Delivery", key: true }, { t: "Product Lifecycle" },
        { t: "PRD Writing" }, { t: "Epics · User Stories · AC" }, { t: "Requirements Analysis" },
        { t: "User Research" }, { t: "A/B Testing" }, { t: "CRO", key: true }, { t: "Metrics & KPIs" },
        { t: "OKRs", key: true }, { t: "Business Case" }, { t: "Business Analysis" },
        { t: "TAM/SAM/SOM" }, { t: "Cohort & LTV" }
      ]},
      { name: "Agile & Delivery", items: [
        { t: "Agile / Scrum", key: true }, { t: "Sprint Planning" }, { t: "Release Management", key: true },
        { t: "Backlog Refinement" }, { t: "Sprint Reviews & Demos" }, { t: "Retrospectives" },
        { t: "Kanban" }, { t: "Hybrid / Waterfall" }, { t: "SDLC" }, { t: "UAT & QA Collaboration" },
        { t: "Change Management" }, { t: "Cross-Functional Leadership" }
      ]},
      { name: "Project Mgmt & BA", items: [
        { t: "PMBOK 7/8", key: true }, { t: "BABOK", key: true }, { t: "BPMN 2.0", key: true },
        { t: "Business Model Canvas" }, { t: "Value Proposition Design" }, { t: "Feasibility Studies", key: true },
        { t: "Financial Modeling" }, { t: "Stakeholder Analysis" }
      ]},
      { name: "Data & AI", items: [
        { t: "Power BI", key: true }, { t: "GA4 + Looker Studio" }, { t: "Statistics" }, { t: "SQL (basic)" },
        { t: "Vector Databases" }, { t: "Python", key: true }, { t: "Web Scraping" },
        { t: "LLMs (local + cloud)", key: true }, { t: "RAG Pipelines", key: true }, { t: "AI Agents", key: true },
        { t: "n8n Automation", key: true }, { t: "Vibe-Coded MVPs", key: true }, { t: "Cohort / Retention / LTV" }
      ]},
      { name: "Business & Growth", items: [
        { t: "Go-to-Market", key: true }, { t: "Positioning" }, { t: "Funnel & Conversion", key: true },
        { t: "Retention & Churn", key: true }, { t: "Product Marketing" }, { t: "Pricing" },
        { t: "Monetization" }, { t: "CRM" }, { t: "SEO & ASO" }, { t: "Customer Journey" }, { t: "Budget Ownership" }
      ]},
      { name: "Design & Technical", items: [
        { t: "UX/UI (Figma)", key: true }, { t: "HTML/CSS/JS" }, { t: "WordPress / WooCommerce" },
        { t: "Linux & Windows Server" }, { t: "Cloud Deployment" }, { t: "Postman / Swagger" },
        { t: "POS/IPG & Payment Gateways", key: true }, { t: "Banking Domain" }
      ]},
      { name: "Tools", items: [
        { t: "Jira" }, { t: "Confluence" }, { t: "Notion" }, { t: "Trello" }, { t: "Git / GitHub" },
        { t: "MS Office" }, { t: "Google Sheets" }
      ]},
      { name: "Soft Skills", items: [
        { t: "Stakeholder Management", key: true }, { t: "Analytical Thinking", key: true },
        { t: "Customer-Centric Mindset", key: true }, { t: "Negotiation" }, { t: "Facilitation" },
        { t: "Training" }, { t: "Communication" }, { t: "Leadership" }, { t: "Decision-Making" },
        { t: "Problem-Solving" }, { t: "Accountability" }, { t: "Adaptability" }
      ]}
    ]
  },

  lab: {
    no: "05",
    label: "Shipped & building",
    title: "The Lab — live from GitHub",
    sub: "Public repositories, auto-synced weekly from <a href=\"https://github.com/NarimanKhaleghi\" target=\"_blank\" rel=\"noopener\">github.com/NarimanKhaleghi</a> — click a card to read its README.",
    syncOn: "AUTO-SYNCED",
    syncAt: "LAST SYNC",
    loading: "Fetching repositories…",
    empty: "No repositories matched this filter.",
    error: "Couldn't load the project list. Check out my GitHub directly instead:",
    featured: "Featured",
    stars: "stars",
    updated: "Updated",
    open: "Read docs",
    github: "Open on GitHub",
    noReadme: "This repository has no README yet.",
    readmeTitle: "README",
    close: "Close",
    filterAll: "All",
    visit: "Live",
    repo: "Repository"
  },

  edu: {
    no: "06",
    label: "Foundations",
    title: "Education & side quests",
    items: [
      { degree: "M.Sc. — Industrial Management (Production & Operations)", school: "Semnan University, Faculty of Management", years: "2023 → 2026" },
      { degree: "B.Sc. — Industrial Management", school: "Semnan University, Faculty of Management", years: "2019 → 2023" }
    ],
    sideTitle: "SIDE QUESTS",
    side: [
      { k: "Trader & Market Analyst", v: "Self-employed · 6 years (2019–2024)" },
      { k: "Photography Instructor",  v: "Saheb Kosar High School · 45+ students · 92% satisfaction" }
    ],
    note: "References available from former direct managers at every company upon request."
  },

  contact: {
    no: "07",
    label: "Destination",
    title: "The journey continues.",
    sub: "Hiring, consulting, or just good product talk — my inbox is open. I reply fast.",
    channelsTitle: "CHANNELS",
    resumeTitle: "Need the paper trail?",
    resumeSub: "The full, printable résumé lives on its own page — open it in a new tab, read it, and export it as PDF straight from the browser.",
    resumeBtn: "Open résumé ↗",
    resumeHint: "cv.thepm.ir · opens in a new tab",
    note: "Based in Tehran · Working with teams worldwide",
    toast: "Nice — you found the badge. Stay curious ✦"
  },

  footer: {
    brand: "NARIMAN KHALEGHI — THE PM",
    rights: "© 2026 · Built by hand",
    sync: "DATA SYNC"
  }
};
