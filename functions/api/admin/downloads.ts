import { requireAdmin, type AdminEnv } from '../_shared/adminAuth';

type Env = AdminEnv & {
  DB: D1Database;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const url = new URL(request.url);
  const days = clampNumber(url.searchParams.get('days'), 1, 365, 30);
  const product = url.searchParams.get('product')?.trim() || null;
  const since = Date.now() - days * 24 * 60 * 60 * 1000;

  const productFilter = product ? 'AND product_id = ?' : '';
  const bindProduct = product ? [product] : [];

  const totals = await env.DB.prepare(
    `SELECT
      product_id,
      version,
      channel,
      COUNT(*) AS downloads,
      COUNT(DISTINCT ip_hash) AS unique_networks,
      SUM(COALESCE(artifact_size, 0)) AS bytes
    FROM download_events
    WHERE downloaded_at >= ? ${productFilter}
    GROUP BY product_id, version, channel
    ORDER BY downloads DESC`
  ).bind(since, ...bindProduct).all();

  const daily = await env.DB.prepare(
    `SELECT
      date(downloaded_at / 1000, 'unixepoch') AS day,
      product_id,
      version,
      channel,
      COUNT(*) AS downloads
    FROM download_events
    WHERE downloaded_at >= ? ${productFilter}
    GROUP BY day, product_id, version, channel
    ORDER BY day DESC, downloads DESC`
  ).bind(since, ...bindProduct).all();

  const countries = await env.DB.prepare(
    `SELECT
      COALESCE(country, 'Unknown') AS country,
      product_id,
      COUNT(*) AS downloads
    FROM download_events
    WHERE downloaded_at >= ? ${productFilter}
    GROUP BY country, product_id
    ORDER BY downloads DESC
    LIMIT 100`
  ).bind(since, ...bindProduct).all();

  const recent = await env.DB.prepare(
    `SELECT
      product_id,
      version,
      channel,
      file_alias,
      artifact_name,
      country,
      colo,
      downloaded_at
    FROM download_events
    WHERE downloaded_at >= ? ${productFilter}
    ORDER BY downloaded_at DESC
    LIMIT 50`
  ).bind(since, ...bindProduct).all();

  return new Response(JSON.stringify({
    success: true,
    range: { days, since },
    product,
    totals: totals.results,
    daily: daily.results,
    countries: countries.results,
    recent: recent.results
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
};

function clampNumber(value: string | null, min: number, max: number, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}
