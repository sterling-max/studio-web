export interface Env {
  // Add bindings here
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return new Response(JSON.stringify({
    version: "0.8.7",
    url: "https://sterling.ltd/download/mc-latest.exe",
    notes: "Search, Profiles & Toolbar Refinements - easier search review, smoother toolbar menus, cleaner profile controls, smarter folder history, and more resilient drive refreshes."
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
