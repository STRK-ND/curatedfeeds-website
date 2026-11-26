# dev.to Article — ready to publish

**Target:** developers (dev.to's audience). **Goal:** authentic build story → traffic + DR 87 link.
**Suggested tags:** `#android` `#flutter` `#privacy` `#productivity`
**Cover image:** `https://curatedfeeds.web.app/og-image.png`

---

# I replaced social media with RSS and measured what happened. Then I built my own reader.

In 2022 I deleted every social app from my phone. Not a digital-detox stunt — I was spending
**3 hours 15 minutes a day** inside feeds designed to maximize my attention, which is
**1,186 hours a year**, or 49 full days. I wanted that time back, so I ran the swap for real:
Twitter and LinkedIn out, a curated RSS setup of ~40 sources in.

Three years later the habit stuck. This post is what I learned, and how that experiment turned
into an Android app I shipped.

## Why RSS actually wins (mechanics, not vibes)

RSS emerged in 1999 and does exactly one thing: it tells you when content **you explicitly
chose** becomes available. No scoring function, no engagement objective.

Social platforms employ hundreds of engineers whose job is to increase time-on-platform. Their
recommenders score candidate posts by predicted interaction and promote the winners. Engagement
is the objective function — anything that reliably provokes it gets promoted, true or not.

RSS has no engagement optimization. If your sources publish 50 articles today, you see 50
articles in publish order. There is no algorithm in the loop because there is nothing for it
to optimize. When you use social media you are the product; when you use RSS you are the
customer. The incentive structures are opposite.

## The part nobody tells you: the reader is the hard problem

Existing RSS apps solved sync and subscriptions, but on mobile they all converged on the same
shape: an endless list, unread-count anxiety, and a filing system (stars, folders, tags) you
have to maintain. The queue becomes a chore, and chores get abandoned.

So I prototyped the opposite constraint: **the queue is one card deep.** One article on screen.
Swipe right to save it for later, swipe left to mark it done, next card. Triage becomes a
gesture instead of a filing session.

## Building it: the architecture

I built **Curated Feeds** in **Flutter/Dart** for Android 8.0+. The interesting decisions:

- **Local-first, no account.** Feeds, saved articles, and reading history live on the device.
  There is no server to sync, which means there is no account to create and no reading data
  that can leak, be sold, or be subpoenaed.
- **Offline by default.** Every article you open is cached locally, so the subway and the
  flight are reading time, not dead time.
- **The only network calls out** are feed fetches and an anonymous Firebase counter you can
  kill by revoking network permission. No ad SDKs, no tracking.
- **APK distribution** runs through Cloudflare Workers from object storage — edge delivery,
  no request logs.

Saying "no" to sync was the product decision everything else followed. It cost me multi-device
reading; it bought a reader that cannot surveil you, because architecturally there is nothing
to surveil with.

## What I'd do differently

- Sync is the single most-requested feature, and the honest answer is still no — it's the
  moment the server (and the account, and the privacy story) enters the picture.
- Launching without a Play Store listing costs discoverability; direct-APK distribution is
  fine for the hacker-news crowd and invisible to everyone else.

## Try it

Curated Feeds is free forever — no ads, no premium tier, no account:
**https://curatedfeeds.web.app** (direct APK, ~67 MB, also on Uptodown).
All the source content on the site is CC BY 4.0 if you want to quote or republish any of it.

If you've run your own RSS-vs-social experiment, I'd genuinely like to hear what your numbers
looked like — the comments are open.

---

*This article is adapted from content published on curatedfeeds.web.app under CC BY 4.0.
Author: Rajat Kashyap — https://curatedfeeds.web.app*
