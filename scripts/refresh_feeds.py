#!/usr/bin/env python3
"""
Measure every feed in the catalogue and write the snapshot the pages render.

Run this on a schedule, not on every build: it makes one outbound request per
feed, and a build that depends on third-party hosts is a build that fails when
a third-party host is down. The snapshot it writes is committed to the repo,
so ``npm run build`` stays hermetic.

    python3 scripts/refresh_feeds.py

What gets measured, and why each field earns its place on a page:

``items_per_day``    how much the feed actually publishes, from a bounded
                     30-day window at the head of the feed rather than the
                     whole archive. This is the single most useful number for
                     someone deciding whether to subscribe, and it differs per
                     feed by an order of magnitude.
``publishing_days``  how many days in the window had at least one item. A feed
                     can publish 50 articles on 3 days or 5 articles on 30
                     days; the volume alone does not say whether it is a daily
                     publication or a weekend digest.
``headlines``        the actual titles published recently. This is the most
                     differentiated content on each page, and it is real
                     content rather than a description of content.
``format``           RSS 2.0, Atom or RDF, and whether the feed carries full
                     article bodies or only summaries.

The file it writes is a data source, not page copy. The editorial framing
lives in ``app/lib/feeds/sources.json``, where a person wrote it.
"""

from __future__ import annotations

import json
import pathlib
import subprocess
import sys
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_FILE = ROOT / "app" / "lib" / "feeds" / "sources.json"
OUT_FILE = ROOT / "app" / "lib" / "feeds" / "feeds.json"

USER_AGENT = (
    "Mozilla/5.0 (compatible; CuratedFeedsFeedCheck/1.0; "
    "+https://curatedfeeds.web.app/)"
)

# Days of recent output the cadence figures are measured over.
WINDOW_DAYS = 30

# How many recent headlines a page shows.
HEADLINE_COUNT = 8

ATOM_NS = "http://www.w3.org/2005/Atom"
CONTENT_NS = "http://purl.org/rss/1.0/modules/content/"


# --------------------------------------------------------------------- fetch


def fetch(url: str) -> tuple[int, str, str]:
    """Fetch a feed. Returns (status, body, content_type).

    Uses curl rather than urllib so TLS verification, redirects, compression
    and the HTTP version all behave the way they do for a real reader.
    """
    try:
        proc = subprocess.run(
            [
                "curl", "-sL", "--max-time", "25", "--compressed",
                "-A", USER_AGENT,
                "-w", "\n%{http_code}\n%{content_type}",
                url,
            ],
            capture_output=True,
            timeout=40,
        )
    except subprocess.TimeoutExpired:
        return 0, "", ""
    out = proc.stdout
    parts = out.rsplit(b"\n", 2)
    if len(parts) < 3:
        return 0, "", ""
    body = parts[0]
    try:
        status = int(parts[1].decode().strip() or 0)
    except ValueError:
        status = 0
    return status, body.decode("utf-8", errors="replace"), parts[2].decode().strip()


# -------------------------------------------------------------------- parse


def local(tag: str) -> str:
    """The local name of a possibly namespaced tag."""
    return tag.rsplit("}", 1)[-1] if "}" in tag else tag


def child_text(parent: ET.Element, name: str) -> str:
    for el in parent:
        if local(el.tag) == name:
            return (el.text or "").strip()
    return ""


def children(parent: ET.Element, name: str) -> list[ET.Element]:
    return [el for el in parent if local(el.tag) == name]


def parse_date(value: str) -> datetime | None:
    text = (value or "").strip()
    if not text:
        return None
    # RFC 822 (RSS) and RFC 3339 (Atom) both parse with fromisoformat in
    # 3.11+ only for the latter; normalise the former by hand.
    try:
        parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
        return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except ValueError:
        pass
    from email.utils import parsedate_to_datetime

    try:
        parsed = parsedate_to_datetime(text)
        return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def entry_link(entry: ET.Element, feed_link: str) -> str:
    links = children(entry, "link")
    if links:
        alternate = next(
            (l for l in links if (l.get("rel") or "alternate") == "alternate"), links[0]
        )
        href = alternate.get("href")
        if href:
            return href
        if (alternate.text or "").strip():
            return alternate.text.strip()
    guid = child_text(entry, "guid")
    if guid.startswith("http"):
        return guid
    return feed_link


