interface Env {
  BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const fileName = params.file as string;

  if (fileName === 'mc-latest.exe' || fileName === 'mc-free.exe') {
    // 1. Find the latest version from R2
    const options: R2ListOptions = {
      prefix: 'mc/releases/',
      delimiter: '/',
    };
    
    const listed = await env.BUCKET.list(options);
    
    // Get the latest folder (vX.Y.Z)
    const versions = listed.commonPrefixes
      .map(p => {
        const parts = p.split('/').filter(Boolean);
        return parts[parts.length - 1];
      })
      .filter(v => v.startsWith('v'))
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

    const latestVersion = versions[0];
    
    if (!latestVersion) {
       return new Response('No versions found in R2 path: mc/releases/', { status: 404 });
    }

    // 2. Find the actual installer file inside that version folder
    const versionDir = `mc/releases/${latestVersion}/`;
    const versionFiles = await env.BUCKET.list({ prefix: versionDir });
    
    // Safety check: ensure we actually have files
    if (versionFiles.objects.length === 0) {
      return new Response(`No files found in ${versionDir}`, { status: 404 });
    }

    const installer = versionFiles.objects.find(obj => 
      obj.key.endsWith('.exe') && !obj.key.includes('pdb') && obj.size > 0
    );

    if (!installer) {
      return new Response(`Installer (.exe) not found in ${versionDir}. Files found: ${versionFiles.objects.map(o => o.key).join(', ')}`, { status: 404 });
    }

    // 3. Serve the file
    const object = await env.BUCKET.get(installer.key);

    if (!object) {
      return new Response(`Unable to fetch object from R2: ${installer.key}`, { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    
    // Set a clean filename for the user
    const finalName = fileName.includes('free') ? 'MaxCommander_Free.exe' : 'MaxCommanderSetup.exe';
    headers.set('Content-Disposition', `attachment; filename="${finalName}"`);

    return new Response(object.body, {
      headers,
    });
  }

  return new Response('Not Found', { status: 404 });
};
