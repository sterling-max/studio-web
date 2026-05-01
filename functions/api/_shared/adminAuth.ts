export type AdminEnv = {
  ADMIN_EMAILS?: string;
  ADMIN_REPORT_TOKEN?: string;
};

export function requireAdmin(request: Request, env: AdminEnv): Response | null {
  const bearer = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (env.ADMIN_REPORT_TOKEN && bearer && bearer === env.ADMIN_REPORT_TOKEN) {
    return null;
  }

  const email = getCloudflareAccessEmail(request);
  const allowedEmails = parseAllowedEmails(env.ADMIN_EMAILS);

  if (!email) {
    return jsonError('Admin access requires Cloudflare Access authentication.', 401);
  }

  if (allowedEmails.length === 0) {
    return jsonError('ADMIN_EMAILS is not configured.', 403);
  }

  if (!allowedEmails.includes(email.toLowerCase())) {
    return jsonError('This Cloudflare Access user is not allowed to view admin reports.', 403);
  }

  return null;
}

function getCloudflareAccessEmail(request: Request): string | null {
  return (
    request.headers.get('Cf-Access-Authenticated-User-Email') ||
    request.headers.get('CF-Access-Authenticated-User-Email') ||
    request.headers.get('cf-access-authenticated-user-email')
  );
}

function parseAllowedEmails(value?: string): string[] {
  return (value || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}
