import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
const homepage = 'https://salmaalkhalily.github.io/';
const github = 'https://github.com/SalmaAlkhalily';

assert.match(html, /<h1\b[^>]*>Salma Alkhalily<\/h1>/, 'The name must exist before JavaScript runs.');
for (const section of ['about', 'projects', 'education', 'experience', 'skills', 'contact']) {
  assert.ok(html.includes(`<section id="${section}"`), `Missing prerendered section: ${section}`);
}
assert.ok(html.includes(`href="${github}"`), 'The GitHub profile must be linked in HTML.');
assert.ok(html.includes('Salma Alkhalily on GitHub'), 'The profile link must have descriptive text.');
assert.ok(html.includes(`<link rel="canonical" href="${homepage}"`), 'Incorrect canonical URL.');
assert.doesNotMatch(html, /noindex|nofollow/i, 'The homepage must allow indexing and link discovery.');

const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));
const schema = schemas.find((item) => item['@type'] === 'ProfilePage');
assert.equal(schema?.mainEntity?.name, 'Salma Alkhalily');
assert.ok(schema?.mainEntity?.sameAs?.includes(github), 'Structured data must identify the GitHub profile.');
const website = schemas.find((item) => item['@type'] === 'WebSite');
assert.equal(website?.name, 'Salma Alkhalily');
assert.equal(website?.url, homepage);
assert.equal(schema?.isPartOf?.['@id'], website?.['@id']);
assert.equal(website?.author?.['@id'], schema?.mainEntity?.['@id']);
assert.match(html, /<h3\b[^>]*><a href="https:\/\/github.com\/SalmaAlkhalily\/NLP-Project-AI-Detection"[^>]*>Detecting Human, AI-Generated and Mixed Text<\/a><\/h3>/,
  'Project repository links must be present in the prerendered HTML.');

const robots = await readFile(new URL('robots.txt', output), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', output), 'utf8');
assert.ok(robots.includes(`Sitemap: ${homepage}sitemap.xml`));
assert.ok(sitemap.includes(`<loc>${homepage}</loc>`));

const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"<>]+)"/g)];
assert.ok(assets.some((asset) => asset[1].endsWith('.js')), 'Missing production JavaScript.');
assert.ok(assets.some((asset) => asset[1].endsWith('.css')), 'Missing production CSS.');
await Promise.all(assets.map((asset) => access(new URL(asset[1].slice(1), output))));
console.log('Production HTML, profile links, metadata, sitemap, and assets verified.');
