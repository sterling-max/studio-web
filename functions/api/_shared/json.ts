export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

export function textError(message: string, status = 400): Response {
  return json({ success: false, message }, status);
}

export function trimString(value: unknown, max: number): string {
  return String(value || '').trim().slice(0, max);
}
