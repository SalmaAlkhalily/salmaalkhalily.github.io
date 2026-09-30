# Salma Alkhalily — AI & Data Science Portfolio

Personal portfolio of **Salma Alkhalily**, built with React + Vite + TypeScript and deployed automatically to GitHub Pages.

[Portfolio](https://salmaalkhalily.github.io/) · [Salma Alkhalily on GitHub](https://github.com/SalmaAlkhalily) · [LinkedIn](https://www.linkedin.com/in/salmaalkhalily)

## Getting Started

```powershell
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build
```

## Editing Content

All personal content (bio, skills, highlights, experience, education, links) lives in
[src/data/portfolio.ts](src/data/portfolio.ts).

## Search visibility

The production build prerenders the React components into HTML, including the full
portfolio and GitHub profile links. JavaScript then adds interactivity. Canonical
and profile metadata in `index.html` connect this site to Salma Alkhalily's public
profiles. Keep that metadata in sync when changing the profile name or links.

`public/robots.txt` allows crawling and advertises `public/sitemap.xml`, which lists
the homepage. These files help discovery; they do not guarantee indexing or ranking.

After publishing, use [Google Search Console](https://search.google.com/search-console/)
to add the URL-prefix property `https://salmaalkhalily.github.io/`. Verify ownership
using Google's HTML file (place it in `public/` and redeploy) or the HTML meta tag
(add the exact tag Google provides to `index.html` and redeploy). Submit
`https://salmaalkhalily.github.io/sitemap.xml`, then inspect the homepage URL and
request indexing. Leave the verification file or tag in place.

Search Console verification for this site does not grant control over
`github.com/SalmaAlkhalily`. The GitHub profile has its own indexing status. Keep its
bio, website link, and profile README current, and link to it from relevant public
profiles you control. Google controls when either page is indexed and ranked.

References: [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl),
[site verification](https://support.google.com/webmasters/answer/9008080).

## Publishing to GitHub

1. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`:
   ```powershell
   git push
   ```
3. The `Deploy to GitHub Pages` workflow runs on every push to `main`; the site goes live at
   https://salmaalkhalily.github.io.

## License

MIT © Salma Alkhalily
