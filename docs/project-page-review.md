# Project-page review

Reviewed on 23 October 2026 against the supplied PDFs, saved notebook outputs,
repository source snapshots and [local software run notes](software-project-runs.md).
This checks the accuracy of the portfolio descriptions. It does not repeat model
training, run the ML notebooks or establish complete application functionality.

| Page | Evidence and result |
| --- | --- |
| SHACL validation | Supplied TER PDF and implementation: workflow, SAKey configuration, mapping example and validation outputs agree. Academic-report buttons, links and mentions removed; figures retained. |
| Face accessories and VLM evaluation | Supplied research PDF: sample sizes, review counts, all 18 accuracy changes, tables and statistical methods agree. Research report links and citations retained. |
| Scientific article retrieval | Notebook at `9828a5a7ff94cef682af61774c65f3646d827586`: scores, weights and dataset counts agree. Added the change from full-text public GTE queries to title/abstract held-out queries. Removed the presentation PDF link and reference. |
| Human, AI and mixed-text detection | Notebooks at `2b76a5548ae23ba46e49633a3c1e86f36e58a2ba`: dataset counts, classification and regression scores, feature differences and error analysis agree. No academic-report link. |
| PolicyGap | Implementation at `3c4a4880eaa4ebb2eec0e6b235e6474a3375fb27`: corrected concurrent-batch wording to sequential batch processing. Explained that the LLM prompt uses two 400-character excerpts from up to five retrieved chunks, a 150-character requirement, and conversion of parsed `needs_human_review` results to `not_implemented`. Scoring examples remain illustrative. No source PDF link. |
| OURAMAZONE | Reviewed service source and prior local runs: labelled as a backend prototype; dashboard and endpoint verification limits remain explicit. |
| Internet Download Manager | Removed unsupported HTTPS, implemented FTP and queue claims. The source accepts HTTP URLs; FTP is an unfinished form. Interface launch is distinguished from real transfer verification. |
| Automate DFA | Archive summary now specifies diagrams for bundled examples, matching the implementation. General diagram generation is not claimed. |
| Phone Generator | Archive summary now describes sequential lists and vCard export, matching the implementation. Successful phonebook import is not claimed. |

The SHACL and IR PDFs remain as unlinked public source assets. Hiding their links
does not make those files private. PolicyGap's PDF remains outside public files.

`npm run build` and `npm run check:build` passed for all 11 generated pages and
403 local references. The verifier checks local links and fragments, metadata,
image attributes, accessibility references and report-link visibility. Only the
VLM research page may link to a report, and its research PDF must remain linked.

Salma confirmed both the SHACL project dates (March–May 2025) and M1 education
dates (September 2025–July 2026). Both are preserved as supplied.

This review and its validation were performed locally.
