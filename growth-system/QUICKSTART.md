# Quick Start Guide — Continuous Autonomous Growth System

## What's Built

A complete 8-stage SEO and user-acquisition system for Curated Feeds that:
- Discovers new backlink opportunities
- Validates domains and submission requirements
- Prioritizes opportunities by score
- Executes legitimate submissions
- Improves organic search
- Optimizes conversions
- Measures outcomes
- Continues the cycle automatically

## Quick Commands

```bash
cd growth-system

# Run one growth cycle
python3 scheduler.py --mode once

# Run continuously (every 60 minutes)
python3 scheduler.py --mode continuous --interval 60

# Generate daily report
python3 scheduler.py --mode report --report-type daily

# Generate weekly report
python3 scheduler.py --mode report --report-type weekly

# Check system health
python3 -c "
import sqlite3
conn = sqlite3.connect('growth.db')
c = conn.cursor()
c.execute('SELECT COUNT(*) FROM candidate_domains')
print(f'Total domains: {c.fetchone()[0]}')
c.execute('SELECT COUNT(*) FROM verified_backlinks')
print(f'Verified backlinks: {c.fetchone()[0]}')
c.execute('SELECT COUNT(*) FROM submission_opportunities WHERE status=\"approved\"')
print(f'Approved submissions: {c.fetchone()[0]}')
conn.close()
"
```

## Database Location

`growth-system/growth.db`

## Key Tables

| Table | Purpose |
|-------|---------|
| `candidate_domains` | All discovered domains with metadata |
| `submission_opportunities` | Specific submission pages/forms |
| `submitted_links` | Tracking of submitted links |
| `verified_backlinks` | Confirmed published backlinks |
| `keywords` | Keyword research data |
| `content_ideas` | Content recommendations |
| `reports` | Daily/weekly performance reports |

## Current Status

- **88 domains** discovered and tracked
- **5 verified backlinks** published
- **22 P2 candidates** ready for submission
- **1 approved opportunity** ready to execute
- **78 keywords** tracked for SEO
- **20 content ideas** planned

## Next Actions

1. **Submit to rss.mobi** - No account required, P2 priority
2. **Submit to github.com (awesome lists)** - Requires GitHub account
3. **Create "RSS reader for Android" landing page** - High commercial intent
4. **Add first-run analytics** - Track actual app installations

## Files

```
growth-system/
├── growth.db              # Database
├── growth_engine.py       # Core engine
├── scheduler.py           # Scheduler
├── README.md              # Full documentation
├── QUICKSTART.md          # This file
├── daily-summary.md       # Latest daily report
├── weekly-report-template.md
├── SYSTEM_SUMMARY.md
└── schema.sql             # Database schema
```

## Integration Points

- Uses existing SEO data from `../seo-research/`
- Compatible with Firebase Analytics
- Aligns with existing website structure
- Uses same SEO metadata from `../app/lib/seo.ts`

## Ethical Compliance

✅ No fake identities or reviews
✅ No link buying or automated networks
✅ Respects all site rules and controls
✅ Only legitimate free submissions
✅ Never manufactures data

## Production Deployment

For continuous operation, create a systemd service:

```bash
# Create service file
sudo nano /etc/systemd/system/curated-feeds-growth.service

# Then:
sudo systemctl daemon-reload
sudo systemctl enable curated-feeds-growth
sudo systemctl start curated-feeds-growth
sudo journalctl -u curated-feeds-growth -f
```

## Need Help?

Check `README.md` for full documentation or `SYSTEM_SUMMARY.md` for implementation details.