def parse_feed(body: str) -> tuple[dict | None, str]:
    """Parse a feed body into a uniform record."""
    try:
        root = ET.fromstring(body)
    except ET.ParseError as exc:
        return None, f"XML parse error: {exc}"

    root_name = local(root.tag)
    if root_name == "feed":
        fmt = "Atom"
    elif root_name == "RDF":
        fmt = "RDF"
    elif root_name == "rss":
        fmt = "RSS 2.0"
    else:
        return None, f"unexpected root element {root_name!r}"

    feed_title = ""
    feed_description = ""
    feed_link = ""
    last_build = ""
    category_terms: list[str] = []
    item_els: list[ET.Element] = []

    if fmt == "Atom":
        feed_title = child_text(root, "title")
        feed_description = child_text(root, "subtitle")
        links = children(root, "link")
        chosen = next(
            (l for l in links if (l.get("rel") or "alternate") == "alternate"),
            links[0] if links else None,
        )
        if chosen is not None:
            feed_link = chosen.get("href") or ""
        item_els = children(root, "entry")
        category_terms = [
            c.get("term") for c in children(root, "category") if c.get("term")
        ]
    else:
        channel = children(root, "channel")
        channel = channel[0] if channel else root
        feed_title = child_text(channel, "title")
        feed_description = child_text(channel, "description")
        feed_link = child_text(channel, "link")
        last_build = child_text(channel, "lastBuildDate") or child_text(
            channel, "pubDate"
        )
        item_els = children(channel, "item")
        category_terms = [
            (c.text or "").strip() for c in children(channel, "category")
        ]
        if fmt == "RDF":
            item_els = children(root, "item")

    items = []
    for el in item_els:
        published = (
            child_text(el, "pubDate")
            or child_text(el, "published")
            or child_text(el, "updated")
            or child_text(el, "date")
        )
        # content:encoded (RSS) or content (Atom) carries the full body.
        full_text = False
        for child in el:
            if local(child.tag) == "encoded" and child.tag.startswith(f"{{{CONTENT_NS}"):
                full_text = len((child.text or "").strip()) > 400
                break
            if local(child.tag) == "content" and child.tag.startswith(f"{{{ATOM_NS}"):
                full_text = len((child.text or "").strip()) > 400
                break
        items.append(
            {
                "title": child_text(el, "title"),
                "link": entry_link(el, feed_link),
                "date": parse_date(published),
                "has_full_text": full_text,
                "categories": [
                    (c.get("term") or (c.text or "").strip())
                    for c in children(el, "category")
                ],
            }
        )

    return (
        {
            "format": fmt,
            "feed_title": feed_title,
            "feed_description": feed_description,
            "feed_link": feed_link,
            "last_build_date": last_build,
            "categories": sorted({c for c in category_terms if c})[:12],
            "items": items,
        },
        "",
    )


# ------------------------------------------------------------------ measure


