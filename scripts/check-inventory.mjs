import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const registries = ['maven', 'npm', 'nuget', 'rubygems'];
const actual = {};
const names = new Set();
for (const registry of registries) {
  const root = join('packages', registry);
  const folders = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
  actual[registry] = folders.length;
  if (folders.length === 0) throw new Error(`${registry}: no packages found`);
  for (const folder of folders) {
    const dir = join(root, folder);
    if (!existsSync(join(dir, 'README.md'))) throw new Error(`Missing README: ${dir}`);
    let name;
    if (registry === 'npm') {
      const manifest = JSON.parse(readFileSync(join(dir, 'package.json')));
      name = manifest.name;
      if (name !== `@x-mori/${folder}` || !existsSync(join(dir, 'src', 'index.js'))) throw new Error(`Invalid npm package: ${dir}`);
    }
    if (registry === 'maven') {
      const xml = readFileSync(join(dir, 'pom.xml'), 'utf8');
      const group = xml.match(/<groupId>([^<]+)<\/groupId>/)?.[1];
      const artifact = xml.match(/<artifactId>([^<]+)<\/artifactId>/)?.[1];
      if (group !== 'io.github.xmori' || artifact !== folder) throw new Error(`Invalid Maven coordinates: ${dir}`);
      name = `${group}:${artifact}`;
    }
    if (registry === 'nuget') {
      const projects = readdirSync(dir).filter(file => file.endsWith('.csproj'));
      if (projects.length !== 1) throw new Error(`Expected one NuGet project: ${dir}`);
      const xml = readFileSync(join(dir, projects[0]), 'utf8');
      name = xml.match(/<PackageId>([^<]+)<\/PackageId>/)?.[1];
      const expected = `XMori.${folder.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')}`;
      if (name !== expected) throw new Error(`Invalid NuGet package ID: ${dir}`);
    }
    if (registry === 'rubygems') {
      const specs = readdirSync(dir).filter(file => file.endsWith('.gemspec'));
      if (specs.length !== 1) throw new Error(`Expected one gemspec: ${dir}`);
      name = readFileSync(join(dir, specs[0]), 'utf8').match(/spec\.name = '([^']+)'/)?.[1];
      if (name !== folder || specs[0] !== `${folder}.gemspec`) throw new Error(`Invalid gem name: ${dir}`);
    }
    if (!name || names.has(`${registry}:${name}`)) throw new Error(`Missing or duplicate name: ${dir}`);
    names.add(`${registry}:${name}`);
  }
}
const total = Object.values(actual).reduce((sum, count) => sum + count, 0);
console.log(`Source packages: Maven ${actual.maven}, npm ${actual.npm}, NuGet ${actual.nuget}, RubyGems ${actual.rubygems}. Total ${total}.`);
