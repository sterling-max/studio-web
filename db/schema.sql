-- Licensing Tables
CREATE TABLE IF NOT EXISTS licenses (
    key TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    order_id TEXT, -- Merchant of Record order ID
    customer_id TEXT,
    transaction_id TEXT,
    price_id TEXT,
    founder_status INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    refunded_at INTEGER,
    disputed_at INTEGER,
    revoked_at INTEGER,
    revocation_reason TEXT,
    created_at INTEGER NOT NULL,
    payload TEXT NOT NULL -- The base payload signed by master key
);

CREATE TABLE IF NOT EXISTS activations (
    id TEXT PRIMARY KEY,
    license_key TEXT NOT NULL,
    machine_id TEXT NOT NULL,
    machine_name TEXT,
    activated_at INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    deactivated_at INTEGER,
    last_validated_at INTEGER,
    entitlement_expires_at INTEGER,
    FOREIGN KEY (license_key) REFERENCES licenses(key)
);

CREATE TABLE IF NOT EXISTS recovery_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL
);
