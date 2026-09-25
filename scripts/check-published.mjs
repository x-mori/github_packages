import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const owner = 'x-mori';
const expected = {
  npm: readdirSync('packages/npm').map(folder => JSON.parse(readFileSync(join('packages/npm', folder, 'package.json'))).name.split('/')[1]),
  maven: readdirSync('packages/maven').map(folder => `io.github.xmori.${folder}`),
  nuget: readdirSync('packages/nuget').map(folder => `XMori.${folder.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')}`),
  rubygems: readdirSync('packages/rubygems'),
};

let foundTotal = 0;
for (const [type, wanted] of Object.entries(expected)) {
  const found = [];
  for (let page = 1; ; page++) {
    const path = `users/${owner}/packages?package_type=${type}&per_page=100&page=${page}`;
    const response = JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8' }));
    found.push(...response);
    if (response.length < 100) break;
  }
  const actual = new Set(found.map(item => item.name.toLowerCase()));
  const missing = wanted.filter(name => !actual.has(name.toLowerCase()));
  foundTotal += wanted.length - missing.length;
  console.log(`${type}: ${wanted.length - missing.length}/${wanted.length} expected packages visible through the API`);
  if (missing.length) console.error(`Missing ${type}: ${missing.join(', ')}`);
}
if (foundTotal !== Object.values(expected).flat().length) process.exitCode = 1;
else console.log('Every expected package name is published.');
