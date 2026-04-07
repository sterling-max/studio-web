export interface Env {
  // Add bindings here
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return new Response(JSON.stringify({
    version: "0.8.1",
    url: "https://sterling.ltd/download/mc-latest.exe",
    notes: "PathBar Editor & Smart DriveBar — ghost-text autocomplete, pinnable Drive Bar locations, Drive Menu button, and native context menu on drives."
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
