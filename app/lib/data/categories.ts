export type CategoryFeed = {
  name: string;
  url: string;
  cadence: string;
  blurb: string;
};

export type CategoryHub = {
  slug: string;
  title: string;
  name: string;
  description: string;
  keywords: string[];
  intro: string;
  feeds: CategoryFeed[];
  faqs: { q: string; a: string }[];
};

export const CATEGORIES: CategoryHub[] = [
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    title: 'Best Cybersecurity & InfoSec RSS Feeds for 2027',
    description: 'Track zero-day vulnerabilities, malware analyses, and threat intelligence in 2027 with verified cybersecurity RSS feeds.',
    keywords: ['cybersecurity rss feeds 2027', 'infosec rss feeds', 'krebsonsecurity rss', 'vulnerability rss feed', 'threat intelligence rss', 'hacker news security'],
    intro: 'Stay ahead of zero-days and infrastructure exploits. These verified security feeds provide direct threat intelligence from leading researchers.',
    feeds: [
      { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/', cadence: 'Weekly', blurb: 'Brian Krebs delivers breaking investigative reporting on cybercrime syndicates and enterprise breaches.' },
      { name: 'Schneier on Security', url: 'https://www.schneier.com/feed/atom/', cadence: 'Daily', blurb: 'Bruce Schneier on security philosophy, cryptography developments, and surveillance policy.' },
      { name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews', cadence: 'Daily', blurb: 'Breaking vulnerability advisories, zero-day alerts, and cyber attack coverage.' },
      { name: 'BleepingComputer', url: 'https://www.bleepingcomputer.com/feed/', cadence: 'Daily', blurb: 'Ransomware updates, patch Tuesday analyses, and technical guides.' },
      { name: 'Dark Reading', url: 'https://www.darkreading.com/rss.xml', cadence: 'Daily', blurb: 'Enterprise security strategy, cloud defense architectures, and vulnerability management.' },
      { name: 'Troy Hunt (Have I Been Pwned)', url: 'https://www.troyhunt.com/rss/', cadence: 'Weekly', blurb: 'Data breach analyses and security hygiene from the creator of HIBP.' }
    ],
    faqs: [
      { q: 'Why track cybersecurity through RSS?', a: 'Speed and signal. When a zero-day exploit drops, reading primary vulnerability feeds without social algorithm delays allows security teams to patch immediately.' },
      { q: 'Can I read security advisories offline?', a: 'Yes. Curated Feeds caches full vulnerability descriptions and patch notes locally on your Android device.' }
    ]
  },
  {
    slug: 'crypto',
    name: 'Crypto & Web3',
    title: 'Best Crypto, Bitcoin & Web3 RSS Feeds for 2027',
    description: 'Real-time cryptocurrency market analysis, blockchain protocol updates, and DeFi research feeds for 2027.',
    keywords: ['crypto rss feeds 2027', 'bitcoin rss feed', 'ethereum research rss', 'web3 news rss', 'blockchain development feeds'],
    intro: 'Cut through token shilling and speculative noise. These high-signal crypto feeds focus on protocol architecture, cryptography, and macro trends.',
    feeds: [
      { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', cadence: 'Realtime', blurb: 'Global regulatory coverage, institutional market dynamics, and blockchain developments.' },
      { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss', cadence: 'Realtime', blurb: 'Cryptocurrency market news, policy reports, and technology deep-dives.' },
      { name: 'Vitalik Buterin’s Website', url: 'https://vitalik.eth.limo/feed.xml', cadence: 'Monthly', blurb: 'Foundational essays on Ethereum roadmap, cryptoeconomics, and decentralized governance.' },
      { name: 'Bitcoin Magazine', url: 'https://bitcoinmagazine.com/.rss/full/', cadence: 'Daily', blurb: 'Deep technical and economic analysis of Bitcoin core development and Layer 2 adoption.' },
      { name: 'Bankless', url: 'https://www.bankless.com/rss/feed', cadence: 'Daily', blurb: 'DeFi protocols, on-chain metrics, and crypto wealth management.' }
    ],
    faqs: [
      { q: 'How do I avoid crypto spam in RSS?', a: 'Only subscribe to established editorial publications and core developer blogs rather than automated token scraper feeds.' }
    ]
  },
  {
    slug: 'startups',
    name: 'Startups & VC',
    title: 'Best Startup & Venture Capital RSS Feeds for 2027',
    description: 'Follow startup funding rounds, founder playbooks, and venture capital strategy with curated RSS feeds for 2027.',
    keywords: ['startup rss feeds 2027', 'venture capital rss', 'y combinator blog rss', 'saas founder feeds', 'techcrunch startup rss'],
    intro: 'Insights on product-market fit, fundraising rounds, and startup execution directly from operators and venture partners.',
    feeds: [
      { name: 'TechCrunch Startups', url: 'https://techcrunch.com/category/startups/feed/', cadence: 'Daily', blurb: 'Early-stage seed and Series A funding announcements and accelerator demo days.' },
      { name: 'Y Combinator Blog', url: 'https://www.ycombinator.com/blog/feed', cadence: 'Weekly', blurb: 'Advice on founder equity, customer development, and building high-growth tech companies.' },
      { name: 'SaaStr', url: 'https://www.saastr.com/feed/', cadence: 'Daily', blurb: 'Jason Lemkin and top SaaS leaders on scaling ARR, churn prevention, and sales leadership.' },
      { name: 'Both Sides of the Table (Mark Suster)', url: 'https://bothsidesofthetable.com/feed', cadence: 'Monthly', blurb: 'Practical venture capital negotiations, governance, and early-stage scaling lessons.' },
      { name: 'Andrew Chen', url: 'https://andrewchen.com/feed/', cadence: 'Bi-weekly', blurb: 'Marketplaces, viral loops, network effects, and metrics-driven growth strategy.' }
    ],
    faqs: [
      { q: 'Can Curated Feeds help founder productivity?', a: 'Yes. With card swipe triage, founders can clear 50+ startup announcements in under 10 minutes without falling into social media doomscrolling.' }
    ]
  },
  {
    slug: 'indie-hackers',
    name: 'Indie Hackers',
    title: 'Best Indie Hacker & Bootstrapping RSS Feeds for 2027',
    description: 'Learn from profitable solo founders, micro-SaaS builders, and bootstrappers with verified RSS feeds for 2027.',
    keywords: ['indie hacker rss feeds 2027', 'bootstrapped saas rss', 'micro saas blog rss', 'solopreneur reading feeds', 'indie founder blogs'],
    intro: 'Real revenue numbers, lean marketing experiments, and solo founder journeys from builders who run profitable software businesses.',
    feeds: [
      { name: 'Indie Hackers Articles', url: 'https://www.indiehackers.com/feed', cadence: 'Daily', blurb: 'Interviews with bootstrapped founders detailing transparent MRR milestones and marketing wins.' },
      { name: 'Pieter Levels (levels.io)', url: 'https://levels.io/rss/', cadence: 'Monthly', blurb: 'Unfiltered building in public, nomadic entrepreneurship, and launching AI products.' },
      { name: 'Rob Walling (Startups For the Rest of Us)', url: 'https://robwalling.com/feed/', cadence: 'Bi-weekly', blurb: 'Pragmatic bootstrapping advice, SaaS pricing models, and TinySeed insights.' },
      { name: 'Balsamiq - Life of a Software Company', url: 'https://balsamiq.com/company/feed/', cadence: 'Monthly', blurb: 'Peldi on running a calm, profitable, multi-million dollar software company with no VC.' }
    ],
    faqs: [
      { q: 'How does RSS benefit solopreneurs?', a: 'It shields your attention. You absorb actionable marketing and tech lessons on your own schedule instead of being distracted by algorithmic timelines.' }
    ]
  },
  {
    slug: 'design',
    name: 'UX & Product Design',
    title: 'Best UI, UX & Product Design RSS Feeds for 2027',
    description: 'Inspiration, design systems, design tokens, and user research feeds for designers and creative directors in 2027.',
    keywords: ['design rss feeds 2027', 'ui ux design rss', 'smashing magazine rss', 'design systems blog', 'product design feeds'],
    intro: 'Stay sharp on modern typography, design system architecture, accessibility guidelines, and interaction design.',
    feeds: [
      { name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/', cadence: 'Daily', blurb: 'Web design, CSS architecture, accessibility compliance, and user testing.' },
      { name: 'Nielsen Norman Group', url: 'https://www.nngroup.com/feed/rss/', cadence: 'Weekly', blurb: 'Rigorous empirical usability benchmarks and UX research findings.' },
      { name: 'Sidebar.io', url: 'https://sidebar.io/feed.xml', cadence: 'Daily', blurb: 'Curated collection of the top 5 design links every single day.' },
      { name: 'A List Apart', url: 'https://alistapart.com/feed/', cadence: 'Monthly', blurb: 'Thoughtful essays exploring the craft, meaning, and future of web design.' },
      { name: 'UX Collective', url: 'https://uxdesign.cc/feed', cadence: 'Daily', blurb: 'Practical case studies, design system tokens, and critique from practicing designers.' }
    ],
    faqs: [
      { q: 'Does Curated Feeds render design imagery well?', a: 'Yes. Articles in Curated Feeds display crisp embedded UI mockups, screenshots, and typography cleanly formatted.' }
    ]
  },
  {
    slug: 'linux',
    name: 'Linux & Open Source',
    title: 'Best Linux, SysAdmin & Open Source RSS Feeds for 2027',
    description: 'Kernel updates, Linux distribution releases, DevOps workflows, and FOSS news via verified RSS feeds in 2027.',
    keywords: ['linux rss feeds 2027', 'open source rss', 'phoronix rss feed', 'kernel updates rss', 'sysadmin rss feeds'],
    intro: 'Everything open source: Linux kernel merges, hardware benchmarks, server administration, and desktop environments.',
    feeds: [
      { name: 'Phoronix', url: 'https://www.phoronix.com/phoronix-rss.php', cadence: 'Daily', blurb: 'Authoritative hardware benchmarks, graphics drivers, and Linux kernel release notes.' },
      { name: 'LWN.net', url: 'https://lwn.net/headlines/rss', cadence: 'Weekly', blurb: 'The premier technical journal covering the Linux kernel and developer community.' },
      { name: 'OMG! Ubuntu!', url: 'https://www.omgubuntu.co.uk/feed', cadence: 'Daily', blurb: 'Ubuntu distribution releases, GNOME desktop improvements, and Linux app reviews.' },
      { name: 'Ars Technica Open Source', url: 'https://feeds.arstechnica.com/arstechnica/open-source', cadence: 'Weekly', blurb: 'Open-source licensing controversies, foundation governance, and system software.' }
    ],
    faqs: [
      { q: 'Can I track distribution releases in Curated Feeds?', a: 'Yes! Curated Feeds parses changelog and announcement feeds directly with zero telemetry.' }
    ]
  },
  {
    slug: 'apple',
    name: 'Apple & iOS',
    title: 'Best Apple, Mac & iOS Ecosystem RSS Feeds for 2027',
    description: 'Hardware leaks, macOS software reviews, Swift programming, and Apple commentary with top RSS feeds for 2027.',
    keywords: ['apple rss feeds 2027', 'daring fireball rss', 'macrumors rss feed', '9to5mac rss', 'swift development rss'],
    intro: 'The definitive Apple ecosystem feeds: hardware reviews, WWDC architectural changes, and thoughtful cultural commentary.',
    feeds: [
      { name: 'Daring Fireball by John Gruber', url: 'https://daringfireball.net/feeds/main', cadence: 'Daily', blurb: 'The gold standard of Apple commentary, hardware nuance, and web culture.' },
      { name: 'MacRumors', url: 'https://www.macrumors.com/macrumors.xml', cadence: 'Daily', blurb: 'Breaking rumors, supply chain tracking, and iOS beta release tracking.' },
      { name: '9to5Mac', url: 'https://9to5mac.com/feed/', cadence: 'Daily', blurb: 'In-depth coverage of iPhone, iPad, Apple Silicon Macs, and visionOS.' },
      { name: 'Six Colors by Jason Snell', url: 'https://sixcolors.com/feed/', cadence: 'Daily', blurb: 'Insightful editorial analysis of Apple business, podcasting tech, and Mac workflows.' },
      { name: 'Swift.org Blog', url: 'https://www.swift.org/atom.xml', cadence: 'Monthly', blurb: 'Official updates from the Swift language core team on language evolution.' }
    ],
    faqs: [
      { q: 'Can I read Apple blogs on my Android device?', a: 'Curated Feeds lets you follow Apple news on Android with zero tracking and full offline article caching.' }
    ]
  },
  {
    slug: 'gaming',
    name: 'Gaming & Game Dev',
    title: 'Best Video Game News & Game Dev RSS Feeds for 2027',
    description: 'Game engine advancements, industry reporting, independent game critiques, and studio post-mortems for 2027.',
    keywords: ['gaming rss feeds 2027', 'game dev rss feeds', 'polygon rss feed', 'ign rss', 'kotaku rss feed', 'gamedev blogs'],
    intro: 'Comprehensive video game coverage without sponsored clickbait: independent reviews, game engine technical breakdowns, and studio news.',
    feeds: [
      { name: 'Polygon', url: 'https://www.polygon.com/rss/index.xml', cadence: 'Daily', blurb: 'Video game reviews, entertainment features, and narrative game design analysis.' },
      { name: 'Kotaku', url: 'https://kotaku.com/rss', cadence: 'Daily', blurb: 'Gaming news, culture, and investigative reporting on studio conditions.' },
      { name: 'Rock Paper Shotgun', url: 'https://www.rockpapershotgun.com/feed', cadence: 'Daily', blurb: 'The premier destination for PC gaming, indie gems, and simulator games.' },
      { name: 'Game Developer (Gamasutra)', url: 'https://www.gamedeveloper.com/rss.xml', cadence: 'Daily', blurb: 'Technical post-mortems, game design theory, and engine programming insights.' }
    ],
    faqs: [
      { q: 'Why follow gaming via RSS?', a: 'Video game sites are notoriously overloaded with auto-playing video ads and popups. RSS extracts just the text and screenshots cleanly.' }
    ]
  },
  {
    slug: 'science',
    name: 'Science & Space',
    title: 'Best Science, Space & Astronomy RSS Feeds for 2027',
    description: 'Peer-reviewed research breakthroughs, space exploration launches, and astrophysics discoveries for 2027.',
    keywords: ['science rss feeds 2027', 'space exploration rss', 'nasa rss feed', 'nature journal rss', 'astronomy rss feeds'],
    intro: 'Explore astrophysics, quantum computing, biotechnology, and planetary exploration directly from primary scientific sources.',
    feeds: [
      { name: 'Nature News', url: 'https://www.nature.com/nature.rss', cadence: 'Daily', blurb: 'Global scientific breakthroughs and research papers across physics, biology, and chemistry.' },
      { name: 'NASA Breaking News', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', cadence: 'Daily', blurb: 'Artemis missions, James Webb telescope findings, and Mars rover discoveries.' },
      { name: 'New Scientist', url: 'https://www.newscientist.com/feed/home/', cadence: 'Daily', blurb: 'Accessible science journalism explaining how discoveries impact humanity.' },
      { name: 'ScienceDaily', url: 'https://www.sciencedaily.com/rss/top/science.xml', cadence: 'Daily', blurb: 'Curated university research releases across medicine, environment, and technology.' }
    ],
    faqs: [
      { q: 'Are research papers readable in Curated Feeds?', a: 'Yes. Curated Feeds formats abstracts, author lists, and diagrams cleanly for comfortable offline reading.' }
    ]
  },
  {
    slug: 'climate',
    name: 'Climate & Cleantech',
    title: 'Best Climate, Energy & Cleantech RSS Feeds for 2027',
    description: 'Solar energy, EV battery breakthroughs, grid infrastructure, and climate policy coverage via RSS in 2027.',
    keywords: ['climate change rss feeds 2027', 'cleantech rss', 'clean energy news rss', 'electrek rss feed', 'renewable energy feeds'],
    intro: 'Track the clean energy transition: utility-scale battery storage, electric mobility, heat pumps, and global energy economics.',
    feeds: [
      { name: 'Canary Media', url: 'https://www.canarymedia.com/rss', cadence: 'Daily', blurb: 'Clean energy transition news covering grid decarbonization, solar, and climate policy.' },
      { name: 'Electrek', url: 'https://electrek.co/feed/', cadence: 'Daily', blurb: 'Electric vehicles, renewable energy infrastructure, and battery manufacturing news.' },
      { name: 'CleanTechnica', url: 'https://cleantechnica.com/feed/', cadence: 'Daily', blurb: 'Solar energy developments, EV adoption metrics, and clean technology analysis.' },
      { name: 'Carbon Brief', url: 'https://www.carbonbrief.org/feed/', cadence: 'Weekly', blurb: 'Clear, data-driven analysis of climate science and international emissions policy.' }
    ],
    faqs: [
      { q: 'How often are climate feeds updated?', a: 'Most industry publications post 3-5 stories daily. Curated Feeds aggregates them into a unified, swipeable deck.' }
    ]
  },
  {
    slug: 'finance',
    name: 'Finance & Markets',
    title: 'Best Financial News & Investing RSS Feeds for 2027',
    description: 'Macro economics, central bank decisions, market commentary, and value investing insights via RSS in 2027.',
    keywords: ['finance rss feeds 2027', 'investing rss feeds', 'macro economics rss', 'stock market rss feed', 'financial news feeds'],
    intro: 'Make informed investment decisions without emotional trading frenzy. Deep macro analysis and market fundamentals.',
    feeds: [
      { name: 'Calculated Risk', url: 'https://calculatedrisk.substack.com/feed', cadence: 'Daily', blurb: 'Bill McBride delivers the best empirical housing and macro economic data in the world.' },
      { name: 'A Wealth of Common Sense', url: 'https://awealthofcommonsense.com/feed/', cadence: 'Weekly', blurb: 'Ben Carlson explains market cycles, asset allocation, and behavioral finance.' },
      { name: 'The Big Picture by Barry Ritholtz', url: 'https://ritholtz.com/feed/', cadence: 'Daily', blurb: 'Behavioral economics, quantitative markets, and macro commentary.' },
      { name: 'Morningstar Insights', url: 'https://www.morningstar.com/rss', cadence: 'Daily', blurb: 'Independent fund ratings, equity valuations, and retirement planning strategies.' }
    ],
    faqs: [
      { q: 'Can I track financial RSS feeds on mobile without paywalls?', a: 'Curated Feeds lets you read open market analysis and RSS commentary with zero ads and complete privacy.' }
    ]
  },
  {
    slug: 'productivity',
    name: 'Productivity & PKM',
    title: 'Best Productivity, Focus & PKM RSS Feeds for 2027',
    description: 'Personal knowledge management, digital minimalism, deep work routines, and PKM tools (Obsidian/Notion) in 2027.',
    keywords: ['productivity rss feeds 2027', 'pkm rss feeds', 'digital minimalism blog', 'deep work rss', 'obsidian pkm feeds'],
    intro: 'Reclaim your focus. Practical systems for intentional knowledge management, habit architecture, and distraction-free work.',
    feeds: [
      { name: 'Cal Newport’s Study Hacks Blog', url: 'https://calnewport.com/feed/', cadence: 'Weekly', blurb: 'Deep work philosophy, digital minimalism, and engineering a distraction-free professional life.' },
      { name: 'Farnam Street (Shane Parrish)', url: 'https://fs.blog/feed/', cadence: 'Weekly', blurb: 'Mental models, decision making under uncertainty, and lifelong learning.' },
      { name: 'Zen Habits by Leo Babauta', url: 'https://zenhabits.net/feed/', cadence: 'Weekly', blurb: 'Simplicity, mindfulness, letting go of clutter, and building sustainable daily routines.' },
      { name: 'Asian Efficiency', url: 'https://www.asianefficiency.com/feed/', cadence: 'Weekly', blurb: 'Time management tactics, calendar blocking, and personal productivity workflows.' }
    ],
    faqs: [
      { q: 'How does an RSS reader support digital minimalism?', a: 'Unlike infinite-scroll algorithms, RSS is finite: once your unread stack is cleared, the app is done. Curated Feeds gives you that peaceful completion every morning.' }
    ]
  }
];

export const getCategory = (slug: string): CategoryHub | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
