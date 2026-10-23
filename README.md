# Salma Alkhalily — AI & Data Science Portfolio

Personal portfolio of **Salma Alkhalily**, built with React + Vite + TypeScript and deployed automatically to GitHub Pages.

[Portfolio](https://salmaalkhalily.github.io/) · [Salma Alkhalily on GitHub](https://github.com/SalmaAlkhalily) · [LinkedIn](https://www.linkedin.com/in/salmaalkhalily)

## Getting Started

```powershell
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run check:build # verify all eleven generated pages and local links
npm run preview  # preview the production build
```

## Editing Content

All personal content (bio, skills, highlights, experience, education, links) lives in
[src/data/portfolio.ts](src/data/portfolio.ts).

The homepage features five AI and knowledge engineering projects. Earlier software
projects are on `/archive.html`. The SHACL and VLM projects link to detailed pages
at `/projects/shacl-validation.html` and `/projects/vlm-face-accessories.html`.
The IR challenge has a notebook-based page at `/projects/scientific-article-retrieval.html`.
The NLP project has one at `/projects/ai-text-detection.html`.
PolicyGap has a documentation-based page at `/projects/policygap.html`.
The summer-school participation and PolicyGap competition entries link to the
original certificate images saved from Salma's LinkedIn attachments in
`public/images/certificates/`. These open at full size without a LinkedIn login.
The Python and Git/GitHub entries link directly to their Coursera credentials.
All eleven pages are prerendered during the production build and can be opened
directly on GitHub Pages.

Four archive entries have source-based pages: OURAMAZONE, Internet Download
Manager, Automate DFA and Phone Generator. Their metadata is in
`src/data/softwareStudies.ts`, prose in `src/data/softwareStudyContent.ts`, and
shared presentation in `src/components/SoftwareStudy.tsx`. Real interface captures
are in `public/images/projects/`. Source commits, local run results and capture
provenance are recorded in [the software run notes](docs/software-project-runs.md).
Creative Multiplication and Tasty Healthy Food remain summaries until their
repositories are supplied.

Project-page metadata lives in [src/data/caseStudies.ts](src/data/caseStudies.ts),
with the report-based explanations in
[src/components/ProjectStudyContent.tsx](src/components/ProjectStudyContent.tsx).
Report links, buttons and citations appear only on the VLM research page.
The SHACL and IR PDFs remain in `public/reports/` as unlinked source assets;
their pages contain no academic-report download or mention. Project figures
are in `public/images/projects/`. PolicyGap's source PDF is kept outside the
repository and public site; its page has no PDF download.

The human-review chart and accuracy table share the numbers in
`src/data/projectResults.json`, with report-page references. To regenerate the
SHACL diagram, human-review chart (PNG/SVG) and CSV downloads, run
`python scripts/generate-project-visuals.py` with matplotlib and PyMuPDF installed.

The SHACL page also includes two captures of the running JavaFX app, in
`public/images/projects/shacl-*.jpg`. The saved building keys generate 40 shapes;
the nine-triple validation sample returns nine constraint findings. The gallery
uses the original JPEG captures with full-size links. Source, runtime setup and
sample details are in [the SHACL run notes](docs/shacl-interface-run.md).

The VLM human-review section includes the supplied review flow, recreated in
`src/components/HumanReviewFlow.tsx`. Its paired inputs, four checks, separate
review decision and combined CSV output use real text and the shared theme
colours, with a stacked layout on smaller screens.

The IR page uses the markdown, code and saved outputs of `IR_Challenge` at commit
`9828a5a7ff94cef682af61774c65f3646d827586`. Its source links point to that snapshot.
The comparison table and regenerated charts share `src/data/irResults.json`;
run `python scripts/generate-ir-visuals.py` with matplotlib to rebuild the PNG/SVG
charts and CSV downloads. The per-query distribution image is an original saved
notebook output. The retrieval notebook is not executed by the website build.

The NLP page uses `NLP-Project-AI-Detection` at commit
`2b76a5548ae23ba46e49633a3c1e86f36e58a2ba`. Its tables and charts share
`src/data/nlpResults.json`, transcribed from the main notebook's saved outputs.
Run `python scripts/generate-nlp-visuals.py` with matplotlib to regenerate the
classification and regression charts (PNG/SVG) and CSV downloads. The XGBoost
confusion matrix image is an original saved notebook output. The page distinguishes
source-distance features from text-only transformer inputs and documents the
different dataset versions. No NLP notebooks run during the website build.

The PolicyGap page follows the supplied technical documentation, version 1.0
(June 2026), with code links pinned to commit
`3c4a4880eaa4ebb2eec0e6b235e6474a3375fb27`. Its architecture, pipeline, status
table and review workflow are in `src/components/PolicyGapStudy.tsx`. Shared
configuration and source references live in `src/data/policyGapData.json`.
Run `python scripts/generate-policygap-visuals.py` with matplotlib to regenerate
the chunking and priority charts (PNG/SVG) and CSV examples. These explain the
method; they are not accuracy or latency benchmarks. The interactive priority
example uses `src/lib/policyGapScoring.ts`. No assessment service is called from
the portfolio. Documentation/code differences are described in the page's source
notes. The source PDF is never copied by the chart generator or website build.

PolicyGap also has a 60-second recorded demo after its overview. Its cropped
H.264 MP4 lives in `public/videos/policygap-demo.mp4`; a WebP dashboard preview
appears before playback. The video loads when the visitor presses Play, with
native controls, a written walkthrough for the silent recording and a Google
Drive backup link. Media metadata is in `src/data/caseStudies.ts`.
Run `python scripts/prepare-policygap-demo.py "path/to/PolicyGap_demo_1min.mp4"`
with ffmpeg and ffprobe installed to regenerate the video and poster from the
external original. See [the demo notes](docs/policygap-demo.md) for crop and
verification details.

The layout follows [Joseph Rollin's portfolio course](https://portfoliocourse-josephrollin.framer.website/)
and takes inspiration from [Brittany Chiang's portfolio](https://brittanychiang.com/):
a one-line introduction, five selected projects with short summaries and previews,
visible contact and CV links, and a separate archive. Contributions stay within
each project description. All five projects link to longer case studies, with
repository links available alongside them.

About follows the introduction, with selected projects next. Navigation links
and the numbered section labels follow the same order.
The main skills list keeps AI, knowledge/data methods, software engineering and
languages visible; a native disclosure holds the additional development and data
tools. The navigation follows the same order.

The [case-study guidance](https://portfoliocourse-josephrollin.framer.website/services/show-projects-as-case-studies)
informs the short project summaries, stack tags and labelled results or study scope.
The previews use an original report figure, property-mapping and retrieval diagrams,
and saved metrics from the shared project data. They are implemented in
`src/components/ProjectPreview.tsx` with HTML/CSS and lazy-loaded images, including
the supplied PolicyGap logo. The same logo appears on the PolicyGap detail page.
Responsive 320px and 640px lossless WebP versions reduce its download size; the
supplied PNG remains the fallback. Run `python scripts/optimize-policygap-logo.py`
with Pillow to regenerate them and check the decoded pixels.
The source-distance qualifier for NLP and public-set tuning note for retrieval
stay visible beside those scores.

Following the [contact guidance](https://portfoliocourse-josephrollin.framer.website/services/the-site-itself-is-proof),
the introduction, Contact and footer offer an Email me link. Contact and the
footer also provide a labelled Copy email button, with GitHub, LinkedIn, a PDF
CV and internship availability nearby. The address is hidden from visible text
at Salma's request; it remains in the email links and clipboard action. Keyboard focus, reduced
motion support, light/dark contrast and responsive layouts follow the
[site guidance](https://portfoliocourse-josephrollin.framer.website/services/personality-should-demonstrate-skill).
The serif/sans type scale and plum/sage palette are retained. No invented project
metrics or separate contribution sections are added.

Detailed project components load only on project routes. The server still renders
their full content during the build, and the client waits for the matching
component before hydrating a project page. An early theme script applies the
saved or system colour preference before paint. The hero animation responds to
reduced-motion changes and pauses when outside the viewport.

The [course review](docs/portfolio-course-audit.md) maps each recommendation to
the implementation and records the remaining browser-verification limit.
The [project-page review](docs/project-page-review.md) records the source-content
checks and corrections. The verifier keeps report links exclusive to the VLM
research page.
After `npm run build`, run `npm run check:build` to verify all eleven routes,
metadata, local links and fragments, image dimensions/alt attributes, label
references, sitemap and the permitted public PDF files. The deployment workflow
runs the same verifier before uploading its artifact.

### Editing the writing

The [Humanizer skill](.agents/skills/humanizer/SKILL.md) is installed for this
project. Use `$humanizer` when revising portfolio text. Keep personal details,
technical claims, team contributions, results and repository links accurate.

Source: [blader/humanizer](https://github.com/blader/humanizer), version 3.1.0,
commit `8c307f367c91bd974002f10f2be2965d642c13df` (MIT license).

## Search visibility

The production build prerenders the React components into HTML, including the full
portfolio and GitHub profile links. JavaScript then adds interactivity. Canonical
and profile metadata in `index.html` connect this site to Salma Alkhalily's public
profiles. Keep that metadata in sync when changing the profile name or links.

`public/robots.txt` allows crawling and advertises `public/sitemap.xml`, which lists
the homepage, project archive and nine project studies. These files help discovery;
they do not guarantee indexing or ranking.

After publishing, use [Google Search Console](https://search.google.com/search-console/)
to add the URL-prefix property `https://salmaalkhalily.github.io/`. Verify ownership
using Google's HTML file (place it in `public/` and redeploy) or the HTML meta tag
(add the exact tag Google provides to `index.html` and redeploy). Submit
`https://salmaalkhalily.github.io/sitemap.xml`, then inspect the homepage URL and
request indexing. Leave the verification file or tag in place.

The HTML-file verification method is configured with
`public/googlef3f50f4a7d46d6b6.html`. Keep this file deployed so Google can recheck
ownership. After verification, inspect `https://salmaalkhalily.github.io/` in Search
Console, use **Test live URL**, and then **Request indexing** if the live test
passes. Submit `sitemap.xml` in the **Sitemaps** section. The verification file is
not a portfolio page and should not be added to the sitemap.

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
