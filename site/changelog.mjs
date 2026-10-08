// Rebuilds releases/README.md — every published version with the headline of its notes.
//   node site/changelog.mjs        (run after adding releases/v<ver>.md and publishing the release)
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('../releases/', import.meta.url));
const releases = JSON.parse(
  execFileSync('gh', ['release', 'list', '--repo', 'ilyabazhenov/walkship', '--limit', '200', '--json', 'tagName,publishedAt,isDraft'], { encoding: 'utf8' }),
).filter((r) => !r.isDraft);

const order = (tag) => tag.slice(1).split('.').map(Number);
releases.sort((a, b) => {
  const [x, y] = [order(a.tagName), order(b.tagName)];
  return y[0] - x[0] || y[1] - x[1] || y[2] - x[2];
});

const rows = releases.map(({ tagName, publishedAt }) => {
  const first = readFileSync(dir + tagName + '.md', 'utf8').split('\n')[0];
  const [en, ru = ''] = first.split(' · ');
  return `| [${tagName.slice(1)}](${tagName}.md) | ${publishedAt.slice(0, 10)} | ${en.trim()}<br>${ru.trim().replace(/^\*\*|\*\*$/g, '')} |`;
});

writeFileSync(dir + 'README.md', `# Changelog · История изменений

Every published version with its headline; the full notes are in each file and on the
[releases page](https://github.com/ilyabazhenov/walkship/releases).
Все опубликованные версии с главным изменением; подробности — в файле версии и на
[странице релизов](https://github.com/ilyabazhenov/walkship/releases).

| Version | Date | |
|---|---|---|
${rows.join('\n')}

1.6.0 was never published on its own: its changes went into 1.6.1. · 1.6.0 отдельно не выходил: его изменения вошли в 1.6.1.
`);
console.log(`releases/README.md: ${rows.length} versions`);
