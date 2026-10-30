"""Build public/Salma-Alkhalily-CV.pdf, the one-page CV linked from the portfolio.

Edit the content below and run `python scripts/generate-cv.py` with ReportLab installed.
Text is set in Arial, or the metric-compatible Liberation Sans where Arial is missing.
Positions are baselines measured in points from the top of the A4 page.
"""
from pathlib import Path
import re

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Salma-Alkhalily-CV.pdf"
SITE = "https://salmaalkhalily.github.io"

FONT_FILES = [
    ("C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"),
    ("/usr/share/fonts/truetype/msttcorefonts/Arial.ttf", "/usr/share/fonts/truetype/msttcorefonts/Arial_Bold.ttf"),
    ("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
     "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"),
]
fonts = next((pair for pair in FONT_FILES if all(Path(p).exists() for p in pair)), None)
if fonts is None:
    raise SystemExit("Arial or Liberation Sans is required; add its location to FONT_FILES.")
pdfmetrics.registerFont(TTFont("CV", fonts[0]))
pdfmetrics.registerFont(TTFont("CV-Bold", fonts[1]))
FONT = {False: "CV", True: "CV-Bold"}

INK, MUTED, BAND, SIDEBAR, SUBTLE = (HexColor(c) for c in ("#282b30", "#4d525a", "#35383e", "#efe9e3", "#e8e9eb"))
PAGE_W, PAGE_H = A4
HEADER_H, SIDEBAR_W = 116, 201
MIN_BOTTOM_MARGIN = 24

# Vertical rhythm of the main column, from the last baseline to the next one.
SECTION_GAP = 22.5  # last line of a section -> next section title
ENTRY_GAP = 19  # last bullet of an entry -> next entry title
BULLET_GAP = 15.2  # metadata or previous bullet -> bullet


def B(text):
    return (text, True, None)


def link(text, url, bold=False):
    return (text, bold, url)


def text_width(text, bold, size):
    return pdfmetrics.stringWidth(text, FONT[bold], size)


def words(parts):
    """Split runs into words; one word may mix runs, such as bold text followed by ';'.
    A no-break space (\\u00a0) keeps two words on one line."""
    result, word = [], []
    for part in parts:
        text, bold, url = part if isinstance(part, tuple) else (part, False, None)
        for piece in re.split(r"([ \t\n]+)", text):
            if piece.isspace():
                if word:
                    result.append(word)
                    word = []
            elif piece:
                word.append((piece, bold, url))
    return result + [word] if word else result


def wrap(parts, size, first_width, width):
    space = text_width(" ", False, size)
    lines, line, used = [], [], 0.0
    for word in words(parts):
        w = sum(text_width(text, bold, size) for text, bold, _ in word)
        if line and used + space + w > (width if lines else first_width):
            lines.append(line)
            line, used = [], 0.0
        used += (space if line else 0) + w
        line.append(word)
    return lines + [line] if line else lines


def draw_line(c, line, x, baseline, size, color):
    space = text_width(" ", False, size)
    y = PAGE_H - baseline
    links = []  # [url, x0, x1]; neighbouring words with one URL share an underline
    c.setFillColor(color)
    for i, word in enumerate(line):
        x += space if i else 0
        for text, bold, url in word:
            w = text_width(text, bold, size)
            c.setFont(FONT[bold], size)
            c.drawString(x, y, text)
            if url and links and links[-1][0] == url and x - links[-1][2] <= space + 0.01:
                links[-1][2] = x + w
            elif url:
                links.append([url, x, x + w])
            x += w
    c.setStrokeColor(color)
    c.setLineWidth(0.55)
    for url, x0, x1 in links:
        c.line(x0, y - 0.125 * size, x1, y - 0.125 * size)
        c.linkURL(url, (x0, y - 0.125 * size, x1, y + 1.22 * size), relative=0, thickness=0)


def draw_text(c, parts, x, baseline, size, color):
    draw_line(c, words(parts), x, baseline, size, color)


