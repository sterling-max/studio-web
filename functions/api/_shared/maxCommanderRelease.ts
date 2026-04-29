export const MAX_COMMANDER_RELEASE = {
  version: '0.8.9',
  r2Version: 'v0.8.9',
  pubDate: '2026-04-30T00:00:00Z',
  downloadUrl: 'https://sterling.ltd/download/mc-latest.exe',
  notes: 'Installed App & Update Flow Polish - cleaner installed startup, more reliable packaged media playback and lyrics lookup, quieter updates, refined first-run defaults, and normal Windows app data storage.',
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
