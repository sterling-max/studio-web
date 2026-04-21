export const ENTITLEMENT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const ENTITLEMENT_REFRESH_AFTER_MS = 24 * 60 * 60 * 1000;

export type LicenseStatus = 'active' | 'refunded' | 'disputed' | 'revoked';

export type LicenseRecord = {
  key: string;
  email: string;
  product_id: string;
  status?: LicenseStatus | null;
  founder_status?: number | null;
};

export type EntitlementPayload = {
  email: string;
  product_id: string;
  license_key: string;
  machine_id: string;
  machine_name: string;
  plan: 'founder' | 'standard';
  activated_at: number;
  issued_at: number;
  refresh_after: number;
  valid_until: number;
};

export function isLicenseUsable(license: Pick<LicenseRecord, 'status'>): boolean {
  return !license.status || license.status === 'active';
}

export function blockedLicenseMessage(status?: LicenseStatus | null): string {
  if (status === 'refunded') {
    return 'This license was refunded and is no longer active.';
  }

  if (status === 'disputed') {
    return 'This license is temporarily suspended while the payment dispute is reviewed.';
  }

  return 'This license is no longer active.';
}

export async function createSignedEntitlement(
  payload: EntitlementPayload,
  privateKeyHex: string
): Promise<string> {
  const payloadStr = JSON.stringify(payload);
  const payloadBytes = new TextEncoder().encode(payloadStr);
  const signature = await signPayload(payloadStr, privateKeyHex);

  return JSON.stringify({
    version: 2,
    payload: base64Encode(payloadBytes),
    signature
  });
}

async function signPayload(payload: string, privateKeyHex: string): Promise<string> {
  const data = new TextEncoder().encode(payload);
  const seed = hexToBytes(privateKeyHex);

  if (!seed || seed.length !== 32) {
    throw new Error('MASTER_PRIVATE_KEY must be a 32-byte hex Ed25519 seed');
  }

  const pkcs8Header = new Uint8Array([
    0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20
  ]);
  const pkcs8 = new Uint8Array(pkcs8Header.length + seed.length);
  pkcs8.set(pkcs8Header);
  pkcs8.set(seed, pkcs8Header.length);

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pkcs8,
    { name: 'Ed25519', namedCurve: 'Ed25519' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign({ name: 'Ed25519' }, key, data);

  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function base64Encode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}