class Column:
    """Flows text down one column; `y` is the latest baseline or section rule."""

    def __init__(self, c, x, width, heading_size, rule_offset):
        self.c, self.x, self.width = c, x, width
        self.heading_size, self.rule_offset = heading_size, rule_offset
        self.y = HEADER_H

    def text(self, parts, gap, size=10.2, color=INK, leading=13.7, indent=0):
        self.y += gap
        for i, line in enumerate(wrap(parts, size, self.width, self.width - indent)):
            self.y += leading if i else 0
            draw_line(self.c, line, self.x + (indent if i else 0), self.y, size, color)

    def heading(self, title, gap):
        self.text([B(title)], gap, size=self.heading_size)
        self.y += self.rule_offset
        self.c.setStrokeColor(BAND)
        self.c.setLineWidth(0.55)
        self.c.line(self.x, PAGE_H - self.y, self.x + self.width, PAGE_H - self.y)


def entry(column, title, meta, bullets, gap):
    column.text([title], gap, size=10.5)
    column.text([meta], 14.5, size=10, color=MUTED)
    for bullet in bullets:
        column.text(["- ", *bullet], BULLET_GAP, indent=8)


c = Canvas(str(OUTPUT), pagesize=A4)
c.setTitle("Salma Alkhalily - Machine Learning Engineer Intern")
c.setAuthor("Salma Alkhalily")
c.setSubject("One-page industry resume; six-month final-year internship from March 2027")

c.setFillColor(SIDEBAR)
c.rect(0, 0, SIDEBAR_W, PAGE_H - HEADER_H, stroke=0, fill=1)
c.setFillColor(BAND)
c.rect(0, PAGE_H - HEADER_H, PAGE_W, HEADER_H, stroke=0, fill=1)
draw_text(c, [B("Salma Alkhalily")], 31, 54, 27, white)
draw_text(c, ["Machine Learning Engineer Intern"], 31, 78, 15, white)
draw_text(c, ["Searching for a six-month final-year internship | Available from March 2027"], 31, 99.2, 10.2, SUBTLE)

# Sidebar
side = Column(c, 30, SIDEBAR_W - 50, heading_size=11.5, rule_offset=7.5)
side.heading("CONTACT", 25.5)
side.text(["Paris, France"], 16.2)
for label, url in [
    ("+33 7 64 14 33 79", "tel:+33764143379"),
    ("salma.alkhalily96@gmail.com", "mailto:salma.alkhalily96@gmail.com"),
    ("salmaalkhalily.github.io", f"{SITE}/"),
    ("github.com/SalmaAlkhalily", "https://github.com/SalmaAlkhalily"),
    ("linkedin.com/in/salmaalkhalily", "https://www.linkedin.com/in/salmaalkhalily/"),
]:
    side.text([link(label, url)], 15.7)

side.heading("TECHNICAL SKILLS", 30)
for i, (group, items) in enumerate([
    ("ML & NLP", "Python, scikit-learn, PyTorch, Hugging Face Transformers, XGBoost, Pandas, NumPy"),
    ("Retrieval & data", "TF-IDF, BM25, embeddings, RAG, ChromaDB, SQL, Redis, SPARQL, Apache Spark, Hadoop"),
    ("Engineering", "FastAPI, Git, Docker, Java, Kotlin, Swift"),
]):
    side.text([B(group)], 21.7 if i else 16.2)
    side.text([items], 14.7)

side.heading("EDUCATION", 28)
for i, (degree, school, period, note) in enumerate([
    ("M2 Data, Knowledge and Hybrid Artificial Intelligence (DKAI)", "Université Paris-Saclay", "Sep 2026 - Present", None),
    ("M1 Data Science", "Université Paris-Saclay", "Sep 2025 - Jul 2026", None),
    ("BSc Information Technology Engineering", "Damascus University", "Oct 2015 - Nov 2020",
     "Software Engineering | 15.4/20"),
]):
    side.text([B(degree)], 22.7 if i else 16.2)
    side.text([school], 14.7)
    side.text([period], 13.5, size=10, color=MUTED)
    if note:
        side.text([note], 13.7)

