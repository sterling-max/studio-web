import { json } from './_shared/json';

type Env = {
  DB: D1Database;
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const productId = url.searchParams.get('product_id')?.trim() || 'max-commander';

  const result = await env.DB.prepare(
    `SELECT id, product_id, name, version, min_app_version, description, permissions,
      pro_only, enabled, changelog,
      CASE
        WHEN package_url IS NOT NULL AND package_url != '' THEN package_url
        ELSE '/api/plugins/download/' || id
      END AS download_url
    FROM plugin_catalog
    WHERE product_id = ? AND enabled = 1
    ORDER BY name COLLATE NOCASE`
  ).bind(productId).all();

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

function parsePermissions(value: unknown): string[] {
  try {
    const parsed = JSON.parse(String(value || '[]'));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
