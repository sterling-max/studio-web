import { json, textError, trimString } from './_shared/json';

type Env = {
  DB: D1Database;
  TURNSTILE_SECRET_KEY?: string;
  FEEDBACK_HASH_SALT?: string;
};

const VALID_TYPES = new Set(['bug', 'suggestion', 'feature', 'support']);
const VALID_SOURCES = new Set(['website', 'app']);
const TEN_MINUTES = 10 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return textError('Invalid JSON body.', 400);
  }

  const type = trimString(body.type, 32).toLowerCase();
  const title = trimString(body.title, 160);
  const message = trimString(body.message, 5000);
  const email = trimString(body.email, 254);
  const productId = trimString(body.product_id, 80) || null;
  const source = normalizeSource(body.source);
  const now = Date.now();

  if (trimString(body.company_website, 300)) {
    return json({ success: true, id: `fb_${crypto.randomUUID()}` });
  }

  if (!VALID_SOURCES.has(source)) return textError('Unsupported feedback source.', 400);
  if (!VALID_TYPES.has(type)) return textError('Unsupported feedback type.', 400);
  if (title.length < 3) return textError('Title is required.', 400);
  if (message.length < 10) return textError('Message must be at least 10 characters.', 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return textError('Email address is invalid.', 400);
  if (source === 'app' && !trimString(body.app_version, 40)) return textError('App version is required.', 400);
  if (countUrls(`${title}\n${message}`) > 3) return textError('Too many links in one submission.', 400);

  if (source === 'website') {
    const turnstileError = await verifyTurnstile(trimString(body.turnstile_token, 4096), request, env);
    if (turnstileError) return turnstileError;
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashText(`${env.FEEDBACK_HASH_SALT || 'sterling-feedback'}:${ip}`);
  const messageHash = await hashText(`${title.toLowerCase()}\n${message.toLowerCase()}`);
  const rateLimitError = await applyRateLimits(env.DB, ipHash, now);
  if (rateLimitError) return rateLimitError;

  const duplicate = await env.DB.prepare(
    `SELECT id FROM feedback_items
     WHERE ip_hash = ? AND message_hash = ? AND created_at >= ?
     LIMIT 1`
  ).bind(ipHash, messageHash, now - 60 * 60 * 1000).first<{ id: string }>();

  if (duplicate) return textError('This feedback was already received recently.', 429);

  const id = `fb_${crypto.randomUUID()}`;

  await env.DB.prepare(
    `INSERT INTO feedback_items (
      id, product_id, source, type, title, message, email, contact_allowed,
      app_version, platform, build_channel, license_tier, status, ip_hash,
      message_hash, spam_reason, user_agent,
      country, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    productId,
    source,
    type,
    title,
    message,
    email || null,
    body.contact_allowed ? 1 : 0,
    trimString(body.app_version, 40) || null,
    trimString(body.platform, 80) || null,
    trimString(body.build_channel, 40) || null,
    trimString(body.license_tier, 40) || null,
    ipHash,
    messageHash,
    null,
    trimString(request.headers.get('User-Agent'), 500) || null,
    (request.cf?.country as string | undefined) || null,
    now,
    now
  ).run();

  return json({ success: true, id });
};

function normalizeSource(value: unknown): string {
  const source = trimString(value, 32).toLowerCase();
  return source || 'website';
}

async function verifyTurnstile(token: string, request: Request, env: Env): Promise<Response | null> {
  if (!env.TURNSTILE_SECRET_KEY) return textError('Feedback protection is not configured.', 503);
  if (!token) return textError('Verification is required.', 400);

  const form = new FormData();
  form.set('secret', env.TURNSTILE_SECRET_KEY);
  form.set('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.set('remoteip', ip);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form
  });
  const payload = await response.json().catch(() => null) as { success?: boolean } | null;

  return payload?.success ? null : textError('Verification failed.', 400);
}

async function applyRateLimits(db: D1Database, ipHash: string, now: number): Promise<Response | null> {
  const windows = [
    { label: '10m', span: TEN_MINUTES, limit: 5 },
    { label: '24h', span: DAY, limit: 20 }
  ];

  for (const window of windows) {
    const windowStart = Math.floor(now / window.span) * window.span;
    const key = `${ipHash}:${window.label}:${windowStart}`;
    const result = await db.prepare(
      `INSERT INTO feedback_rate_limits (key, count, window_start, updated_at)
       VALUES (?, 1, ?, ?)
       ON CONFLICT(key) DO UPDATE SET
         count = count + 1,
         updated_at = excluded.updated_at
       RETURNING count`
    ).bind(key, windowStart, now).first<{ count: number }>();

    if (Number(result?.count || 0) > window.limit) {
      return textError('Too many feedback submissions. Please try again later.', 429);
    }
  }

  return null;
}

async function hashText(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function countUrls(value: string): number {
  return (value.match(/https?:\/\/|www\./gi) || []).length;
}
