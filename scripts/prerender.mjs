import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticPages, render } from '../dist-ssr/entry-server.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  throw new Error('Cannot prerender: the empty root element is missing from dist/index.html.');
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const pages = getStaticPages();
for (const page of pages) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, (_, before, after) => `${before}${escapeHtml(page.description)}${after}`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/>)/, (_, before, after) => `${before}${page.url}${after}`);

  for (const [property, value] of Object.entries({
    'og:title': page.title,
    'og:description': page.description,
    'og:url': page.url,
    'og:type': page.kind === 'Article' ? 'article' : page.kind === 'ProfilePage' ? 'profile' : 'website',
  })) {
    const pattern = new RegExp(`(<meta\\s+property="${property}"\\s+content=")[^"]*("\\s*\\/>)`);
    html = html.replace(pattern, (_, before, after) => `${before}${escapeHtml(value)}${after}`);
  }

  if (page.pathname !== '/') {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': page.kind,
      '@id': `${page.url}#page`,
      url: page.url,
      name: page.title,
      ...(page.kind === 'Article' ? { headline: page.title } : {}),
      description: page.description,
      isPartOf: { '@id': 'https://salmaalkhalily.github.io/#website' },
      author: {
        '@type': 'Person',
        '@id': 'https://salmaalkhalily.github.io/#person',
        name: 'Salma Alkhalily',
        url: 'https://salmaalkhalily.github.io/',
      },
    };
    const serialized = JSON.stringify(structuredData).replace(/</g, '\\u003c');
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      () => `<script type="application/ld+json">${serialized}</script>`);
  }

  const markup = await render(page.pathname);
  html = html.replace(placeholder, () => `<div id="root">${markup}</div>`);
  const output = fileURLToPath(new URL(page.pathname === '/' ? 'index.html' : page.pathname.slice(1), dist));
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}
console.log(`Prerendered ${pages.length} pages: portfolio, archive and project studies.`);
