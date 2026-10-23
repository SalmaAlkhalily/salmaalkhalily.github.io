import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { getStaticPages } from '../dist-ssr/entry-server.js';

const output = new URL('../dist/', import.meta.url);
const homepage = 'https://salmaalkhalily.github.io/';
const github = 'https://github.com/SalmaAlkhalily';
const archivePaths = ['/projects/ouramazone.html', '/projects/internet-download-manager.html', '/projects/automate-dfa.html', '/projects/phone-generator.html'];
const expectedPaths = [
  '/', '/archive.html', '/projects/policygap.html', '/projects/shacl-validation.html',
  '/projects/vlm-face-accessories.html', '/projects/scientific-article-retrieval.html',
  '/projects/ai-text-detection.html',
  ...archivePaths,
];
const pages = getStaticPages();
assert.deepEqual(pages.map((page) => page.pathname).sort(), expectedPaths.toSorted(), 'Unexpected static routes.');

const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#x27|#39);/g, (entity) => ({
  '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&#x27;': "'", '&#39;': "'",
})[entity]);
const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, 'i'));
  return match ? decode(match[1]) : undefined;
};
const content = (html, selector, name) => {
  const tag = [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)].map((match) => match[0])
    .find((item) => attribute(item, selector[0]) === selector[1]);
  return tag && attribute(tag, name);
};
const files = new Map(await Promise.all(pages.map(async (page) => {
  const html = await readFile(new URL(page.pathname === '/' ? 'index.html' : page.pathname.slice(1), output), 'utf8');
  return [page.pathname, { html, ids: [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]) }];
})));
let localReferences = 0;

