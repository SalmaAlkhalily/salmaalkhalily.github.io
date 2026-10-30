# Portfolio course review

Reviewed on 23 October 2026 and updated on 30 October 2026 (after the course pages were republished on 29 October) against the [course website](https://portfoliocourse-josephrollin.framer.website/), its eight recommendation pages and the examples linked below. The site publishes recommendations; no point-based grading rubric was found, so this review cannot guarantee a grade.

| Course recommendation | Portfolio evidence | Status |
| --- | --- | --- |
| [Identity](https://portfoliocourse-josephrollin.framer.website/services/say-who-you-are-in-one-line): name the role and kind of work | Hero names Salma, AI and Data Science engineering and M2 DKAI, followed by ML/NLP/IR/RAG/knowledge-graph work and GitHub/LinkedIn links. | Present |
| [Projects](https://portfoliocourse-josephrollin.framer.website/services/show-projects-as-case-studies): show 3–6 projects with problem, contribution and stack | Four selected projects, two-sentence descriptions, contribution within the description and technology tags. | Present |
| A measurable result for each project | IR ranking, NLP saved test F1, VLM study scale and SHACL validation scope are shown. PolicyGap shows 3 framework families and PDF/DOCX/TXT inputs, explicitly labelled as implementation scope. | Present; scope figures are not performance benchmarks |
| Project links, longer write-ups and older-work archive | All selected projects link to a detailed portfolio page and repository; earlier work has a separate archive. ListedNearMe links to its verified website. | Present; no deployed academic application is claimed |
| [Contact](https://portfoliocourse-josephrollin.framer.website/services/the-site-itself-is-proof): an email address visible or copied in one click, GitHub, LinkedIn, PDF CV and availability | Footer and Contact show the email address on a button that copies it in one click, next to Email me, GitHub, LinkedIn, the CV and availability; the hero has Email me. | Present |
| [Site quality](https://portfoliocourse-josephrollin.framer.website/services/personality-should-demonstrate-skill): fast, mobile, readable and keyboard accessible | Prerendered routes, separate page code, responsive grids, light/dark tokens, skip link, focus styles, semantic controls, Escape handling and reduced-motion support. | Representative browser checks completed; full keyboard audit remains pending |
| Avoid skill percentages and unskippable intros; demonstrate relevant skills | Skills use text tags. Preview bars represent model metrics. Project pages include sourced charts, mapping diagrams and an interactive scoring explanation. | Present |
| [Typography](https://portfoliocourse-josephrollin.framer.website/services/property-management): organized sizes and spacing | The page asks to avoid predictable or overused fonts and links Velvetyne and Pousse ta fonte. Headings use Erode from Fontshare, a free foundry listed on Pousse ta fonte, chosen to stay close to the earlier Lora look; body text uses Switzer, also from Fontshare, with Switzer also sets dates and labels, so the site uses two fonts (code snippets use the visitor's built-in code font); shared type, line-height and tracking variables; responsive headings. | Present |
| [Colors](https://portfoliocourse-josephrollin.framer.website/services/interior-styling): limited palette with defined purposes | Four base colors for surfaces, text, actions and metadata, with derived tints and dark-theme equivalents. | Sampled text-token contrast calculations pass; both themes inspected in the browser |
| [Layout](https://portfoliocourse-josephrollin.framer.website/services/rental-advisory): grid, hierarchy and related content grouped together | Responsive 12/8/4-column base grid, project text beside previews, section headings and case-study contents navigation. | Desktop and representative 320px/400px mobile views checked |
| [Iconography](https://portfoliocourse-josephrollin.framer.website/services/ongoing-maintenance): custom visuals and contextual presentation | Custom SVG icons, a browser-window mockup of the PolicyGap dashboard (the page recommends mockups), the supplied PolicyGap logo, a custom social preview image, source-based research figures and project-specific diagrams. Responsive logo downloads are 57,222 or 224,514 bytes, with the 974,551-byte original preserved as fallback. | Present |
| Homepage FAQ: headline, visual, contact button, professional bio and subtle skills | Hero, background illustration, contact CTA, a three-paragraph About of about 110 words (modelled on Brittany Chiang's), experience, education and grouped skills. Eighteen primary tools/methods plus languages remain visible; additional skills are in an expandable list. | Present |

The dedicated project page recommends **3–6 projects**, while the homepage FAQ suggests **2–4 curated projects**. The homepage now shows four, which fits both; the NLP project moved to the archive. For personal interests, the About section mentions Salma's own interest in machine learning, knowledge graphs and constraint programming, as she supplied it.

## Examples reviewed

- [Brittany Chiang](https://brittanychiang.com/): clear role, concise project summaries, measured outcomes, stack tags, résumé and archive.
- [Rauno Freiberg](https://rauno.me/): readily available GitHub and email-copy controls.
- [Bruno Simon](https://bruno-simon.com/): interaction demonstrates his WebGL specialty; an elaborate 3D experience is not a requirement for this portfolio.
- [Lynn Fisher](https://lynnandtonic.com/): personal visual direction and an archive of earlier site versions.
- [Josh Comeau](https://www.joshwcomeau.com/): interactive explanations demonstrate the skills he teaches.

## Verification

`npm run build` and `npm run check:build` passed on 23 October 2026. After the project-page review, the verifier checks all eleven prerendered pages and 403 local references, including files and fragments, metadata, unique IDs, labels/ARIA references, image alt attributes and dimensions, the sitemap and permitted public PDF files. It also checks the four homepage result/scope labels and case-study links, five archive case-study links and report-link visibility. Only the VLM research page links to an academic report.

All eleven production-preview routes returned HTTP 200 with prerendered headings. Responsive logo sources are present in both generated pages; decoded WebP pixels match the resized RGB assets. Sampled semantic text colors meet 4.5:1 in token calculations for both themes (minimum sampled ratios: 4.80:1 light, 6.25:1 dark).

The Computer Use skill allowed a desktop review of the DFA page and representative homepage and Contact checks at 320px and 400px. Mobile navigation, Escape dismissal with focus restored, theme switching and persistence after reload, successful email copying and the CV download were checked. A final skip-link check stopped when Computer Use could not reliably determine the browser URL; a complete keyboard audit remains pending. A browser-extension connection error appeared in the console; no React hydration error was observed.

The hero animation stops after a four-second introduction. Thirty-one isolated checks against the actual interaction components passed, covering animation lifecycle and reduced motion, clipboard success/failure, stale asynchronous results and unmount cleanup. These checks use browser-API doubles; they do not replace a full browser audit.

The [project-page review](project-page-review.md) records the source checks and factual corrections. The local [submission file](../submission/portfolio-link.txt) contains the permanent portfolio URL; no course submission was performed.

Salma confirmed both the SHACL M1 TER project dates (March–May 2025) and the M1 education dates (September 2025–July 2026). Keep both as supplied; the timeline clarification is resolved.

Contributions remain within project prose, with no separate role section. The PolicyGap PDF stays outside public files. No unsupported results, competition placements or hosted demos should be added.

Following the supervisor's feedback, the long background section was replaced by a short About,
followed by Experience, Education and Projects in both the page and the navigation. The mental arithmetic certificate is retained in the content
data with `hidden: true` and is excluded from the visible credentials. At Salma's
request the email address is visible again, on the copy buttons in Contact and the
footer, to match the course's "visible, one-click copyable email address".

The updated homepage was checked in headless Chrome at 1440, 390 and 320 pixels,
in both themes. Page/navigation order, mobile menu behaviour,
and the hidden certificate were verified. Isolated
clipboard success/failure checks confirmed copying and the LinkedIn fallback
text. All ten inner pages retain the footer contact controls. These checks produced no page errors or horizontal overflow.
