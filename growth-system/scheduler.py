#!/usr/bin/env python3
"""
Scheduler for the Continuous Autonomous Growth System.
Runs growth cycles at configurable intervals.
"""

import argparse
import time
import sys
from datetime import datetime, timedelta
from pathlib import Path
import sqlite3

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from growth_engine import GrowthEngine

def run_once():
    """Run a single growth cycle."""
    engine = GrowthEngine()
    try:
        engine.run_cycle()
    finally:
        engine.close()

def run_continuous(interval_minutes: int = 60, max_cycles: int = 0):
    """Run continuous growth cycles at specified interval."""
    print(f"Starting continuous growth system (interval: {interval_minutes}m, max_cycles: {max_cycles or 'unlimited'})")
    
    cycle_count = 0
    while True:
        cycle_count += 1
        print(f"\n{'='*60}")
        print(f"CYCLE {cycle_count} - {datetime.now().isoformat()}")
        print(f"{'='*60}\n")
        
        try:
            run_once()
        except Exception as e:
            print(f"Cycle {cycle_count} failed: {e}")
            
        if max_cycles > 0 and cycle_count >= max_cycles:
            print(f"\nReached max cycles ({max_cycles}). Stopping.")
            break
            
        print(f"\nWaiting {interval_minutes} minutes until next cycle...")
        time.sleep(interval_minutes * 60)

def generate_report(report_type: str = 'daily'):
    """Generate a report."""
    conn = sqlite3.connect('/run/media/adam/New Volume/Curated Feeds/curated-feeds-landing/growth-system/growth.db')
    cursor = conn.cursor()
    
    if report_type == 'daily':
        # Get today's report
        today = datetime.now().strftime('%Y%m%d')
        report_id = f"RPT-{today}"
        
        cursor.execute('''
            SELECT * FROM reports WHERE id = ?
        ''', (report_id,))
        report = cursor.fetchone()
        
        if report:
            print(f"\n{'='*60}")
            print(f"DAILY GROWTH REPORT - {datetime.now().strftime('%Y-%m-%d')}")
            print(f"{'='*60}\n")
            
            # Get current stats
            cursor.execute('SELECT COUNT(*) FROM candidate_domains WHERE priority = "P1"')
            p1_count = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(*) FROM candidate_domains WHERE submission_status = "pending"')
            pending_count = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(*) FROM submission_opportunities WHERE status = "approved"')
            approved_count = cursor.fetchone()[0]
            
            cursor.execute('SELECT COUNT(*) FROM submitted_links WHERE verification_status = "verified"')
            verified_count = cursor.fetchone()[0]
            
            print(f"New opportunities discovered: {report[7] if report else 0}")
            print(f"Approved submissions: {report[8] if report else 0}")
            print(f"Live backlinks verified: {verified_count}")
            print(f"Keyword opportunities: {report[10] if report else 0}")
            print(f"\nQueue status:")
            print(f"  P1 candidates: {p1_count}")
            print(f"  Pending submissions: {pending_count}")
            print(f"  Approved opportunities: {approved_count}")
            print(f"\nCycle summary: {report[17] if report else 'No report yet'}")
        else:
            print("No daily report found. Run a growth cycle first.")
            
    elif report_type == 'weekly':
        # Get weekly stats
        week_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
        
        cursor.execute('''
            SELECT 
                SUM(new_opportunities_discovered) as total_discovered,
                SUM(approved_submissions) as total_submitted,
                SUM(live_links_verified) as total_verified,
                SUM(organic_clicks) as total_clicks,
                SUM(referral_sessions) as total_referrals,
                SUM(activated_users) as total_activated
            FROM reports
            WHERE period_start >= ?
        ''', (week_ago,))
        
        row = cursor.fetchone()
        print(f"\n{'='*60}")
        print(f"WEEKLY GROWTH REPORT - {week_ago} to {datetime.now().strftime('%Y-%m-%d')}")
        print(f"{'='*60}\n")
        print(f"Total opportunities discovered: {row[0] or 0}")
        print(f"Total submissions completed: {row[1] or 0}")
        print(f"Total live backlinks verified: {row[2] or 0}")
        print(f"Total organic clicks: {row[3] or 0}")
        print(f"Total referral sessions: {row[4] or 0}")
        print(f"Total activated users: {row[5] or 0}")
        
    conn.close()

def main():
    parser = argparse.ArgumentParser(description='Curated Feeds Growth System Scheduler')
    parser.add_argument('--mode', choices=['once', 'continuous', 'report'], default='once',
                        help='Run mode: once (single cycle), continuous (repeated cycles), report (generate report)')
    parser.add_argument('--interval', type=int, default=60,
                        help='Interval in minutes between cycles (for continuous mode)')
    parser.add_argument('--max-cycles', type=int, default=0,
                        help='Maximum number of cycles (0 = unlimited)')
    parser.add_argument('--report-type', choices=['daily', 'weekly'], default='daily',
                        help='Type of report to generate')
    
    args = parser.parse_args()
    
    if args.mode == 'once':
        run_once()
    elif args.mode == 'continuous':
        run_continuous(args.interval, args.max_cycles)
    elif args.mode == 'report':
        generate_report(args.report_type)

if __name__ == '__main__':
    main()
