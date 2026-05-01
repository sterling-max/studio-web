export const MAX_COMMANDER_RELEASE = {
  version: '0.8.10',
  r2Version: 'v0.8.10',
  pubDate: '2026-05-01T00:00:00Z',
  downloadUrl: 'https://sterling.ltd/download/mc-latest.exe',
  notes: 'Navigation, Filtering & Tooltip Polish - cleaner global tooltips, safer drive button behavior, full-row file filtering, refined filter controls, and clearer Pro plugin messaging.',
};

export function normalizeVersion(version: string) {
  return version.trim().replace(/^v/i, '');
}

export function compareSemverLike(a: string, b: string) {
  const left = normalizeVersion(a).split(/[.-]/).map(part => Number.parseInt(part, 10) || 0);
  const right = normalizeVersion(b).split(/[.-]/).map(part => Number.parseInt(part, 10) || 0);
  const length = Math.max(left.length, right.length);

  for (let i = 0; i < length; i += 1) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) return diff;
  }

  return 0;
}
