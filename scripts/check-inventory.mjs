import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const expected = { maven: 18, npm: 18, nuget: 9, rubygems: 7 };
const actual = {};
const names = new Set();
for (const [registry, count] of Object.entries(expected)) {
  const root = join('packages', registry);
  const folders = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
  actual[registry] = folders.length;
  if (folders.length !== count) throw new Error(`${registry}: expected ${count}, found ${folders.length}`);
  for (const folder of folders) {
    const dir = join(root, folder);
    if (!existsSync(join(dir, 'README.md'))) throw new Error(`Missing README: ${dir}`);
    let name;
    if (registry === 'npm') name = JSON.parse(readFileSync(join(dir, 'package.json'))).name;
    if (registry === 'maven') {
      const xml = readFileSync(join(dir, 'pom.xml'), 'utf8');
      name = `io.github.xmori:${xml.match(/<artifactId>([^<]+)<\/artifactId>/)?.[1]}`;
    }
    if (registry === 'nuget') name = `XMori.${folder.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')}`;
    if (registry === 'rubygems') name = folder;
    if (!name || names.has(`${registry}:${name}`)) throw new Error(`Missing or duplicate name: ${dir}`);
    names.add(`${registry}:${name}`);
  }
}
const total = Object.values(actual).reduce((sum, count) => sum + count, 0);
if (total !== 52) throw new Error(`Expected 52, found ${total}`);
console.log(`Source packages: Maven ${actual.maven}, npm ${actual.npm}, NuGet ${actual.nuget}, RubyGems ${actual.rubygems}. Total ${total}.`);
