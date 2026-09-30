import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';

const indexPath = new URL('../dist/index.html', import.meta.url);
const template = await readFile(indexPath, 'utf8');
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  throw new Error('Cannot prerender: the empty root element is missing from dist/index.html.');
}

// Use the same components and content as the interactive app, so crawlers and
// visitors without JavaScript receive the complete portfolio and profile links.
await writeFile(indexPath, template.replace(placeholder, () => `<div id="root">${render()}</div>`));
console.log('Prerendered the portfolio into dist/index.html.');
