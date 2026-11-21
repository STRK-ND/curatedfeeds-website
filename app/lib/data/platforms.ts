export type PlatformGuide = {
  slug: string;
  name: string;
  title: string;
  description: string;
  urlPattern: string;
  exampleUrl: string;
  exampleFeedUrl: string;
  keywords: string[];
  summary: string;
  howToSteps: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const PLATFORMS: PlatformGuide[] = [
  {
    slug: 'substack',
    name: 'Substack',
    title: 'How to Find Any Substack RSS Feed URL in 2027',
    description: 'Find and extract the RSS feed URL for any Substack newsletter or writer in 2027. Read publications in Curated Feeds without email inbox clutter.',
    urlPattern: 'https://[publication].substack.com/feed',
    exampleUrl: 'https://pragmaticengineer.substack.com',
    exampleFeedUrl: 'https://pragmaticengineer.substack.com/feed',
    keywords: ['substack rss feed 2027', 'how to get substack rss url', 'read substack with rss', 'substack feed format', 'substack without email'],
    summary: 'Every Substack publication automatically provides an open RSS feed. For standard Substack subdomains, simply add /feed to the end of the URL. For custom publication domains (e.g., newsletter.domain.com), adding /feed works identically.',
    howToSteps: [
      { step: 'Locate the publication URL', detail: 'Open the Substack publication in your browser (e.g. author.substack.com or customdomain.com).' },
      { step: 'Append /feed', detail: 'Add /feed to the end of the address in the browser bar and press enter to verify the XML feed loads.' },
      { step: 'Paste into Curated Feeds', detail: 'Copy the feed address and paste it directly into Curated Feeds on Android to start reading offline with zero email notifications.' }
    ],
    faqs: [
      { q: 'Can I read paid Substack posts via RSS?', a: 'Substack public feeds deliver full text for free posts. For posts marked for paying subscribers only, the feed includes a short preview with a direct link.' },
      { q: 'Do custom domain Substacks have an RSS feed?', a: 'Yes. Append /feed to the custom domain (e.g., https://example.com/feed) and it will serve the exact same RSS XML stream.' }
    ]
  },
  {
    slug: 'medium',
    name: 'Medium',
    title: 'How to Get Any Medium RSS Feed URL in 2027',
    description: 'Locate the RSS feed for any Medium writer, publication, or topic tag in 2027. Read Medium articles in your own reader without popups or paywalls.',
    urlPattern: 'https://medium.com/feed/@username',
    exampleUrl: 'https://medium.com/@ev',
    exampleFeedUrl: 'https://medium.com/feed/@ev',
    keywords: ['medium rss feed 2027', 'how to get medium rss feed', 'medium user feed url', 'medium publication rss', 'read medium in rss'],
    summary: 'Medium natively supports RSS feeds for individual writers, custom publications, and category tags. For users, insert /feed/ before the @username.',
    howToSteps: [
      { step: 'For an individual writer', detail: 'Change medium.com/@username to medium.com/feed/@username.' },
      { step: 'For a Medium publication', detail: 'Change medium.com/publication-name to medium.com/feed/publication-name.' },
      { step: 'For a topic tag', detail: 'Use medium.com/feed/tag/topic-name (e.g., medium.com/feed/tag/programming).' }
    ],
    faqs: [
      { q: 'Why does a Medium feed only show excerpts?', a: 'Medium occasionally truncates article bodies in their RSS feeds. Curated Feeds automatically caches and formats available content cleanly for offline reading.' },
      { q: 'Can I follow Medium custom domains via RSS?', a: 'Yes. If a publication uses customdomain.com, append /feed to the domain URL: https://customdomain.com/feed.' }
    ]
  },
  {
    slug: 'ghost',
    name: 'Ghost',
    title: 'How to Find Any Ghost Blog RSS Feed URL in 2027',
    description: 'Find and subscribe to any Ghost publication or newsletter RSS feed in 2027. Clean, distraction-free reading for independent blogs.',
    urlPattern: 'https://[domain.com]/rss/',
    exampleUrl: 'https://blog.ghost.org',
    exampleFeedUrl: 'https://blog.ghost.org/rss/',
    keywords: ['ghost blog rss feed 2027', 'ghost cms rss url', 'ghost newsletter rss', 'find ghost feed', 'subscribe to ghost blog'],
    summary: 'Ghost is built natively on open web standards. Every Ghost blog has an active RSS feed located at the /rss/ endpoint off its root domain.',
    howToSteps: [
      { step: 'Open the Ghost website', detail: 'Visit the home page of any blog running Ghost.' },
      { step: 'Append /rss/', detail: 'Add /rss/ or /rss to the end of the domain (e.g., https://example.com/rss/).' },
      { step: 'Subscribe in Curated Feeds', detail: 'Paste the link into Curated Feeds to receive every post cleanly without newsletter popups.' }
    ],
    faqs: [
      { q: 'Do author-specific feeds exist in Ghost?', a: 'Yes. Ghost provides author feeds at /author/[slug]/rss/ and tag feeds at /tag/[slug]/rss/.' },
      { q: 'Are Ghost RSS feeds full-text?', a: 'Most Ghost blogs provide complete, unabridged article bodies in their RSS feed, making them ideal for reading offline.' }
    ]
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    title: 'How to Find Any WordPress RSS Feed URL in 2027',
    description: 'Complete guide to WordPress RSS feeds in 2027: main feeds, category feeds, author feeds, and comments feeds with copy-paste templates.',
    urlPattern: 'https://[domain.com]/feed/',
    exampleUrl: 'https://techcrunch.com',
    exampleFeedUrl: 'https://techcrunch.com/feed/',
    keywords: ['wordpress rss feed 2027', 'find wordpress feed url', 'wordpress category rss', 'wordpress author feed', 'subscribe to wordpress rss'],
    summary: 'Powering over 40% of the web, WordPress includes built-in RSS 2.0 feeds on almost every installation. The standard feed is located at /feed/ or /?feed=rss2.',
    howToSteps: [
      { step: 'Try the standard endpoint', detail: 'Add /feed/ to the website root (e.g., https://example.com/feed/).' },
      { step: 'For specific categories', detail: 'Append /feed/ to category pages: https://example.com/category/tech/feed/.' },
      { step: 'For specific authors', detail: 'Append /feed/ to author profiles: https://example.com/author/john/feed/.' }
    ],
    faqs: [
      { q: 'What if /feed/ redirects to a 404?', a: 'Some custom WordPress sites disable default permalinks. Try https://example.com/?feed=rss2 or run the address through our RSS Feed Finder tool.' },
      { q: 'Does WordPress support Atom feeds?', a: 'Yes. You can access the Atom feed on any standard WordPress site at https://example.com/feed/atom/.' }
    ]
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    title: 'How to Get Any YouTube Channel RSS Feed in 2027',
    description: 'Learn how to get an RSS feed URL for any YouTube channel in 2027. Follow creators directly without ads, algorithms, or account logins.',
    urlPattern: 'https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID',
    exampleUrl: 'https://www.youtube.com/@veritasium',
    exampleFeedUrl: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCHnyfMqiRRG1u-2MsSQLbXA',
    keywords: ['youtube channel rss feed 2027', 'how to get youtube rss', 'youtube to rss url', 'watch youtube in rss', 'youtube feed generator'],
    summary: 'YouTube maintains direct XML feeds for every channel and playlist. Once you have the 24-character Channel ID starting with UC, you can receive instant video alerts.',
    howToSteps: [
      { step: 'Get the Channel ID', detail: 'Paste the channel URL into our RSS Feed Finder tool, or inspect the channel page source for itemprop="channelId".' },
      { step: 'Assemble the feed URL', detail: 'Combine the base URL with the channel ID: https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_ID.' },
      { step: 'Add to Curated Feeds', detail: 'Swipe through new video releases without being pulled into autoplaying Shorts or algorithmic rabbit holes.' }
    ],
    faqs: [
      { q: 'Can I subscribe to a YouTube playlist via RSS?', a: 'Yes. Use the format https://www.youtube.com/feeds/videos.xml?playlist_id=YOUR_PLAYLIST_ID.' },
      { q: 'Do YouTube RSS feeds show video descriptions?', a: 'Yes. Each entry contains the video title, upload date, description, and direct link to stream.' }
    ]
  },
  {
    slug: 'reddit',
    name: 'Reddit',
    title: 'How to Get Reddit RSS Feeds for Any Subreddit in 2027',
    description: 'Follow subreddits, multireddits, search terms, and users with Reddit RSS feeds in 2027. Read Reddit without ads, popups, or accounts.',
    urlPattern: 'https://www.reddit.com/r/[subreddit]/.rss',
    exampleUrl: 'https://www.reddit.com/r/android',
    exampleFeedUrl: 'https://www.reddit.com/r/android/.rss',
    keywords: ['reddit rss feed 2027', 'subreddit rss url', 'reddit multireddit rss', 'read reddit without account', 'reddit user rss feed'],
    summary: 'Reddit natively exports almost every public view as an RSS/Atom feed by simply appending .rss to the end of the URL path.',
    howToSteps: [
      { step: 'For any subreddit', detail: 'Take https://www.reddit.com/r/technology and change it to https://www.reddit.com/r/technology/.rss.' },
      { step: 'For multiple subreddits', detail: 'Join them with a plus sign: https://www.reddit.com/r/android+technology+gadgets/.rss.' },
      { step: 'For top posts of the week', detail: 'Add sort query parameters: https://www.reddit.com/r/webdev/.rss?sort=top&t=week.' }
    ],
    faqs: [
      { q: 'Does Reddit rate-limit RSS feeds?', a: 'Reddit allows standard reader polling intervals. Curated Feeds caches updates locally so you never get blocked.' },
      { q: 'Can I follow a user profile via RSS?', a: 'Yes. Append .rss to a user submitted page: https://www.reddit.com/user/[username]/submitted/.rss.' }
    ]
  },
  {
    slug: 'github',
    name: 'GitHub',
    title: 'How to Track GitHub Releases and Commits with RSS in 2027',
    description: 'Track open-source software releases, tags, and commit changelogs using GitHub Atom feeds in 2027 without noisy notification emails.',
    urlPattern: 'https://github.com/[owner]/[repo]/releases.atom',
    exampleUrl: 'https://github.com/flutter/flutter',
    exampleFeedUrl: 'https://github.com/flutter/flutter/releases.atom',
    keywords: ['github releases rss feed 2027', 'github atom feed format', 'track github releases rss', 'github commits feed', 'open source release tracker'],
    summary: 'GitHub provides unauthenticated Atom feeds for repository releases, tags, and commit histories. Perfect for software engineers and sysadmins tracking updates.',
    howToSteps: [
      { step: 'For releases', detail: 'Add /releases.atom to the repository URL (e.g. https://github.com/vercel/next.js/releases.atom).' },
      { step: 'For repository tags', detail: 'Add /tags.atom to the repository URL (e.g. https://github.com/torvalds/linux/tags.atom).' },
      { step: 'For main branch commits', detail: 'Add /commits/main.atom to the repository URL.' }
    ],
    faqs: [
      { q: 'Do private GitHub repos support RSS?', a: 'No. GitHub Atom feeds only function on public repositories without authentication.' },
      { q: 'Are release notes included in the feed?', a: 'Yes. The full Markdown release notes and changelog authored by the maintainer are rendered in each entry.' }
    ]
  },
  {
    slug: 'tumblr',
    name: 'Tumblr',
    title: 'How to Get Any Tumblr Blog RSS Feed in 2027',
    description: 'Find and subscribe to any Tumblr blog RSS feed in 2027. Read photography, art, and personal microblogs without logging into Tumblr.',
    urlPattern: 'https://[blogname].tumblr.com/rss',
    exampleUrl: 'https://staff.tumblr.com',
    exampleFeedUrl: 'https://staff.tumblr.com/rss',
    keywords: ['tumblr rss feed 2027', 'how to get tumblr rss', 'tumblr blog feed url', 'read tumblr in rss reader', 'tumblr feed format'],
    summary: 'Every Tumblr blog publishes an open RSS 2.0 feed at /rss off its subdomain or custom domain address.',
    howToSteps: [
      { step: 'Standard Tumblr subdomain', detail: 'Add /rss to the blog address: https://username.tumblr.com/rss.' },
      { step: 'Custom domain Tumblr blog', detail: 'Add /rss to the root domain: https://exampleblog.com/rss.' },
      { step: 'Add to Curated Feeds', detail: 'Paste the URL into Curated Feeds to browse posts, photos, and links as swipeable cards.' }
    ],
    faqs: [
      { q: 'Do Tumblr image posts render in RSS?', a: 'Yes. High-resolution images and caption text are embedded directly in the feed items.' },
      { q: 'Can I follow tagged posts on Tumblr?', a: 'Yes. Use the format https://username.tumblr.com/tagged/[tag]/rss.' }
    ]
  },
  {
    slug: 'dev-to',
    name: 'Dev.to',
    title: 'How to Get Dev.to RSS Feeds for Writers and Tags in 2027',
    description: 'Find Dev.to RSS feed URLs for authors, organizations, and programming tags in 2027. Read developer tutorials distraction-free.',
    urlPattern: 'https://dev.to/feed/[username]',
    exampleUrl: 'https://dev.to/thepracticaldev',
    exampleFeedUrl: 'https://dev.to/feed/thepracticaldev',
    keywords: ['dev to rss feed 2027', 'dev.to author rss', 'dev to tag rss url', 'programming articles rss', 'follow dev to in rss'],
    summary: 'Dev.to (and the broader Forem network) provides fast RSS feeds for users, organizations, and technology tags under /feed/.',
    howToSteps: [
      { step: 'For an individual developer', detail: 'Use https://dev.to/feed/[username] (e.g., https://dev.to/feed/ben).' },
      { step: 'For a technology tag', detail: 'Use https://dev.to/feed/tag/[tag-name] (e.g., https://dev.to/feed/tag/javascript).' },
      { step: 'For top trending articles', detail: 'The main homepage feed is available at https://dev.to/feed.' }
    ],
    faqs: [
      { q: 'Does Dev.to include code snippets in the feed?', a: 'Yes. Code blocks with language indicators are preserved in the RSS markup.' },
      { q: 'Can I read Dev.to articles offline?', a: 'Yes. Curated Feeds caches the full article body so you can study coding tutorials anywhere.' }
    ]
  },
  {
    slug: 'mastodon',
    name: 'Mastodon',
    title: 'How to Get Any Mastodon Profile or Tag RSS Feed in 2027',
    description: 'Subscribe to Fediverse and Mastodon profiles or hashtags using open RSS feeds in 2027. No Mastodon account or instance required.',
    urlPattern: 'https://[instance]/@[username].rss',
    exampleUrl: 'https://mastodon.social/@Gargron',
    exampleFeedUrl: 'https://mastodon.social/@Gargron.rss',
    keywords: ['mastodon rss feed 2027', 'fediverse rss feed url', 'follow mastodon without account', 'mastodon hashtag rss', 'mastodon feed format'],
    summary: 'Mastodon embraces open federation standards. Every public user profile and public hashtag generates a clean RSS feed by simply appending .rss.',
    howToSteps: [
      { step: 'For any public user', detail: 'Append .rss to their profile URL: https://instance.social/@username.rss.' },
      { step: 'For any hashtag', detail: 'Append .rss to tag pages: https://instance.social/tags/technology.rss.' },
      { step: 'Add to Curated Feeds', detail: 'Follow decentralized thought leaders directly in your local card deck.' }
    ],
    faqs: [
      { q: 'Do media attachments appear in the feed?', a: 'Yes. Images and links attached to toots are included in the RSS enclosure tags.' },
      { q: 'Do I need an account on the user\'s instance?', a: 'No. RSS is entirely public and requires zero Fediverse accounts or instance memberships.' }
    ]
  },
  {
    slug: 'bluesky',
    name: 'Bluesky',
    title: 'How to Get Any Bluesky Account RSS Feed in 2027',
    description: 'Follow Bluesky (bsky.app) creators and journalists via RSS in 2027. Read public posts in your RSS reader without an invite or app install.',
    urlPattern: 'https://bsky.app/profile/[handle]/rss',
    exampleUrl: 'https://bsky.app/profile/jay.bsky.team',
    exampleFeedUrl: 'https://bsky.app/profile/jay.bsky.team/rss',
    keywords: ['bluesky rss feed 2027', 'bsky rss feed url', 'follow bluesky with rss', 'bluesky account feed', 'read bluesky without login'],
    summary: 'Bluesky accounts publish native RSS feeds for public accounts, allowing anyone to follow AT Protocol profiles from any standard feed reader.',
    howToSteps: [
      { step: 'Find the user handle', detail: 'Locate the profile (e.g., https://bsky.app/profile/handle.bsky.social).' },
      { step: 'Append /rss', detail: 'Add /rss to the profile URL: https://bsky.app/profile/handle.bsky.social/rss.' },
      { step: 'Triage with one thumb', detail: 'Read Bluesky dispatches as clean cards in Curated Feeds.' }
    ],
    faqs: [
      { q: 'Can I follow custom Bluesky feeds via RSS?', a: 'Third-party bridges and the AT Protocol offer feed bridging, but standard user feeds resolve natively at /rss.' },
      { q: 'Are replies included in the RSS feed?', a: 'Typically only original posts and quote-posts are included, keeping your feed high-signal.' }
    ]
  },
  {
    slug: 'threads',
    name: 'Threads',
    title: 'How to Follow Threads Accounts via RSS in 2027',
    description: 'Learn how to generate and read RSS feeds for Meta Threads profiles in 2027. Avoid Instagram logins and tracking algorithms.',
    urlPattern: 'https://www.threads.net/@[username]?rss=true',
    exampleUrl: 'https://www.threads.net/@zuck',
    exampleFeedUrl: 'https://www.threads.net/@zuck?rss=true',
    keywords: ['threads rss feed 2027', 'instagram threads rss', 'follow threads with rss reader', 'meta threads feed url', 'threads without app'],
    summary: 'With Threads rolling out Fediverse interoperability, public profiles can be syndicated directly or bridged into RSS feeds without third-party tracking.',
    howToSteps: [
      { step: 'Check Fediverse integration', detail: 'Profiles with Fediverse sharing enabled can be tracked via their federated handle.' },
      { step: 'Use RSS bridge or Feed Finder', detail: 'Paste the Threads profile link into our RSS Feed Finder tool to locate the syndication feed.' },
      { step: 'Subscribe on Android', detail: 'Read text posts in Curated Feeds without having Meta apps installed.' }
    ],
    faqs: [
      { q: 'Is an Instagram account needed to read Threads via RSS?', a: 'No. RSS is unauthenticated and completely private.' },
      { q: 'Does Curated Feeds block Meta telemetry?', a: 'Yes. Curated Feeds operates strictly locally on your device with zero advertising trackers.' }
    ]
  },
  {
    slug: 'podcasts',
    name: 'Podcasts',
    title: 'How to Find Any Podcast RSS Feed URL in 2027',
    description: 'Extract direct MP3 and XML RSS feeds from Apple Podcasts, Spotify, and podcast networks in 2027. Listen and read show notes anywhere.',
    urlPattern: 'https://[network.com]/feed/podcast/',
    exampleUrl: 'https://daringfireball.net/thetalkshow/',
    exampleFeedUrl: 'https://daringfireball.net/thetalkshow/rss',
    keywords: ['podcast rss feed finder 2027', 'apple podcasts rss url', 'find podcast feed', 'audio rss feed format', 'podcast show notes rss'],
    summary: 'Podcasts are fundamentally built on RSS with audio enclosure tags. Every open podcast has a canonical RSS feed URL that powers every listening app.',
    howToSteps: [
      { step: 'Find the show website', detail: 'Locate the podcast official homepage rather than a walled-garden player link.' },
      { step: 'Look for the RSS icon or /feed', detail: 'Most podcast sites feature a direct "RSS Feed" link in their footer or header.' },
      { step: 'Use the Feed Finder tool', detail: 'Paste the podcast webpage address into our RSS Feed Finder to extract the audio XML feed.' }
    ],
    faqs: [
      { q: 'Can I read podcast show notes in Curated Feeds?', a: 'Yes. Curated Feeds parses the title, publication date, show notes, and guest links.' },
      { q: 'Does Curated Feeds play podcast audio?', a: 'Curated Feeds displays the show notes and enclosure links directly so you can launch audio in your preferred media player.' }
    ]
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    title: 'How to Get Any Shopify Store Blog RSS Feed in 2027',
    description: 'Track ecommerce store updates, product launches, and brand blogs by finding Shopify RSS feeds in 2027.',
    urlPattern: 'https://[store-domain.com]/blogs/[blog-name].atom',
    exampleUrl: 'https://www.gymshark.com/blogs/news',
    exampleFeedUrl: 'https://www.gymshark.com/blogs/news.atom',
    keywords: ['shopify blog rss feed 2027', 'shopify store atom feed', 'shopify product launch rss', 'find shopify rss feed', 'track shopify stores'],
    summary: 'Every Shopify store blog natively publishes an Atom feed by appending .atom to the blog category URL path.',
    howToSteps: [
      { step: 'Navigate to the store blog', detail: 'Visit the blog section of any Shopify store (e.g. store.com/blogs/news).' },
      { step: 'Append .atom', detail: 'Add .atom to the end: https://store.com/blogs/news.atom.' },
      { step: 'Subscribe in Curated Feeds', detail: 'Track new collection announcements, guides, and discounts directly.' }
    ],
    faqs: [
      { q: 'Can I track individual Shopify product collections with RSS?', a: 'Yes! Shopify also supports feeds for product collections by appending .atom to any collection URL (e.g., store.com/collections/all.atom).' },
      { q: 'Are images supported in Shopify feeds?', a: 'Yes. Product photos and campaign banners are embedded in the Atom feed entries.' }
    ]
  },
  {
    slug: 'blogger',
    name: 'Blogger',
    title: 'How to Find Any Google Blogger / Blogspot RSS Feed in 2027',
    description: 'Extract RSS and Atom feed URLs for any Blogspot website in 2027. Read archives and personal blogs without tracking scripts.',
    urlPattern: 'https://[subdomain].blogspot.com/feeds/posts/default',
    exampleUrl: 'https://googleblog.blogspot.com',
    exampleFeedUrl: 'https://googleblog.blogspot.com/feeds/posts/default',
    keywords: ['blogger rss feed 2027', 'blogspot rss url format', 'google blogger atom feed', 'find blogspot feed', 'subscribe to blogspot'],
    summary: 'Google Blogger sites provide extensive Atom and RSS 2.0 endpoints for posts and comments under /feeds/posts/default.',
    howToSteps: [
      { step: 'Standard Blogspot address', detail: 'Use https://subdomain.blogspot.com/feeds/posts/default.' },
      { step: 'For standard RSS 2.0 format', detail: 'Add ?alt=rss: https://subdomain.blogspot.com/feeds/posts/default?alt=rss.' },
      { step: 'For specific label/tag feeds', detail: 'Use https://subdomain.blogspot.com/feeds/posts/default/-/[labelName].' }
    ],
    faqs: [
      { q: 'Do custom domain Blogger sites use the same feed path?', a: 'Yes. If a Blogger site uses customdomain.com, the feed is at https://customdomain.com/feeds/posts/default.' },
      { q: 'Are full articles included in Blogger feeds?', a: 'By default, Blogger delivers complete post bodies and full-resolution images.' }
    ]
  }
];

export const getPlatform = (slug: string): PlatformGuide | undefined =>
  PLATFORMS.find((p) => p.slug === slug);
