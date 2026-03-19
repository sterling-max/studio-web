interface Env {
  BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const fileName = params.file as string;

  if (fileName === 'mc-latest.exe' || fileName === 'mc-free.exe' || fileName === 'mc-setup.exe') {
    try {
      // 1. Find the latest version from R2
      const options: R2ListOptions = {
        prefix: 'mc/releases/',
        delimiter: '/',
      };
      
      const listed = await env.BUCKET.list(options);
      const commonPrefixes = listed.commonPrefixes || [];
      
      // Get the latest folder (vX.Y.Z)
      const versions = commonPrefixes
        .map(p => {
          const parts = p.split('/').filter(Boolean);
          return parts[parts.length - 1];
        })
        .filter(v => v && (v.startsWith('v') || /^\d/.test(v))) // Accept v0.1 or 0.1
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

      const latestVersion = versions[0];
      
      if (!latestVersion) {
         // Fallback: list all objects if commonPrefixes is empty (S3 quirk)
         const allObjects = await env.BUCKET.list({ prefix: 'mc/releases/' });
         const objects = allObjects.objects || [];

         if (objects.length === 0) {
           return new Response(`Error: No versions found in R2 path: mc/releases/ (Bucket found, but empty)`, { status: 404 });
         }
         // Try to extract version from full paths
         const fallbackVersions = Array.from(new Set(objects.map(o => {
            const match = o.key.match(/mc\/releases\/([^/]+)\//);
            return match ? match[1] : null;
         }))).filter(Boolean) as string[];
         
         if (fallbackVersions.length === 0) {
            return new Response(`Error: Could not parse versions from objects in mc/releases/. Keys: ${objects.slice(0, 3).map(o => o.key).join(', ')}`, { status: 404 });
         }
         fallbackVersions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
         return serveVersion(fallbackVersions[0], env, fileName);
      }

      return serveVersion(latestVersion, env, fileName);
    } catch (e: any) {
      return new Response(`Internal Worker Error: ${e.message} at ${e.stack}`, { status: 500 });
    }
  }

  return new Response('Not Found', { status: 404 });
};

async function serveVersion(version: string, env: Env, fileName: string) {
  const versionDir = `mc/releases/${version}/`;
  const versionFiles = await env.BUCKET.list({ prefix: versionDir });
  const objects = versionFiles.objects || [];
  
  if (objects.length === 0) {
    return new Response(`Error: No files found in version directory ${versionDir}`, { status: 404 });
  }

  const installer = objects.find(obj => 
    obj.key.toLowerCase().endsWith('.exe') && !obj.key.toLowerCase().includes('pdb') && obj.size > 0
  );

  if (!installer) {
    return new Response(`Error: Installer (.exe) not found in ${versionDir}. Files listed: ${objects.map(o => o.key).join(', ')}`, { status: 404 });
  }

  const object = await env.BUCKET.get(installer.key);
  if (!object) {
    return new Response(`Error: Failed to fetch data for ${installer.key}`, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  // Debug header with timestamp to verify real-time execution
  headers.set('x-version', `${version} (at ${new Date().toISOString()})`);
  // Disable caching to ensure users always get the freshest version
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate'); 
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  
  const finalName = fileName.includes('free') ? 'MaxCommander_Free.exe' : 'MaxCommanderSetup.exe';
  headers.set('Content-Disposition', `attachment; filename="${finalName}"`);

  return new Response(object.body, { headers });
}
