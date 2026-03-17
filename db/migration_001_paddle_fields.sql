-- Migration: Add Paddle Production Fields
ALTER TABLE licenses ADD COLUMN customer_id TEXT;
ALTER TABLE licenses ADD COLUMN transaction_id TEXT;
ALTER TABLE licenses ADD COLUMN price_id TEXT;
ALTER TABLE licenses ADD COLUMN founder_status INTEGER DEFAULT 0;
