import { MAX_COMMANDER_RELEASE } from './_shared/maxCommanderRelease';

export interface Env {
  // Add bindings here
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return new Response(JSON.stringify({
    version: MAX_COMMANDER_RELEASE.version,
    url: MAX_COMMANDER_RELEASE.downloadUrl,
    notes: MAX_COMMANDER_RELEASE.notes
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
