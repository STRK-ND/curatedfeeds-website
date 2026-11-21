export type Publication = {
  slug: string;
  name: string;
  domain: string;
  category: string;
  feedUrl: string;
  sectionFeeds?: { name: string; url: string }[];
  description: string;
  summary: string;
  faqs: { q: string; a: string }[];
};

export const PUBLICATIONS: Publication[] = [
  {
    slug: 'the-verge',
    name: 'The Verge',
    domain: 'theverge.com',
    category: 'Technology',
    feedUrl: 'https://www.theverge.com/rss/index.xml',
    sectionFeeds: [
      { name: 'Tech', url: 'https://www.theverge.com/rss/tech/index.xml' },
      { name: 'Reviews', url: 'https://www.theverge.com/rss/reviews/index.xml' }
    ],
    description: 'Find The Verge RSS feed URL for 2027. Follow breaking gadget releases, tech policy, and reviews distraction-free in Curated Feeds.',
    summary: 'The Verge covers consumer technology, science, art, and culture. The official RSS feed delivers all headlines and feature stories without auto-playing video ads.',
    faqs: [{ q: 'Is The Verge RSS feed free to read?', a: 'Yes. The Verge provides public RSS feeds without paywalls. Curated Feeds caches full stories locally on Android.' }]
  },
  {
    slug: 'techcrunch',
    name: 'TechCrunch',
    domain: 'techcrunch.com',
    category: 'Startups & Tech',
    feedUrl: 'https://techcrunch.com/feed/',
    sectionFeeds: [
      { name: 'Startups', url: 'https://techcrunch.com/category/startups/feed/' },
      { name: 'Venture Capital', url: 'https://techcrunch.com/category/venture/feed/' }
    ],
    description: 'TechCrunch RSS feed URLs for 2027: startup funding rounds, venture capital, and tech product launches.',
    summary: 'TechCrunch is the premier tech startup intelligence outlet. Follow every Series A announcement and founder move directly in your local feed reader.',
    faqs: [{ q: 'Does TechCrunch update its RSS feed in real-time?', a: 'Yes. Articles appear in the feed minutes after publication.' }]
  },
  {
    slug: 'wired',
    name: 'Wired',
    domain: 'wired.com',
    category: 'Technology & Culture',
    feedUrl: 'https://www.wired.com/feed/rss',
    sectionFeeds: [
      { name: 'Business', url: 'https://www.wired.com/feed/category/business/latest/rss' },
      { name: 'Science', url: 'https://www.wired.com/feed/category/science/latest/rss' }
    ],
    description: 'Wired RSS feed URL in 2027: long-form journalism, cybersecurity investigations, and emerging technology essays.',
    summary: 'Wired chronicles how technology alters culture, politics, and the global economy. Subscribe cleanly to avoid intrusive subscription paywall modals.',
    faqs: [{ q: 'Can I read Wired in Curated Feeds?', a: 'Yes. Add the feed URL into Curated Feeds to receive every article notification.' }]
  },
  {
    slug: 'ars-technica',
    name: 'Ars Technica',
    domain: 'arstechnica.com',
    category: 'Technology',
    feedUrl: 'https://feeds.arstechnica.com/arstechnica/index',
    sectionFeeds: [
      { name: 'Information Technology', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
      { name: 'Science', url: 'https://feeds.arstechnica.com/arstechnica/science' }
    ],
    description: 'Official Ars Technica RSS feed URL for 2027. Deep technical analysis on hardware, semiconductors, and software.',
    summary: 'Ars Technica provides the rigorous technical depth that mainstream tech journalism skips. The feed delivers complete summaries and article links.',
    faqs: [{ q: 'Does Ars Technica support full-text RSS?', a: 'Standard public feeds include detailed excerpts. Curated Feeds optimizes them for reading on mobile.' }]
  },
  {
    slug: 'engadget',
    name: 'Engadget',
    domain: 'engadget.com',
    category: 'Technology',
    feedUrl: 'https://www.engadget.com/rss.xml',
    description: 'Engadget RSS feed URL for 2027: consumer gadgets, smartphone reviews, and personal computing.',
    summary: 'Engadget covers mobile hardware, audio equipment, home entertainment, and gaming tech.',
    faqs: [{ q: 'How often does Engadget post?', a: 'Engadget publishes 15-25 gadget news items daily.' }]
  },
  {
    slug: 'hacker-news',
    name: 'Hacker News',
    domain: 'news.ycombinator.com',
    category: 'Developer',
    feedUrl: 'https://news.ycombinator.com/rss',
    description: 'Official Y Combinator Hacker News RSS feed for 2027. Top tech links, programming news, and engineering projects.',
    summary: 'Hacker News surfaces high-signal links curated by global software practitioners and founders.',
    faqs: [{ q: 'How is the Hacker News RSS feed ranked?', a: 'The main feed streams top community upvoted submissions in real-time.' }]
  },
  {
    slug: 'bbc-news',
    name: 'BBC News',
    domain: 'bbc.com',
    category: 'World News',
    feedUrl: 'https://feeds.bbci.co.uk/news/rss.xml',
    sectionFeeds: [
      { name: 'World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
      { name: 'Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml' }
    ],
    description: 'BBC News RSS feed URLs in 2027: breaking world news, business updates, and global reporting.',
    summary: 'BBC News delivers impartial international news reporting without advertising bias or sensationalism.',
    faqs: [{ q: 'Are BBC section feeds available?', a: 'Yes. BBC offers dedicated feeds for World, Business, Technology, Science, and Entertainment.' }]
  },
  {
    slug: 'reuters',
    name: 'Reuters',
    domain: 'reuters.com',
    category: 'World & Markets',
    feedUrl: 'https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best',
    description: 'Reuters RSS feed URLs for 2027: objective financial markets data, geopolitical dispatches, and breaking wire news.',
    summary: 'Reuters is the trusted backbone of global financial journalism and factual wire news.',
    faqs: [{ q: 'Why read Reuters on RSS?', a: 'Wire feeds deliver raw facts minutes before mainstream publications editorialize them.' }]
  },
  {
    slug: 'associated-press',
    name: 'Associated Press',
    domain: 'apnews.com',
    category: 'World News',
    feedUrl: 'https://apnews.com/feed',
    description: 'AP News RSS feed for 2027: fast, non-partisan breaking news from investigative reporters worldwide.',
    summary: 'The Associated Press produces essential investigative wire news used by thousands of global publications.',
    faqs: [{ q: 'Is AP News free on RSS?', a: 'Yes. The AP maintains syndication feeds for world, national, and political news.' }]
  },
  {
    slug: 'the-guardian',
    name: 'The Guardian',
    domain: 'theguardian.com',
    category: 'World & Opinion',
    feedUrl: 'https://www.theguardian.com/world/rss',
    sectionFeeds: [
      { name: 'Technology', url: 'https://www.theguardian.com/technology/rss' },
      { name: 'Environment', url: 'https://www.theguardian.com/environment/rss' }
    ],
    description: 'The Guardian RSS feed URLs for 2027: independent investigative journalism, global environment coverage, and culture.',
    summary: 'The Guardian provides open, reader-funded journalism with extensive international and climate coverage.',
    faqs: [{ q: 'Does The Guardian require a subscription for RSS?', a: 'No. The Guardian RSS feeds are completely open.' }]
  },
  {
    slug: 'new-york-times',
    name: 'The New York Times',
    domain: 'nytimes.com',
    category: 'News & Culture',
    feedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    sectionFeeds: [
      { name: 'World', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml' },
      { name: 'Technology', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml' },
      { name: 'Business', url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml' }
    ],
    description: 'New York Times RSS feed directory for 2027: homepage, world, business, and technology XML feeds.',
    summary: 'The New York Times offers comprehensive XML feeds across dozens of editorial sections.',
    faqs: [{ q: 'How many RSS feeds does the NYT have?', a: 'Over 50 dedicated section feeds are maintained on rss.nytimes.com.' }]
  },
  {
    slug: 'wall-street-journal',
    name: 'The Wall Street Journal',
    domain: 'wsj.com',
    category: 'Business & Finance',
    feedUrl: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    sectionFeeds: [
      { name: 'Markets', url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml' },
      { name: 'Technology', url: 'https://feeds.a.dj.com/rss/RSSWSJD.xml' }
    ],
    description: 'Wall Street Journal RSS feeds in 2027: financial markets, corporate earnings, and executive business strategy.',
    summary: 'WSJ delivers market-moving financial analysis, economic indicator data, and corporate reporting.',
    faqs: [{ q: 'Do WSJ feeds require a login?', a: 'Headlines and summaries in the RSS feeds are public and unauthenticated.' }]
  },
  {
    slug: 'bloomberg',
    name: 'Bloomberg',
    domain: 'bloomberg.com',
    category: 'Markets & Finance',
    feedUrl: 'https://www.bloomberg.com/feed/bview.xml',
    description: 'Bloomberg RSS feeds for 2027: global markets, commodities, currency exchange, and business insights.',
    summary: 'Bloomberg covers macroeconomic policy, bond yields, stock movements, and global trade.',
    faqs: [{ q: 'Can I track Bloomberg on Android?', a: 'Yes. Curated Feeds parses Bloomberg market updates cleanly.' }]
  },
  {
    slug: 'financial-times',
    name: 'Financial Times',
    domain: 'ft.com',
    category: 'Global Finance',
    feedUrl: 'https://www.ft.com/rss/home/uk',
    description: 'Financial Times RSS feed for 2027: global economic analysis, banking policy, and sovereign debt.',
    summary: 'The Financial Times provides European and transatlantic economic reporting with analytical rigor.',
    faqs: [{ q: 'Does FT publish RSS?', a: 'Yes, FT maintains multiple public section RSS feeds.' }]
  },
  {
    slug: 'forbes',
    name: 'Forbes',
    domain: 'forbes.com',
    category: 'Business & Wealth',
    feedUrl: 'https://www.forbes.com/business/feed/',
    description: 'Forbes RSS feeds in 2027: leadership, billionaire wealth, entrepreneurship, and venture investing.',
    summary: 'Forbes covers entrepreneurship, investment trends, leadership lessons, and emerging tech.',
    faqs: [{ q: 'How do I add Forbes to Curated Feeds?', a: 'Paste https://www.forbes.com/business/feed/ into the add-source field.' }]
  },
  {
    slug: 'fortune',
    name: 'Fortune',
    domain: 'fortune.com',
    category: 'Business',
    feedUrl: 'https://fortune.com/feed',
    description: 'Fortune magazine RSS feed for 2027: Fortune 500 corporations, executive leadership, and macroeconomic news.',
    summary: 'Fortune tracks large-cap corporations, CEO transitions, and business innovation.',
    faqs: [{ q: 'Does Fortune support RSS?', a: 'Yes. The main feed is at fortune.com/feed.' }]
  },
  {
    slug: 'economist',
    name: 'The Economist',
    domain: 'economist.com',
    category: 'Global Affairs',
    feedUrl: 'https://www.economist.com/rss',
    description: 'The Economist RSS feed for 2027: geopolitical analysis, global trade, science, and economic theory.',
    summary: 'The Economist offers deep perspective on international affairs, monetary policy, and world business.',
    faqs: [{ q: 'What is included in The Economist RSS feed?', a: 'Lead editorial pieces, leaders, and international section briefs.' }]
  },
  {
    slug: 'cnbc',
    name: 'CNBC',
    domain: 'cnbc.com',
    category: 'Markets & Business',
    feedUrl: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    description: 'CNBC RSS feeds for 2027: real-time stock ticker news, earnings calls, and Federal Reserve decisions.',
    summary: 'CNBC is the broadcast leader in day-to-day equities and consumer financial news.',
    faqs: [{ q: 'Does CNBC have sector feeds?', a: 'Yes. CNBC provides feeds for technology, health, and personal finance.' }]
  },
  {
    slug: 'marketwatch',
    name: 'MarketWatch',
    domain: 'marketwatch.com',
    category: 'Investing & Stocks',
    feedUrl: 'https://feeds.content.dowjones.io/public/rss/mw_topstories',
    description: 'MarketWatch RSS feed for 2027: stock market movers, retirement advice, and bond yields.',
    summary: 'MarketWatch delivers accessible financial guidance and real-time market updates.',
    faqs: [{ q: 'How fast do MarketWatch feeds update?', a: 'Stories stream continuously throughout the trading day.' }]
  },
  {
    slug: 'nature',
    name: 'Nature',
    domain: 'nature.com',
    category: 'Science',
    feedUrl: 'https://www.nature.com/nature.rss',
    description: 'Nature journal RSS feed for 2027: peer-reviewed research papers, biology discoveries, and physics breakthroughs.',
    summary: 'Nature is the world’s leading multidisciplinary science journal. Stay abreast of verified scientific milestones.',
    faqs: [{ q: 'Are Nature abstracts included?', a: 'Yes. Paper titles, author lists, and full research abstracts appear in the feed.' }]
  },
  {
    slug: 'science-magazine',
    name: 'Science Magazine',
    domain: 'science.org',
    category: 'Science',
    feedUrl: 'https://www.science.org/rss/news_current.xml',
    description: 'Science (AAAS) RSS feed for 2027: peer-reviewed scientific studies and international research policy.',
    summary: 'Published by AAAS, Science covers cutting-edge findings in medicine, astronomy, and environmental science.',
    faqs: [{ q: 'Is Science Magazine on RSS?', a: 'Yes. The AAAS news feed is updated daily.' }]
  },
  {
    slug: 'scientific-american',
    name: 'Scientific American',
    domain: 'scientificamerican.com',
    category: 'Science',
    feedUrl: 'http://rss.sciam.com/ScientificAmerican-Global',
    description: 'Scientific American RSS feed for 2027: accessible science journalism, neuroscience, and evolution.',
    summary: 'Scientific American explains complex scientific principles with clarity and elegance.',
    faqs: [{ q: 'Can I read SciAm offline?', a: 'Curated Feeds caches full articles locally for distraction-free reading.' }]
  },
  {
    slug: 'mit-tech-review',
    name: 'MIT Technology Review',
    domain: 'technologyreview.com',
    category: 'Technology & Science',
    feedUrl: 'https://www.technologyreview.com/feed/',
    description: 'MIT Technology Review RSS feed for 2027: frontier AI, quantum computing, clean energy, and biotechnology.',
    summary: 'Rigorous engineering reporting from a newsroom affiliated with MIT.',
    faqs: [{ q: 'Does MIT Tech Review support RSS?', a: 'Yes. The feed publishes daily research reports.' }]
  },
  {
    slug: 'national-geographic',
    name: 'National Geographic',
    domain: 'nationalgeographic.com',
    category: 'Nature & Science',
    feedUrl: 'https://www.nationalgeographic.com/pages/topic/latest-stories/rss',
    description: 'National Geographic RSS feed for 2027: wildlife photography, archaeology discoveries, and earth exploration.',
    summary: 'National Geographic chronicles natural history, human cultures, and conservation.',
    faqs: [{ q: 'Are photographs included in the feed?', a: 'Yes. Editorial photography is attached via standard RSS enclosure tags.' }]
  },
  {
    slug: 'nasa',
    name: 'NASA',
    domain: 'nasa.gov',
    category: 'Space & Astronomy',
    feedUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
    description: 'NASA Breaking News RSS feed for 2027: space telescope imagery, rocket launches, and astronaut missions.',
    summary: 'Official NASA announcements regarding space exploration, solar science, and planetary orbiters.',
    faqs: [{ q: 'Is NASA public domain?', a: 'Yes. NASA images and reports are freely syndicable.' }]
  },
  {
    slug: 'smashing-magazine',
    name: 'Smashing Magazine',
    domain: 'smashingmagazine.com',
    category: 'Web Design & Dev',
    feedUrl: 'https://www.smashingmagazine.com/feed/',
    description: 'Smashing Magazine RSS feed for 2027: frontend web design, CSS layouts, accessibility, and UX.',
    summary: 'Practical tutorials and deep explorations into web design, performance, and frontend architecture.',
    faqs: [{ q: 'Does Smashing Magazine include code samples in RSS?', a: 'Yes. Code blocks are preserved.' }]
  },
  {
    slug: 'css-tricks',
    name: 'CSS-Tricks',
    domain: 'css-tricks.com',
    category: 'Frontend & CSS',
    feedUrl: 'https://css-tricks.com/feed/',
    description: 'CSS-Tricks RSS feed for 2027: modern CSS, SVG animation, frontend performance, and web standards.',
    summary: 'The ultimate knowledge base for CSS layouts, flexbox, CSS grid, and browser styling quirks.',
    faqs: [{ q: 'Is CSS-Tricks active on RSS?', a: 'Yes. The feed is located at css-tricks.com/feed/.' }]
  },
  {
    slug: 'a-list-apart',
    name: 'A List Apart',
    domain: 'alistapart.com',
    category: 'Web Design',
    feedUrl: 'https://alistapart.com/feed/',
    description: 'A List Apart RSS feed for 2027: foundational essays on web standards, content strategy, and design systems.',
    summary: 'A List Apart explores the design, development, and meaning of web content.',
    faqs: [{ q: 'How often does A List Apart publish?', a: 'Articles are published on a measured monthly cadence.' }]
  },
  {
    slug: 'daring-fireball',
    name: 'Daring Fireball',
    domain: 'daringfireball.net',
    category: 'Apple & Tech',
    feedUrl: 'https://daringfireball.net/feeds/main',
    description: 'Daring Fireball RSS feed for 2027: John Gruber on Apple, technology culture, and markdown.',
    summary: 'The premier independent voice on Apple, operating continuously since 2002.',
    faqs: [{ q: 'Is Daring Fireball full-text in RSS?', a: 'Yes. Gruber provides complete commentary and linked-list items.' }]
  },
  {
    slug: 'macrumors',
    name: 'MacRumors',
    domain: 'macrumors.com',
    category: 'Apple',
    feedUrl: 'https://www.macrumors.com/macrumors.xml',
    description: 'MacRumors RSS feed for 2027: Apple product leaks, iOS updates, and hardware buying advice.',
    summary: 'Fast-paced reporting on iPhone, iPad, Mac, and Apple Watch hardware cycles.',
    faqs: [{ q: 'How often does MacRumors update?', a: 'Dozens of rumors and guides daily.' }]
  },
  {
    slug: '9to5mac',
    name: '9to5Mac',
    domain: '9to5mac.com',
    category: 'Apple',
    feedUrl: 'https://9to5mac.com/feed/',
    description: '9to5Mac RSS feed for 2027: breaking Apple news, software beta features, and ecosystem accessories.',
    summary: 'Comprehensive daily news covering Apple software releases and hardware lines.',
    faqs: [{ q: 'Can I read 9to5Mac in Curated Feeds?', a: 'Yes. Swipe through new Apple announcements smoothly.' }]
  },
  {
    slug: 'android-police',
    name: 'Android Police',
    domain: 'androidpolice.com',
    category: 'Android',
    feedUrl: 'https://www.androidpolice.com/feed/',
    description: 'Android Police RSS feed for 2027: APK teardowns, Android OS updates, and pixel hardware reviews.',
    summary: 'The definitive news site for Android ecosystem enthusiasts, phone reviews, and Google software updates.',
    faqs: [{ q: 'Does Android Police cover APK releases?', a: 'Yes. New app versions and system updates are tracked continuously.' }]
  },
  {
    slug: 'android-authority',
    name: 'Android Authority',
    domain: 'androidauthority.com',
    category: 'Android',
    feedUrl: 'https://www.androidauthority.com/feed/',
    description: 'Android Authority RSS feed for 2027: phone comparisons, buying guides, and mobile OS tutorials.',
    summary: 'In-depth camera benchmarks, battery life tests, and smartphone teardowns.',
    faqs: [{ q: 'Can I read Android Authority on my phone?', a: 'Yes. Enjoy clean, ad-free cards in Curated Feeds.' }]
  },
  {
    slug: 'polygon',
    name: 'Polygon',
    domain: 'polygon.com',
    category: 'Gaming',
    feedUrl: 'https://www.polygon.com/rss/index.xml',
    description: 'Polygon RSS feed for 2027: game reviews, video game industry news, guides, and pop culture.',
    summary: 'Polygon covers gaming narrative, studio features, and streaming entertainment.',
    faqs: [{ q: 'Does Polygon publish full reviews in RSS?', a: 'Reviews, scores, and features stream through their XML feed.' }]
  },
  {
    slug: 'ign',
    name: 'IGN',
    domain: 'ign.com',
    category: 'Gaming',
    feedUrl: 'https://feeds.feedburner.com/ign/all',
    description: 'IGN RSS feed for 2027: video game trailers, walkthroughs, review scores, and movie news.',
    summary: 'The largest global entertainment and video game news network.',
    faqs: [{ q: 'Does IGN have an RSS feed?', a: 'Yes. IGN maintains feeds across all gaming platforms.' }]
  },
  {
    slug: 'kotaku',
    name: 'Kotaku',
    domain: 'kotaku.com',
    category: 'Gaming',
    feedUrl: 'https://kotaku.com/rss',
    description: 'Kotaku RSS feed for 2027: game reviews, developer commentary, and gaming culture.',
    summary: 'Kotaku covers video games, the people who make them, and gaming culture.',
    faqs: [{ q: 'How often does Kotaku post?', a: 'Daily coverage of releases, esports, and controversies.' }]
  },
  {
    slug: 'rock-paper-shotgun',
    name: 'Rock Paper Shotgun',
    domain: 'rockpapershotgun.com',
    category: 'PC Gaming',
    feedUrl: 'https://www.rockpapershotgun.com/feed',
    description: 'Rock Paper Shotgun RSS feed for 2027: PC gaming reviews, indie discoveries, and hardware advice.',
    summary: 'Thoughtful PC gaming criticism, hardware guides, and independent game spotlights.',
    faqs: [{ q: 'Does RPS cover indie games?', a: 'Yes, RPS is celebrated for finding obscure indie gems.' }]
  },
  {
    slug: 'the-atlantic',
    name: 'The Atlantic',
    domain: 'theatlantic.com',
    category: 'Culture & Politics',
    feedUrl: 'https://www.theatlantic.com/feed/all/',
    description: 'The Atlantic RSS feed for 2027: long-form essays, political analysis, and cultural criticism.',
    summary: 'The Atlantic publishes consequential essays on democracy, ideas, and modern culture.',
    faqs: [{ q: 'Can I subscribe to The Atlantic with RSS?', a: 'Yes. The full editorial feed is at theatlantic.com/feed/all/.' }]
  },
  {
    slug: 'new-yorker',
    name: 'The New Yorker',
    domain: 'newyorker.com',
    category: 'Culture & Fiction',
    feedUrl: 'https://www.newyorker.com/feed/everything',
    description: 'The New Yorker RSS feed for 2027: investigative features, fiction, cultural commentary, and humor.',
    summary: 'The New Yorker is renowned for deep investigative profiles, literary fiction, and criticism.',
    faqs: [{ q: 'Does The New Yorker support RSS?', a: 'Yes. Stories from the print magazine and daily website appear.' }]
  },
  {
    slug: 'vox',
    name: 'Vox',
    domain: 'vox.com',
    category: 'Explainer Journalism',
    feedUrl: 'https://www.vox.com/rss/index.xml',
    description: 'Vox RSS feed for 2027: explainer journalism on policy, economics, science, and pop culture.',
    summary: 'Vox unpacks complex policy debates and cultural phenomena with lucid explainers.',
    faqs: [{ q: 'Why read Vox on RSS?', a: 'Catch thoughtful explanations without algorithmic clutter.' }]
  },
  {
    slug: 'propublica',
    name: 'ProPublica',
    domain: 'propublica.com',
    category: 'Investigative Journalism',
    feedUrl: 'https://feeds.propublica.org/propublica/main',
    description: 'ProPublica RSS feed for 2027: award-winning investigative journalism exposing abuses of public trust.',
    summary: 'Nonprofit, independent newsroom dedicated to journalism in the public interest.',
    faqs: [{ q: 'Is ProPublica free to read?', a: 'Yes. ProPublica is reader-funded and open to all.' }]
  },
  {
    slug: 'the-intercept',
    name: 'The Intercept',
    domain: 'theintercept.com',
    category: 'Investigative Journalism',
    feedUrl: 'https://theintercept.com/feed/?rss',
    description: 'The Intercept RSS feed for 2027: national security reporting, surveillance exposés, and politics.',
    summary: 'Fearless reporting on intelligence agencies, corporate corruption, and political power.',
    faqs: [{ q: 'Does The Intercept offer an RSS feed?', a: 'Yes, at theintercept.com/feed/?rss.' }]
  },
  {
    slug: 'slate',
    name: 'Slate',
    domain: 'slate.com',
    category: 'Opinion & Culture',
    feedUrl: 'https://slate.com/feeds/all.rss',
    description: 'Slate RSS feed for 2027: sharp analysis on legal affairs, technology ethics, and pop culture.',
    summary: 'Slate provides progressive commentary, Supreme Court analysis, and cultural podcasts.',
    faqs: [{ q: 'Are Slate articles updated daily?', a: 'Yes, Slate publishes throughout each weekday.' }]
  },
  {
    slug: 'politico',
    name: 'Politico',
    domain: 'politico.com',
    category: 'Politics',
    feedUrl: 'https://rss.politico.com/politics-news.xml',
    description: 'Politico RSS feed for 2027: congressional maneuvers, elections, and national political power.',
    summary: 'Politico is the insider playbook for national and international political news.',
    faqs: [{ q: 'Does Politico have Playbook in RSS?', a: 'Yes, Politico distributes multiple policy newsletters and feeds.' }]
  },
  {
    slug: 'fast-company',
    name: 'Fast Company',
    domain: 'fastcompany.com',
    category: 'Business & Design',
    feedUrl: 'https://www.fastcompany.com/latest/rss',
    description: 'Fast Company RSS feed for 2027: innovation in technology, leadership, social impact, and design.',
    summary: 'Fast Company focuses on forward-thinking business leaders, sustainable design, and innovative products.',
    faqs: [{ q: 'Can I read Fast Company in Curated Feeds?', a: 'Yes. Add their RSS URL to read clean article cards.' }]
  },
  {
    slug: 'inc-magazine',
    name: 'Inc. Magazine',
    domain: 'inc.com',
    category: 'Entrepreneurship',
    feedUrl: 'https://www.inc.com/rss/homepage.xml',
    description: 'Inc. Magazine RSS feed for 2027: practical advice for entrepreneurs and small business leaders.',
    summary: 'Inc. publishes management tactics, scaling frameworks, and founder profiles.',
    faqs: [{ q: 'Is Inc. RSS free?', a: 'Yes. Public article links and blurbs are provided in their feed.' }]
  },
  {
    slug: 'cnet',
    name: 'CNET',
    domain: 'cnet.com',
    category: 'Technology',
    feedUrl: 'https://www.cnet.com/rss/news/',
    description: 'CNET RSS feed for 2027: tech reviews, consumer electronics buying advice, and software downloads.',
    summary: 'CNET tests consumer technology products to help people buy smart.',
    faqs: [{ q: 'Does CNET offer categorized feeds?', a: 'Yes. CNET maintains feeds for mobile, computing, and smart home.' }]
  },
  {
    slug: 'zdnet',
    name: 'ZDNet',
    domain: 'zdnet.com',
    category: 'Enterprise Tech',
    feedUrl: 'https://www.zdnet.com/news/rss.xml',
    description: 'ZDNet RSS feed for 2027: enterprise IT, cloud infrastructure, AI models, and cybersecurity.',
    summary: 'ZDNet covers B2B software, enterprise hardware deployments, and CIO priorities.',
    faqs: [{ q: 'How often does ZDNet publish?', a: 'Continuous tech updates throughout every business day.' }]
  },
  {
    slug: 'mashable',
    name: 'Mashable',
    domain: 'mashable.com',
    category: 'Tech & Culture',
    feedUrl: 'https://mashable.com/feeds/rss/all',
    description: 'Mashable RSS feed for 2027: digital culture, tech gadgets, entertainment, and social platforms.',
    summary: 'Mashable chronicles digital entertainment, social media trends, and tech culture.',
    faqs: [{ q: 'Does Mashable support RSS 2.0?', a: 'Yes, at mashable.com/feeds/rss/all.' }]
  },
  {
    slug: 'lifehacker',
    name: 'Lifehacker',
    domain: 'lifehacker.com',
    category: 'Productivity & Tips',
    feedUrl: 'https://lifehacker.com/rss',
    description: 'Lifehacker RSS feed for 2027: software tips, DIY life hacks, personal finance, and tech setups.',
    summary: 'Lifehacker shares clever software tweaks, food hacks, and productivity techniques.',
    faqs: [{ q: 'Can I read Lifehacker tips offline in Curated Feeds?', a: 'Yes! Articles cache locally on first read on your phone.' }]
  }
];

export const getPublication = (slug: string): Publication | undefined =>
  PUBLICATIONS.find((p) => p.slug === slug);