for (const page of pages) {
  const { html, ids } = files.get(page.pathname);
  const label = page.pathname;
  assert.match(html, /<html lang="en"/, `${label}: missing document language.`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${label}: expected one prerendered page heading.`);
  assert.equal([...html.matchAll(/<main\b/g)].length, 1, `${label}: expected one main landmark.`);
  assert.equal(new Set(ids).size, ids.length, `${label}: duplicate element IDs.`);
  assert.ok(html.includes('href="#main"'), `${label}: missing skip link.`);
  assert.doesNotMatch(html, /noindex|nofollow|Loading project…|View presentation/i, `${label}: unexpected fallback or removed action.`);
  const reportLinks = [...html.matchAll(/<a\b[^>]*>/g)]
    .map((match) => attribute(match[0], 'href'))
    .filter((href) => href && new URL(href, page.url).pathname.startsWith('/reports/'));
  if (page.pathname === '/projects/vlm-face-accessories.html') {
    assert.ok(reportLinks.length > 0, `${label}: the research report must remain available.`);
    assert.ok(reportLinks.every((href) => new URL(href, page.url).pathname === '/reports/vlm-face-accessories-report.pdf'), `${label}: unexpected report link.`);
  } else {
    assert.equal(reportLinks.length, 0, `${label}: report links are reserved for the VLM research page.`);
    if (page.pathname.startsWith('/projects/')) {
      const text = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');
      assert.doesNotMatch(text, /\b(?:read|full|TER|project)\s+report\b|\breport,\s*p\.|\bfrom\s+(?:the\s+)?report\b|\bin\s+the\s+report\b|\breport[’']s\b|\bpresentation\s*&\s*code\b/i, `${label}: academic report mention should be hidden.`);
    }
  }
  assert.equal(content(html, ['rel', 'canonical'], 'href'), page.url, `${label}: canonical URL.`);
  assert.equal(content(html, ['property', 'og:url'], 'content'), page.url, `${label}: social URL.`);
  assert.equal(content(html, ['property', 'og:title'], 'content'), page.title, `${label}: social title.`);
  assert.equal(content(html, ['name', 'description'], 'content'), page.description, `${label}: description.`);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  assert.ok(schemas.some((schema) => schema['@type'] === page.kind && schema.url === page.url), `${label}: page schema.`);
  assert.equal(schemas.find((schema) => schema['@type'] === 'WebSite')?.url, homepage, `${label}: site schema.`);
  assert.match(html, /src="\/assets\/[^"<>]+\.js"/, `${label}: missing production JavaScript.`);
  assert.match(html, /href="\/assets\/[^"<>]+\.css"/, `${label}: missing production CSS.`);

  for (const match of html.matchAll(/<(?:img|a|link|script|source|video)\b[^>]*>/g)) {
    const tag = match[0];
    if (tag.startsWith('<img')) {
      assert.notEqual(attribute(tag, 'alt'), undefined, `${label}: image without alt text.`);
      assert.ok(Number(attribute(tag, 'width')) > 0 && Number(attribute(tag, 'height')) > 0, `${label}: image without dimensions.`);
    }
    if (attribute(tag, 'target') === '_blank') {
      const rel = attribute(tag, 'rel')?.split(/\s+/) ?? [];
      assert.ok(rel.includes('noopener') || rel.includes('noreferrer'), `${label}: external window without opener protection.`);
    }
    const references = [attribute(tag, 'href'), attribute(tag, 'src'), attribute(tag, 'poster')].filter((value) => value !== undefined);
    const srcset = attribute(tag, 'srcset');
    if (srcset) references.push(...srcset.split(',').map((item) => item.trim().split(/\s+/)[0]));
    for (const reference of references) {
      assert.ok(reference.trim(), `${label}: empty URL.`);
      if (/^(?:mailto:|tel:|data:)/i.test(reference)) continue;
      const url = new URL(reference, page.url);
      if (url.origin !== new URL(homepage).origin) continue;
      localReferences++;
      const target = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
      await access(new URL(target, output)).catch(() => assert.fail(`${label}: missing local file ${url.pathname}`));
      if (url.hash && files.has(url.pathname)) {
        assert.ok(files.get(url.pathname).ids.includes(decodeURIComponent(url.hash.slice(1))), `${label}: broken anchor ${reference}`);
      }
    }
  }
  for (const match of html.matchAll(/<[^>]+\b(?:aria-labelledby|aria-describedby|for)="[^"]+"[^>]*>/g)) {
    for (const name of ['aria-labelledby', 'aria-describedby', 'for']) {
      for (const id of attribute(match[0], name)?.split(/\s+/) ?? []) {
        assert.ok(ids.includes(id), `${label}: ${name} points to missing ID ${id}`);
      }
    }
  }
}

const demoHtml = files.get('/projects/policygap.html').html;
const demoVideos = [...demoHtml.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/g)];
assert.equal(demoVideos.length, 1, 'PolicyGap needs one demo video.');
const video = demoVideos[0][0];
assert.equal(attribute(video, 'aria-hidden'), 'true', 'Initial preview should expose only its play button.');
assert.equal(attribute(video, 'tabindex'), '-1', 'Video should join the keyboard order after play.');
assert.doesNotMatch(video, /\bcontrols(?:\s|=|>)/, 'Native controls should appear after the preview is played.');
assert.match(video, /\bplaysinline(?:\s|=|>)/i, 'Demo must play inline on mobile.');
assert.equal(attribute(video, 'preload'), 'none', 'Demo must wait for the visitor to play it.');
assert.doesNotMatch(video, /\b(?:autoplay|loop)(?:\s|=|>)/i, 'Demo should not autoplay or loop.');
assert.equal(attribute(video, 'aria-labelledby'), 'demo-title', 'Demo needs its visible title as an accessible label.');
assert.equal(attribute(video, 'aria-describedby'), 'demo-description', 'Demo needs a text description.');
assert.ok(Number(attribute(video, 'width')) > 0 && Number(attribute(video, 'height')) > 0, 'Demo needs dimensions.');
assert.equal(attribute(video, 'poster'), '/images/projects/policygap-demo-poster.webp');
assert.equal(attribute(video, 'src'), '/videos/policygap-demo.mp4', 'Demo needs a playable MP4 source.');
assert.ok(demoHtml.includes('aria-label="Play the 1-minute demo"'), 'Demo needs an explicit play button.');
assert.ok(demoHtml.includes('href="#demo"'), 'Missing demo navigation link.');
assert.ok(demoHtml.includes('https://drive.google.com/file/d/1Z8wLoTA40ImgABdwph1qTX1In7jqzzrS/view'), 'Missing Drive backup link.');
assert.ok(demoHtml.includes('This recording has no audio.') && demoHtml.includes('Read the demo walkthrough'), 'Silent demo needs a text alternative.');
for (const [pathname, page] of files) {
  if (pathname !== '/projects/policygap.html') assert.doesNotMatch(page.html, /<video\b/, `${pathname}: unexpected demo video.`);
}

const { html } = files.get('/');
assert.match(html, /<h1\b[^>]*>Salma Alkhalily<\/h1>/, 'The name must exist before JavaScript runs.');
for (const section of ['about', 'projects', 'education', 'experience', 'skills', 'contact']) {
  assert.ok(html.includes(`<section id="${section}"`), `Missing prerendered section: ${section}`);
}
assert.ok(html.includes(`href="${github}"`), 'The GitHub profile must be linked in HTML.');
assert.ok(html.includes('Salma Alkhalily on GitHub'), 'The profile link must have descriptive text.');
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]));
const profile = schemas.find((schema) => schema['@type'] === 'ProfilePage');
assert.equal(profile?.mainEntity?.name, 'Salma Alkhalily');
assert.ok(profile?.mainEntity?.sameAs?.includes(github));
const website = schemas.find((schema) => schema['@type'] === 'WebSite');
assert.equal(profile?.isPartOf?.['@id'], website?.['@id']);
assert.equal(website?.author?.['@id'], profile?.mainEntity?.['@id']);
for (const path of expectedPaths.filter((path) => path.startsWith('/projects/') && !archivePaths.includes(path))) {
  assert.ok(html.includes(`href="${path}"`), `Missing case-study link: ${path}`);
}
for (const path of archivePaths) assert.ok(files.get('/archive.html').html.includes(`href="${path}"`), `Missing archive case-study link: ${path}`);
assert.equal([...html.matchAll(/class="project-result"/g)].length, 5, 'Each featured project needs a labelled result or scope.');
assert.ok(html.includes('href="/Salma-Alkhalily-CV.pdf"'), 'Missing CV link.');

const robots = await readFile(new URL('robots.txt', output), 'utf8');
const sitemap = await readFile(new URL('sitemap.xml', output), 'utf8');
assert.ok(robots.includes(`Sitemap: ${homepage}sitemap.xml`));
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls.sort(), pages.map((page) => page.url).sort(), 'Sitemap must list every portfolio page.');

// Only explicitly public documents belong in the build. PolicyGap's source PDF stays private.
const allowedPdfs = new Set([
  'Salma-Alkhalily-CV.pdf', 'reports/shacl-ter-report.pdf',
  'reports/vlm-face-accessories-report.pdf', 'reports/ir-challenge-presentation.pdf',
]);
async function checkDocuments(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) await checkDocuments(new URL(`${entry.name}/`, directory), `${path}/`);
    else if (/\.pdf$/i.test(entry.name)) assert.ok(allowedPdfs.has(path), `Unexpected public PDF: ${path}`);
  }
}
await checkDocuments(output);
console.log(`Verified ${pages.length} prerendered pages, ${localReferences} local references, metadata, accessibility references, sitemap and public documents.`);
