import { requireAdmin, type AdminEnv } from '../_shared/adminAuth';
import { json, textError, trimString } from '../_shared/json';

type Env = AdminEnv & {
  DB: D1Database;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const result = await env.DB.prepare(
    `SELECT id, product_id, name, version, min_app_version, description, permissions,
      pro_only, enabled, changelog, artifact_key, package_url, created_at, updated_at
     FROM plugin_catalog
     ORDER BY product_id, name COLLATE NOCASE`
  ).all();

  return json({
    success: true,
    plugins: result.results.map((row: any) => ({
      ...row,
      permissions: parsePermissions(row.permissions),
      pro_only: Boolean(row.pro_only),
      enabled: Boolean(row.enabled)
    }))
  });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const body: any = await request.json().catch(() => null);
  if (!body) return textError('Invalid JSON body.', 400);

  const now = Date.now();
  const id = slug(trimString(body.id, 80));
  const name = trimString(body.name, 120);
  const version = trimString(body.version, 40);
  const productId = slug(trimString(body.product_id, 80) || 'max-commander');
  const description = trimString(body.description, 1200);

  if (!id) return textError('Plugin id is required.', 400);
  if (!name) return textError('Plugin name is required.', 400);
  if (!version) return textError('Plugin version is required.', 400);
  if (!description) return textError('Plugin description is required.', 400);

  const permissions = normalizePermissions(body.permissions);

  await env.DB.prepare(
    `INSERT INTO plugin_catalog (
      id, product_id, name, version, min_app_version, description, permissions,
      pro_only, enabled, changelog, artifact_key, package_url, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      product_id = excluded.product_id,
      name = excluded.name,
      version = excluded.version,
      min_app_version = excluded.min_app_version,
      description = excluded.description,
      permissions = excluded.permissions,
      pro_only = excluded.pro_only,
      enabled = excluded.enabled,
      changelog = excluded.changelog,
      artifact_key = COALESCE(excluded.artifact_key, plugin_catalog.artifact_key),
      package_url = excluded.package_url,
      updated_at = excluded.updated_at`
  ).bind(
    id,
    productId,
    name,
    version,
    trimString(body.min_app_version, 40) || null,
    description,
    JSON.stringify(permissions),
    body.pro_only === false ? 0 : 1,
    body.enabled === false ? 0 : 1,
    trimString(body.changelog, 2000) || null,
    trimString(body.artifact_key, 500) || null,
    trimString(body.package_url, 500) || null,
    now,
    now
  ).run();

  return json({ success: true, id });
};

function normalizePermissions(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map(v => v.trim()).filter(Boolean);
  return String(value || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
}

function parsePermissions(value: unknown): string[] {
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
}
