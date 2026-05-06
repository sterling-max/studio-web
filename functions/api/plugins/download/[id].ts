type Env = {
  DB: D1Database;
  BUCKET: R2Bucket;
};

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const id = String(params.id || '').trim();
  if (!id) return new Response('Plugin id is required.', { status: 400 });

  const row = await env.DB.prepare(
    `SELECT id, name, artifact_key, package_url
     FROM plugin_catalog
     WHERE id = ? AND enabled = 1
     LIMIT 1`
  ).bind(id).first<any>();

  if (!row) return new Response('Plugin not found.', { status: 404 });

  if (row.package_url) {
    return Response.redirect(row.package_url, 302);
  }

  if (!row.artifact_key) {
    return new Response('Plugin package is not available yet.', { status: 404 });
  }

  const object = await env.BUCKET.get(row.artifact_key);
  if (!object) return new Response('Plugin package is not available yet.', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${row.id}.mcx"`);
  headers.set('Cache-Control', 'public, max-age=300');

  return new Response(object.body, { headers });
};
