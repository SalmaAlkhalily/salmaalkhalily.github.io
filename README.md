# salmaalkhalily.github.io

Personal portfolio of **Salma Alkhalily**, built with React + Vite + TypeScript and deployed automatically to GitHub Pages.

Live at: https://salmaalkhalily.github.io

## Getting Started

```powershell
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build
```

## Editing Content

All personal content (bio, skills, highlights, experience, education, links) lives in
[src/data/portfolio.ts](src/data/portfolio.ts). Replace every `TODO` there.

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
