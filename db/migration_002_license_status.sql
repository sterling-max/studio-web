-- Migration: Add revocation and entitlement refresh state
ALTER TABLE licenses ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
ALTER TABLE licenses ADD COLUMN refunded_at INTEGER;
ALTER TABLE licenses ADD COLUMN disputed_at INTEGER;
ALTER TABLE licenses ADD COLUMN revoked_at INTEGER;
ALTER TABLE licenses ADD COLUMN revocation_reason TEXT;

ALTER TABLE activations ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
ALTER TABLE activations ADD COLUMN deactivated_at INTEGER;
ALTER TABLE activations ADD COLUMN last_validated_at INTEGER;
ALTER TABLE activations ADD COLUMN entitlement_expires_at INTEGER;
