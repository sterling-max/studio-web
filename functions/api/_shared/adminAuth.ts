export type AdminEnv = {
  ADMIN_EMAILS?: string;
  ADMIN_REPORT_TOKEN?: string;
};

const FALLBACK_ADMIN_EMAILS = ['maximiliano.villarreal@gmail.com'];

export function requireAdmin(request: Request, env: AdminEnv): Response | null {
  const bearer = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (env.ADMIN_REPORT_TOKEN && bearer && bearer === env.ADMIN_REPORT_TOKEN) {
    return null;
  }

  const email = getCloudflareAccessEmail(request);
  const allowedEmails = parseAllowedEmails(env.ADMIN_EMAILS);
  const effectiveAllowedEmails = allowedEmails.length > 0 ? allowedEmails : FALLBACK_ADMIN_EMAILS;

  if (!email) {
    return jsonError('Admin access requires Cloudflare Access authentication.', 401);
  }

  if (!effectiveAllowedEmails.includes(email.toLowerCase())) {
    return jsonError('This Cloudflare Access user is not allowed to view admin reports.', 403);
  }

  return null;
}

function getCloudflareAccessEmail(request: Request): string | null {
  const headerEmail =
    request.headers.get('Cf-Access-Authenticated-User-Email') ||
    request.headers.get('CF-Access-Authenticated-User-Email') ||
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('Cf-Access-Jwt-Assertion-Email');

  if (headerEmail) return headerEmail;

  const jwt =
    request.headers.get('Cf-Access-Jwt-Assertion') ||
    getCookie(request.headers.get('Cookie'), 'CF_Authorization');

  return jwt ? getEmailFromJwt(jwt) : null;
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

function getCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const prefix = `${name}=`;
  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
}

function getEmailFromJwt(jwt: string): string | null {
  const [, payload] = jwt.split('.');
  if (!payload) return null;

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const claims = JSON.parse(atob(padded)) as { email?: string; sub?: string };
    return claims.email || null;
  } catch {
    return null;
  }
}
