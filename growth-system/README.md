# Continuous Autonomous Growth System — Curated Feeds

A persistent SEO and user-acquisition system for [Curated Feeds](https://curatedfeeds.web.app/) that operates in a continuous 8-stage loop.

## Overview

This system implements the continuous autonomous growth loop as specified in the mission:

1. **Discover** - Find new directories, software listings, editorial pages, communities
2. **Validate** - Verify domains, submission pages, relevance, pricing, policies
3. **Prioritize** - Score candidates on relevance, traffic potential, editorial quality, DR, ease of submission
4. **Execute** - Submit to approved free opportunities with accurate, unique descriptions
5. **Improve Organic Search** - Analyze keywords, recommend content, optimize pages
6. **Improve Conversions** - Inspect visitor journey, recommend CTA improvements, track real installs
7. **Measure Outcomes** - Record organic/referral traffic, conversions, cost per acquisition
8. **Continue** - Save state, update statuses, generate next task queue

## Architecture

```
growth-system/
├── growth.db              # SQLite database (persistent state)
├── schema.sql             # Database schema
├── growth_engine.py       # Core 8-stage engine
├── scheduler.py           # Scheduler and reporting
├── README.md              # This file
└── logs/                  # Cycle logs (created at runtime)
```

## Database Schema

The system maintains separate tables for:
- `candidate_domains` - Discovered domains and their metadata
- `submission_opportunities` - Specific submission pages/forms
- `submitted_links` - Tracking of submitted links
- `verified_backlinks` - Confirmed published backlinks
- `keywords` - Keyword research data
- `content_ideas` - Content recommendations
- `referring_domain_traffic` - Traffic by referring domain
- `conversion_events` - CTA clicks, downloads, installs, activations
- `errors_and_approvals` - Errors, blockers, pending approvals
- `reports` - Daily/weekly performance reports
- `system_state` - Scheduling and cycle state

## Installation

```bash
cd growth-system
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt  # (if any dependencies added)
```

## Usage

### Run a single cycle
```bash
python3 scheduler.py --mode once
```

### Run continuously (every 60 minutes)
```bash
python3 scheduler.py --mode continuous --interval 60
```

### Run continuously with max cycles
```bash
python3 scheduler.py --mode continuous --interval 60 --max-cycles 24
```

### Generate daily report
```bash
python3 scheduler.py --mode report --report-type daily
```

### Generate weekly report
```bash
python3 scheduler.py --mode report --report-type weekly
```

## Configuration

Key configuration constants in `growth_engine.py`:
- `MAX_RUNTIME_SECONDS = 3600` - Max 1 hour per cycle
- `BUDGET_LIMIT_USD = 50.0` - Max spend per cycle
- `MIN_QUALITY_SCORE = 40` - Minimum priority score to execute

## Data Sources

The system uses existing research data from:
- `../seo-research/backlink_database.csv` - 85 candidate domains
- `../seo-research/keyword_database.csv` - 78 keywords
- `../seo-research/submission_log.csv` - 30 submission records
- `../seo-research/content_recommendations.md` - Content ideas

## Stop Conditions

The system pauses when:
- Runtime limit reached (1 hour)
- Repeated browser/API failures
- Website prohibits action
- Security concern detected
- Human approval required (>10 pending)
- Next tasks predominantly low quality

## Reporting

- **Daily Summary**: New opportunities, submissions, live links, keywords, traffic
- **Weekly Performance**: Aggregated metrics, trends, cost per acquisition
- **Separate Metrics**: Research volume, published backlinks, indexed backlinks, acquired users

## Ethical Guidelines

The system follows strict ethical guidelines:
- ✅ Only legitimate free submissions
- ✅ No fake identities or reviews
- ✅ No link buying or automated networks
- ✅ Respects CAPTCHA, rate limits, access controls
- ✅ Records requirements needing human approval
- ✅ Never manufactures links to satisfy counters

## Monitoring

Check system health:
```bash
# View recent cycles
sqlite3 growth.db "SELECT * FROM system_state;"

# View errors
sqlite3 growth.db "SELECT * FROM errors_and_approvals WHERE status = 'open';"

# View pending approvals
sqlite3 growth.db "SELECT * FROM errors_and_approvals WHERE type = 'approval_required';"
```

## Production Deployment

For production, set up as a systemd service:

```ini
# /etc/systemd/system/curated-feeds-growth.service
[Unit]
Description=Curated Feeds Growth System
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/growth-system
ExecStart=/path/to/growth-system/venv/bin/python scheduler.py --mode continuous --interval 60
Restart=always
RestartSec=300

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable curated-feeds-growth
sudo systemctl start curated-feeds-growth
sudo journalctl -u curated-feeds-growth -f
```

## Integration with Website

The growth system integrates with the Curated Feeds website by:
- Using the same SEO data (`../app/lib/seo.ts`)
- Tracking conversions via Firebase Analytics events
- Monitoring referral traffic from published backlinks
- Recommending content improvements for existing pages

## Next Steps

1. **Connect Analytics**: Integrate Firebase Analytics / GA4 for real traffic data
2. **Browser Automation**: Add Playwright for actual form submissions
3. **Search API**: Add SerpAPI or similar for keyword research
4. **DR Verification**: Add Ahrefs/Moz API for verified Domain Ratings
5. **Email Notifications**: Alert on approvals needed, critical errors
6. **Dashboard**: Build a simple web UI for monitoring

## License

MIT License - Part of Curated Feeds project.
