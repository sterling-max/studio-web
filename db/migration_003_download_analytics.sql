-- Download analytics tables
CREATE TABLE IF NOT EXISTS download_events (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    version TEXT NOT NULL,
    channel TEXT NOT NULL,
    platform TEXT,
    arch TEXT,
    file_alias TEXT NOT NULL,
    artifact_key TEXT NOT NULL,
    artifact_name TEXT NOT NULL,
    artifact_size INTEGER,
    country TEXT,
    colo TEXT,
    referrer TEXT,
    user_agent_hash TEXT,
    ip_hash TEXT,
    downloaded_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_download_events_product_time
    ON download_events (product_id, downloaded_at);

CREATE INDEX IF NOT EXISTS idx_download_events_version_time
    ON download_events (version, downloaded_at);

CREATE INDEX IF NOT EXISTS idx_download_events_product_version_channel
    ON download_events (product_id, version, channel);
