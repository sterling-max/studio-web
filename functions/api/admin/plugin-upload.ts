import { requireAdmin, type AdminEnv } from '../_shared/adminAuth';
import { json, textError, trimString } from '../_shared/json';

type Env = AdminEnv & {
  DB: D1Database;
  BUCKET: R2Bucket;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const adminError = requireAdmin(request, env);
  if (adminError) return adminError;

  const form = await request.formData().catch(() => null);
  if (!form) return textError('Invalid multipart upload.', 400);

  const file = form.get('file');
  const id = slug(trimString(form.get('id'), 80));
  const productId = slug(trimString(form.get('product_id'), 80) || 'max-commander');

  if (!id) return textError('Plugin id is required.', 400);
  if (!(file instanceof File)) return textError('A .mcx file is required.', 400);
  if (!file.name.toLowerCase().endsWith('.mcx')) return textError('Only .mcx plugin packages can be uploaded.', 400);

  const artifactKey = `mc/plugins/${id}-${Date.now()}.mcx`;
  await env.BUCKET.put(artifactKey, file.stream(), {
    httpMetadata: {
      contentType: 'application/octet-stream',
      contentDisposition: `attachment; filename="${id}.mcx"`
    },
    customMetadata: {
      product_id: productId,
      plugin_id: id,
      original_name: file.name
    }
  });

  await env.DB.prepare(
    `UPDATE plugin_catalog
     SET artifact_key = ?, updated_at = ?
     WHERE id = ?`
  ).bind(artifactKey, Date.now(), id).run();

  return json({ success: true, id, artifact_key: artifactKey });
};

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
}
