export interface Env {
  // Add bindings here
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return new Response(JSON.stringify({
    version: "0.7.0",
    url: "https://sterling.ltd/download/mc-latest.exe",
    notes: "Pro Release with Paddle Integration, R2 Distribution, and Sterling Blitz v2."
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
