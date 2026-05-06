-- Product-agnostic support feedback and official plugin catalog
CREATE TABLE IF NOT EXISTS feedback_items (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    source TEXT NOT NULL DEFAULT 'website',
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    email TEXT,
    contact_allowed INTEGER NOT NULL DEFAULT 0,
    app_version TEXT,
    platform TEXT,
    build_channel TEXT,
    license_tier TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    target_version TEXT,
    fixed_in_version TEXT,
    ip_hash TEXT,
    message_hash TEXT,
    spam_reason TEXT,
    user_agent TEXT,
    country TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_feedback_product_status_time
    ON feedback_items (product_id, status, created_at);

CREATE INDEX IF NOT EXISTS idx_feedback_ip_message_time
    ON feedback_items (ip_hash, message_hash, created_at);

CREATE TABLE IF NOT EXISTS feedback_rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL,
    window_start INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_feedback_rate_limits_updated
    ON feedback_rate_limits (updated_at);

CREATE TABLE IF NOT EXISTS plugin_catalog (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    min_app_version TEXT,
    description TEXT NOT NULL,
    permissions TEXT NOT NULL DEFAULT '[]',
    pro_only INTEGER NOT NULL DEFAULT 1,
    enabled INTEGER NOT NULL DEFAULT 1,
    changelog TEXT,
    artifact_key TEXT,
    package_url TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plugin_catalog_product_enabled
    ON plugin_catalog (product_id, enabled, name);

INSERT OR IGNORE INTO plugin_catalog (
    id, product_id, name, version, min_app_version, description, permissions,
    pro_only, enabled, changelog, artifact_key, package_url, created_at, updated_at
) VALUES
    ('jellyfin', 'max-commander', 'Jellyfin', '1.0.0', '0.8.10', 'Browse and stream Jellyfin libraries as a Max Commander virtual filesystem.', '["filesystem.read","network.http","media.openVideo"]', 1, 1, 'Initial official catalog entry.', 'mc/plugins/jellyfin.mcx', NULL, strftime('%s','now') * 1000, strftime('%s','now') * 1000),
    ('steam-library', 'max-commander', 'Steam Library', '1.0.0', '0.8.10', 'Browse installed Steam games, tools, workshop content, and library drives.', '["filesystem.read","files.execute","commands.palette"]', 1, 1, 'Initial official catalog entry.', 'mc/plugins/steam-library.mcx', NULL, strftime('%s','now') * 1000, strftime('%s','now') * 1000),
    ('sample-fs', 'max-commander', 'Sample Filesystem', '1.0.0', '0.8.10', 'Reference filesystem plugin for developers building virtual panels.', '["filesystem.read"]', 1, 1, 'Initial official catalog entry.', 'mc/plugins/sample-fs.mcx', NULL, strftime('%s','now') * 1000, strftime('%s','now') * 1000),
    ('sample-tool', 'max-commander', 'Sample Tool', '1.0.0', '0.8.10', 'Reference tool plugin for commands, dashboard UI, and background tasks.', '["commands.palette","ui.dashboard"]', 1, 1, 'Initial official catalog entry.', 'mc/plugins/sample-tool.mcx', NULL, strftime('%s','now') * 1000, strftime('%s','now') * 1000);
