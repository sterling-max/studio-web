import {
  compareSemverLike,
  MAX_COMMANDER_RELEASE,
  normalizeVersion,
} from '../../../_shared/maxCommanderRelease';

interface Env {
  BUCKET: R2Bucket;
}

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      ...(init?.headers || {}),
    },
  });
}

async function getSignature(env: Env) {
  const releasePrefix = `mc/releases/${MAX_COMMANDER_RELEASE.r2Version}/`;
  const listed = await env.BUCKET.list({ prefix: releasePrefix });
  const objects = listed.objects || [];

  const installer = objects.find(obj =>
    obj.key.toLowerCase().endsWith('.exe') &&
    !obj.key.toLowerCase().includes('pdb') &&
    obj.size > 0
  );

  if (!installer) {
    throw new Error(`Installer not found in ${releasePrefix}`);
  }

  const explicitSignature = objects.find(obj => obj.key === `${installer.key}.sig`);
  const fallbackSignature = objects.find(obj => obj.key.toLowerCase().endsWith('.exe.sig'));
  const signatureObject = explicitSignature || fallbackSignature;

  if (!signatureObject) {
    throw new Error(`Signature not found for ${installer.key}`);
  }

  const signature = await env.BUCKET.get(signatureObject.key);
  if (!signature) {
    throw new Error(`Signature object could not be read: ${signatureObject.key}`);
  }

  return signature.text();
}

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const target = String(params.target || '').toLowerCase();
  const currentVersion = normalizeVersion(String(params.current_version || '0.0.0'));

  if (target && !target.includes('windows')) {
    return new Response(null, { status: 204 });
  }

  if (compareSemverLike(currentVersion, MAX_COMMANDER_RELEASE.version) >= 0) {
    return new Response(null, { status: 204 });
  }

  try {
    const signature = await getSignature(env);

    return json({
      version: MAX_COMMANDER_RELEASE.version,
      pub_date: MAX_COMMANDER_RELEASE.pubDate,
      url: MAX_COMMANDER_RELEASE.downloadUrl,
      signature,
      notes: MAX_COMMANDER_RELEASE.notes,
    });
  } catch (error) {
    return json(
      {
        error: error instanceof Error ? error.message : 'Updater metadata is not available.',
      },
      { status: 503 },
    );
  }
};
