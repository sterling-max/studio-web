import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const versionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;

const files = {
  release: 'functions/api/_shared/maxCommanderRelease.ts',
  changelog: 'src/data/max-commander-changelog.ts',
  websiteChangelog: 'src/data/website-changelog.ts',
};

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(filePath(relativePath), 'utf8');
}

function write(relativePath, content) {
  fs.writeFileSync(filePath(relativePath), content);
}

function requireMatch(name, value) {
  if (!value) {
    throw new Error(`Could not read Max Commander version from ${name}`);
  }
  return value;
}

function getVersions() {
  const release = read(files.release);
  const changelog = read(files.changelog);
  const websiteChangelog = read(files.websiteChangelog);

  return [
    ['functions/api/_shared/maxCommanderRelease.ts version', requireMatch(files.release, release.match(/version:\s*'([^']+)'/)?.[1])],
    ['functions/api/_shared/maxCommanderRelease.ts r2Version', requireMatch(files.release, release.match(/r2Version:\s*'v([^']+)'/)?.[1])],
    ['src/data/max-commander-changelog.ts latest entry', requireMatch(files.changelog, changelog.match(/version:\s*"([^"]+)"/)?.[1])],
    ['src/data/website-changelog.ts latest Max Commander mention', requireMatch(files.websiteChangelog, websiteChangelog.match(/Max Commander ([0-9]+\.[0-9]+\.[0-9]+)/)?.[1])],
  ];
}

function setVersion(version) {
  if (!versionPattern.test(version)) {
    throw new Error(`Invalid version "${version}". Expected SemVer like 0.8.9.`);
  }

  write(files.release, read(files.release)
    .replace(/(version:\s*)'[^']+'/m, `$1'${version}'`)
    .replace(/(r2Version:\s*)'v[^']+'/m, `$1'v${version}'`));

  write(files.changelog, read(files.changelog).replace(
    /(version:\s*)"[^"]+"/,
    `$1"${version}"`
  ));

  write(files.websiteChangelog, read(files.websiteChangelog).replace(
    /(Max Commander )\d+\.\d+\.\d+/,
    `$1${version}`
  ));
}

function checkVersions() {
  const versions = getVersions();
  const expected = versions[0][1];
  const mismatches = versions.filter(([, version]) => version !== expected);

  for (const [name, version] of versions) {
    console.log(`${name}: ${version}`);
  }

  if (mismatches.length > 0) {
    console.error('\nMax Commander website release metadata is not synchronized.');
    for (const [name, version] of mismatches) {
      console.error(`- ${name}: ${version} (expected ${expected})`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`\nMax Commander website release metadata is synchronized at ${expected}.`);
}

function printUsage() {
  console.log('Usage:');
  console.log('  npm run mc:version:check');
  console.log('  npm run mc:version:set -- 0.8.9');
}

const [command, version] = process.argv.slice(2);

try {
  if (command === 'set') {
    setVersion(version);
    checkVersions();
  } else if (command === 'check') {
    checkVersions();
  } else {
    printUsage();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