def measure(parsed: dict, source: dict) -> dict:
    dated = sorted(
        (i for i in parsed["items"] if i["date"]),
        key=lambda i: i["date"],
        reverse=True,
    )

    newest = dated[0]["date"] if dated else None
    window_end = newest or datetime.now(timezone.utc)
    window_start = window_end - timedelta(days=WINDOW_DAYS)

    in_window = [i for i in dated if window_start <= i["date"] <= window_end]
    publishing_days = len({i["date"].date() for i in in_window})

    # A feed that publishes rarely may have no items inside the window at all.
    # Fall back to the whole archive rather than reporting zero.
    use_window = bool(in_window)
    effective = in_window if use_window else dated
    if use_window:
        effective_days = WINDOW_DAYS
    elif dated:
        effective_days = max(
            1, round((dated[0]["date"] - dated[-1]["date"]).total_seconds() / 86400) + 1
        )
    else:
        effective_days = WINDOW_DAYS

    items_per_day = len(effective) / effective_days if effective else 0.0
    full_text_count = sum(1 for i in effective if i["has_full_text"])

    headlines = [
        {
            "title": i["title"],
            "link": i["link"],
            "date": i["date"].date().isoformat() if i["date"] else None,
        }
        for i in effective[:HEADLINE_COUNT]
    ]

    # Median gap between consecutive posts, in hours. A mean gap is skewed by
    # one long holiday; the median describes the normal rhythm.
    gaps = sorted(
        (dated[i]["date"] - dated[i + 1]["date"]).total_seconds() / 3600
        for i in range(len(dated) - 1)
    )
    median_gap_hours = round(gaps[len(gaps) // 2]) if gaps else None

    title_lengths = [len(i["title"]) for i in effective if i["title"]]

    return {
        "slug": source["slug"],
        "feed_url": source["feed_url"],
        "site_url": source["site_url"],
        "publisher": source["publisher"],
        "category": source["category"],
        "tags": source["tags"],
        "format": parsed["format"],
        "feed_title": parsed["feed_title"] or source["name"],
        "feed_description": parsed["feed_description"],
        "feed_link": parsed["feed_link"] or source["site_url"],
        "last_build_date": parsed["last_build_date"],
        "category_terms": parsed["categories"],
        "carries_full_text": full_text_count > 0,
        "full_text_share": (
            round(full_text_count / len(effective) * 100) if effective else 0
        ),
        "items_in_feed": len(parsed["items"]),
        "items_in_window": len(in_window),
        "window_days": WINDOW_DAYS,
        "window_used": use_window,
        "items_per_day": round(items_per_day, 1),
        "items_per_week": round(items_per_day * 7, 1),
        "publishing_days": publishing_days,
        "publishing_day_share": round(publishing_days / WINDOW_DAYS * 100),
        "median_gap_hours": median_gap_hours,
        "avg_title_length": (
            round(sum(title_lengths) / len(title_lengths)) if title_lengths else 0
        ),
        "oldest_item": dated[-1]["date"].date().isoformat() if dated else None,
        "newest_item": newest.date().isoformat() if newest else None,
        "archive_span_days": (
            round((dated[0]["date"] - dated[-1]["date"]).total_seconds() / 86400)
            if len(dated) > 1
            else 0
        ),
        "headlines": headlines,
    }


# --------------------------------------------------------------------- main


def main() -> int:
    sources = json.loads(SOURCE_FILE.read_text(encoding="utf-8"))["feeds"]

    results: list[dict] = []
    failures: list[tuple[str, int, str]] = []

    def work(source: dict) -> None:
        status, body, _ctype = fetch(source["feed_url"])
        if status != 200 or not body:
            failures.append((source["slug"], status, "HTTP error" if status else "no response"))
            print(f"FAIL {source['slug']} ({status})", file=sys.stderr)
            return
        parsed, error = parse_feed(body)
        if parsed is None:
            failures.append((source["slug"], status, error))
            print(f"FAIL {source['slug']} {error}", file=sys.stderr)
            return
        results.append(measure(parsed, source))
        print(f"OK   {source['slug']}")

    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(work, sources))

    # Refuse to write a partial snapshot: a directory that silently loses
    # feeds is worse than one that fails loudly.
    if len(results) < len(sources) * 0.8:
        print(
            f"\nrefresh_feeds: only {len(results)}/{len(sources)} feeds responded. "
            "Refusing to write a partial snapshot.",
            file=sys.stderr,
        )
        return 1

    results.sort(key=lambda r: r["slug"])
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(
        json.dumps(
            {"checked_at": datetime.now(timezone.utc).isoformat(), "feeds": results},
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    note = (
        f" ({len(failures)} failed: {', '.join(slug for slug, _, _ in failures)})"
        if failures
        else ""
    )
    print(f"\nrefresh_feeds: wrote {len(results)} feeds to {OUT_FILE.relative_to(ROOT)}{note}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
