-- Growth System Database Schema
-- Persistent storage for SEO and user-acquisition system

-- Candidate domains discovered during research
CREATE TABLE IF NOT EXISTS candidate_domains (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL UNIQUE,
    normalized_domain TEXT NOT NULL,
    submission_url TEXT,
    dr INTEGER,
    dr_source TEXT,
    dr_verified BOOLEAN DEFAULT FALSE,
    category TEXT,
    relevance_score INTEGER,
    account_required BOOLEAN,
    cost TEXT,
    reciprocal_link_required BOOLEAN,
    link_type TEXT,
    submission_status TEXT DEFAULT 'discovered',
    published_url TEXT,
    anchor_text TEXT,
    date_discovered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_checked TIMESTAMP,
    evidence TEXT,
    notes TEXT,
    priority TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submission opportunities (specific submission pages/forms)
CREATE TABLE IF NOT EXISTS submission_opportunities (
    id TEXT PRIMARY KEY,
    candidate_domain_id TEXT REFERENCES candidate_domains(id),
    submission_url TEXT NOT NULL,
    form_type TEXT,
    api_endpoint TEXT,
    api_method TEXT,
    api_payload_template TEXT,
    form_fields TEXT,
    requires_account BOOLEAN,
    account_type TEXT,
    cost_amount REAL DEFAULT 0,
    cost_currency TEXT DEFAULT 'USD',
    reciprocal_required BOOLEAN DEFAULT FALSE,
    link_type TEXT,
    estimated_dr INTEGER,
    editorial_quality INTEGER,
    traffic_potential INTEGER,
    ease_of_submission INTEGER,
    status TEXT DEFAULT 'pending',
    rejection_reason TEXT,
    approved_by TEXT,
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submitted links tracking
CREATE TABLE IF NOT EXISTS submitted_links (
    id TEXT PRIMARY KEY,
    opportunity_id TEXT REFERENCES submission_opportunities(id),
    candidate_domain_id TEXT REFERENCES candidate_domains(id),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submission_method TEXT,
    submission_payload TEXT,
    response_status INTEGER,
    response_body TEXT,
    published_url TEXT,
    anchor_text_used TEXT,
    verification_date TIMESTAMP,
    verification_status TEXT,
    verification_method TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verified published backlinks
CREATE TABLE IF NOT EXISTS verified_backlinks (
    id TEXT PRIMARY KEY,
    submitted_link_id TEXT REFERENCES submitted_links(id),
    candidate_domain_id TEXT REFERENCES candidate_domains(id),
    source_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    anchor_text TEXT,
    link_type TEXT,
    dr_at_verification INTEGER,
    traffic_estimate INTEGER,
    first_verified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_verified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Keywords research
CREATE TABLE IF NOT EXISTS keywords (
    id TEXT PRIMARY KEY,
    keyword TEXT NOT NULL,
    keyword_group TEXT,
    search_intent TEXT,
    audience TEXT,
    estimated_difficulty TEXT,
    priority TEXT,
    search_volume INTEGER,
    cpc REAL,
    current_rank INTEGER,
    target_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content ideas
CREATE TABLE IF NOT EXISTS content_ideas (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content_type TEXT,
    target_keywords TEXT,
    target_audience TEXT,
    estimated_effort TEXT,
    priority TEXT,
    status TEXT DEFAULT 'idea',
    assigned_to TEXT,
    target_url TEXT,
    published_url TEXT,
    published_date TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referring domain traffic
CREATE TABLE IF NOT EXISTS referring_domain_traffic (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    date DATE NOT NULL,
    sessions INTEGER DEFAULT 0,
    engaged_sessions INTEGER DEFAULT 0,
    avg_engagement_time REAL,
    conversions INTEGER DEFAULT 0,
    conversion_rate REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(domain, date)
);

-- Conversion events
CREATE TABLE IF NOT EXISTS conversion_events (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    source_domain TEXT,
    source_medium TEXT,
    source_campaign TEXT,
    user_id TEXT,
    session_id TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT,
    verified BOOLEAN DEFAULT FALSE
);

-- Errors and pending approvals
CREATE TABLE IF NOT EXISTS errors_and_approvals (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    severity TEXT,
    title TEXT NOT NULL,
    description TEXT,
    related_table TEXT,
    related_id TEXT,
    status TEXT DEFAULT 'open',
    assigned_to TEXT,
    resolution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Daily/weekly reports
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    report_type TEXT NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    new_opportunities_discovered INTEGER DEFAULT 0,
    approved_submissions INTEGER DEFAULT 0,
    live_links_verified INTEGER DEFAULT 0,
    keyword_opportunities INTEGER DEFAULT 0,
    organic_clicks INTEGER DEFAULT 0,
    organic_impressions INTEGER DEFAULT 0,
    referral_sessions INTEGER DEFAULT 0,
    engaged_sessions INTEGER DEFAULT 0,
    cta_clicks INTEGER DEFAULT 0,
    download_events INTEGER DEFAULT 0,
    install_events INTEGER DEFAULT 0,
    activated_users INTEGER DEFAULT 0,
    cost_per_acquired_user REAL,
    agent_time_hours REAL,
    summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System state and scheduling
CREATE TABLE IF NOT EXISTS system_state (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_candidate_domains_priority ON candidate_domains(priority);
CREATE INDEX IF NOT EXISTS idx_candidate_domains_status ON candidate_domains(submission_status);
CREATE INDEX IF NOT EXISTS idx_submission_opportunities_status ON submission_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_submitted_links_verification ON submitted_links(verification_status);
CREATE INDEX IF NOT EXISTS idx_verified_backlinks_status ON verified_backlinks(status);
CREATE INDEX IF NOT EXISTS idx_keywords_priority ON keywords(priority);
CREATE INDEX IF NOT EXISTS idx_content_ideas_status ON content_ideas(status);
CREATE INDEX IF NOT EXISTS idx_referring_traffic_date ON referring_domain_traffic(date);
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_errors_status ON errors_and_approvals(status);
