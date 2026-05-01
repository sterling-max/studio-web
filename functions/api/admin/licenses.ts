import { requireAdmin, type AdminEnv } from '../_shared/adminAuth';

type Env = AdminEnv & {
  DB: D1Database;
};

type ManualLicenseRequest = {
  email?: string;
  product_id?: string;
  founder_status?: boolean;
};

type LicenseActionRequest = {
  key?: string;
  action?: 'revoke' | 'restore';
  reason?: string;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim();
  const limit = clampNumber(url.searchParams.get('limit'), 1, 500, 200);
  const where = query
    ? `WHERE l.email LIKE ? OR l.key LIKE ? OR l.product_id LIKE ? OR l.status LIKE ?`
    : '';
  const bindValues = query ? Array(4).fill(`%${query}%`) : [];

  const rows = await env.DB.prepare(
    `SELECT
      l.key,
      l.email,
      l.product_id,
      l.order_id,
      l.transaction_id,
      l.founder_status,
      l.status,
      l.created_at,
      l.refunded_at,
      l.disputed_at,
      l.revoked_at,
      l.revocation_reason,
      COUNT(a.id) AS active_activations
    FROM licenses l
    LEFT JOIN activations a
      ON a.license_key = l.key
      AND COALESCE(a.status, 'active') = 'active'
    ${where}
    GROUP BY l.key
    ORDER BY l.created_at DESC
    LIMIT ?`
  ).bind(...bindValues, limit).all();

  return json({ success: true, licenses: rows.results });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const body = await request.json().catch(() => null) as ManualLicenseRequest | null;
  const email = body?.email?.trim().toLowerCase();
  const productId = body?.product_id?.trim() || 'mc_pro';
  const founderStatus = body?.founder_status ? 1 : 0;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, message: 'A valid email is required.' }, 400);
  }

  const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
  const key = `MC-PRO-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;
  const now = Date.now();
  const transactionId = `MANUAL-${uuid.substring(16, 28)}`;

  await env.DB.prepare(
    `INSERT INTO licenses
     (key, email, product_id, transaction_id, order_id, created_at, payload, founder_status, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    key,
    email,
    productId,
    transactionId,
    'MANUAL_ADMIN',
    now,
    JSON.stringify({
      email,
      product_id: productId,
      founder_status: Boolean(founderStatus),
      source: 'admin_manual',
      generated_at: now
    }),
    founderStatus,
    'active'
  ).run();

  return json({
    success: true,
    license: {
      key,
      email,
      product_id: productId,
      founder_status: founderStatus,
      status: 'active',
      created_at: now
    }
  });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const body = await request.json().catch(() => null) as LicenseActionRequest | null;
  const key = body?.key?.trim();
  const action = body?.action;
  const reason = body?.reason?.trim() || 'Manually revoked by administrator.';

  if (!key) {
    return json({ success: false, message: 'License key is required.' }, 400);
  }

  const existing = await env.DB.prepare(
    'SELECT key, status FROM licenses WHERE key = ?'
  ).bind(key).first<{ key: string; status: string }>();

  if (!existing) {
    return json({ success: false, message: 'License not found.' }, 404);
  }

  if (action === 'revoke') {
    const now = Date.now();
    await env.DB.prepare(
      `UPDATE licenses
       SET status = 'revoked', revoked_at = ?, revocation_reason = ?
       WHERE key = ?`
    ).bind(now, reason, key).run();

    await env.DB.prepare(
      `UPDATE activations
       SET status = 'revoked', deactivated_at = ?
       WHERE license_key = ? AND COALESCE(status, 'active') = 'active'`
    ).bind(now, key).run();

    return json({ success: true, key, status: 'revoked' });
  }

  if (action === 'restore') {
    await env.DB.prepare(
      `UPDATE licenses
       SET status = 'active', revoked_at = NULL, revocation_reason = NULL
       WHERE key = ?`
    ).bind(key).run();

    return json({ success: true, key, status: 'active' });
  }

  return json({ success: false, message: 'Unsupported license action.' }, 400);
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

function clampNumber(value: string | null, min: number, max: number, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}
