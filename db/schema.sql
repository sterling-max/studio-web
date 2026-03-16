-- Licensing Tables
CREATE TABLE IF NOT EXISTS licenses (
    key TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    order_id TEXT, -- Paddle Order ID
    created_at INTEGER NOT NULL,
    payload TEXT NOT NULL -- The base payload signed by master key
);

CREATE TABLE IF NOT EXISTS activations (
    id TEXT PRIMARY KEY,
    license_key TEXT NOT NULL,
    machine_id TEXT NOT NULL,
    machine_name TEXT,
    activated_at INTEGER NOT NULL,
    FOREIGN KEY (license_key) REFERENCES licenses(key)
);

CREATE TABLE IF NOT EXISTS recovery_tokens (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL
);