side.heading("LANGUAGES", 28)
side.text([B("Arabic:"), " native"], 16.2)
side.text([B("English & French:"), " professional working proficiency"], 16.7)

# Main column
main = Column(c, SIDEBAR_W + 18, PAGE_W - SIDEBAR_W - 49, heading_size=12, rule_offset=7)
main.heading("PROFILE", 26)
main.text(["M2 student in Data, Knowledge and Hybrid Artificial Intelligence (DKAI) at Université Paris-Saclay, "
           "with a software engineering background and projects in machine learning, NLP and retrieval."], 16.2)

main.heading("EXPERIENCE", SECTION_GAP + 1)
entry(main, B("Software Engineer | Blue Smart Apps"), "Remote, Damascus | Apr 2020 - Mar 2023", [
    ["Built ListedNearMe for Android using Kotlin, Jetpack Compose and Firebase, covering requirements, design "
     "and implementation."],
    ["Contributed to iOS (Swift) and web development; integrated Firebase Functions, Google Maps, Algolia and "
     "Google Analytics."],
], 16.5)
entry(main, B("Freelance Software Engineer"), "Mar 2020 - Sep 2022", [
    ["Developed Java desktop applications for clients, such as ",
     link("Phone Generator", f"{SITE}/projects/phone-generator.html"),
     ", which generates phone-number lists as vCard contacts."],
], ENTRY_GAP)

main.heading("PROJECTS", SECTION_GAP)
for i, (title, page, meta, bullets) in enumerate([
    ("Examining the Effect of Face Accessories in VLM Face Evaluation", "vlm-face-accessories",
     "M2 group research | Team of 5 | Sep - Oct 2026",
     [["Reviewed generated portraits and analysed objective and subjective evaluation results across ",
       B("720 synthetic identities (2,880 images)"), "; contributed to the subjective track."]]),
    ("PolicyGap - policy evidence retrieval", "policygap", "Summer school competition | Team of 4 | Jun - Jul 2026",
     [["Built the complete codebase for a four-person team, comparing policy evidence with NIST, ISO and CIS "
       "requirements."],
      ["Implemented embeddings, vector search and LLM-based gap analysis with Python, FastAPI, ChromaDB and React."]]),
    ("Scientific article information retrieval", "scientific-article-retrieval",
     "M1 course challenge | Team of 3 | Apr 2026",
     [["Contributed throughout the lexical/dense retrieval and eight-signal fusion project over ",
       B("20,000 papers"), "; our team ranked ", B("first at the submission deadline"), "."]]),
    ("Human, AI-generated and mixed text", "ai-text-detection", "NLP course | Team of 3 | Jan - Feb 2026",
     [["Compared classical models and transformers for text classification and human-share regression."]]),
]):
    entry(main, link(title, f"{SITE}/projects/{page}.html", bold=True), meta, bullets, ENTRY_GAP if i else 16.5)

main.heading("CERTIFICATIONS", SECTION_GAP)
main.text([link("AI Technologies Summer School 2026 (120 hours, 4 ECTS)",
                f"{SITE}/images/certificates/summer-school-participation.jpg")], 16.2)
main.text(["Ivan Franko National University of Lviv | Jul 2026"], 14.5, size=10, color=MUTED)
main.text(["IBM / Coursera | Jan 2024"], 17.5, size=10, color=MUTED)
main.text([link("Python for Data Science, AI & Development",
                "https://www.coursera.org/account/accomplishments/records/G7NRB8VKSTPW")], 16.7)
main.text([link("Getting Started with Git and GitHub",
                "https://www.coursera.org/account/accomplishments/records/ARBK5C3CRRUS")], 15.7)

bottom = PAGE_H - max(side.y, main.y)
if bottom < MIN_BOTTOM_MARGIN:
    raise SystemExit(f"CV overflows one page: {bottom:.1f}pt bottom margin, {MIN_BOTTOM_MARGIN}pt needed.")
c.save()
print(f"Wrote {OUTPUT.relative_to(ROOT)} ({bottom:.1f}pt bottom margin)")
