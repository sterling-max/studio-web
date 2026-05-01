export type DownloadAnalyticsEnv = {
  DB?: D1Database;
  DOWNLOAD_ANALYTICS_SALT?: string;
};

export type DownloadEventInput = {
  productId: string;
  version: string;
  channel: string;
  platform?: string;
  arch?: string;
  fileAlias: string;
  artifactKey: string;
  artifactName: string;
  artifactSize?: number;
};

export async function recordDownloadEvent(
  request: Request,
  env: DownloadAnalyticsEnv,
  input: DownloadEventInput
): Promise<void> {
  if (!env.DB) return;

  const now = Date.now();
  const userAgent = request.headers.get('User-Agent') || '';
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const cf = request.cf || {};
  const country = typeof cf.country === 'string' ? cf.country : null;
  const colo = typeof cf.colo === 'string' ? cf.colo : null;

  await env.DB.prepare(
    `INSERT INTO download_events (
      id,
      product_id,
      version,
      channel,
      platform,
      arch,
      file_alias,
      artifact_key,
      artifact_name,
      artifact_size,
      country,
      colo,
      referrer,
      user_agent_hash,
      ip_hash,
      downloaded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    input.productId,
    normalizeVersion(input.version),
    input.channel,
    input.platform || null,
    input.arch || null,
    input.fileAlias,
    input.artifactKey,
    input.artifactName,
    input.artifactSize || null,
    country,
    colo,
    trimToNull(request.headers.get('Referer'), 500),
    userAgent ? await hashValue(userAgent, env.DOWNLOAD_ANALYTICS_SALT) : null,
    ip ? await hashValue(ip, env.DOWNLOAD_ANALYTICS_SALT) : null,
    now
  ).run();
}

export function normalizeVersion(version: string): string {
  return version.trim().replace(/^v/i, '');
}

async function hashValue(value: string, salt = ''): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${value}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function trimToNull(value: string | null, maxLength: number): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}
