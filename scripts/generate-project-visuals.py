"""Regenerate portfolio visuals from the supplied reports.

Run with Python, matplotlib and PyMuPDF installed. No frontend dependency is needed.
"""
from pathlib import Path
import csv
import json

import fitz
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "images" / "projects"
ASSETS.mkdir(parents=True, exist_ok=True)

# Original vector diagram, TER report, PDF page 13 / printed page 9, Figure 2.1.
with fitz.open(ROOT / "public" / "reports" / "shacl-ter-report.pdf") as document:
    image = document[12].get_pixmap(
        matrix=fitz.Matrix(2, 2), clip=fitz.Rect(90, 135, 525, 701)
    )
    image.save(ASSETS / "shacl-key-discovery.png")

# VLM report, section 4.2, PDF page 4. The remainder includes both rejected and
# uncertain decisions; the report does not split these into separate counts.
data = json.loads((ROOT / "src" / "data" / "projectResults.json").read_text(encoding="utf-8"))
review = [(row["accessory"], row["reviewed"], row["accepted"]) for row in data["humanReview"]["rows"]]
data_path = ASSETS / "vlm-human-review.csv"
with data_path.open("w", newline="", encoding="utf-8") as stream:
    writer = csv.writer(stream)
    writer.writerow(["accessory", "reviewed", "accepted", "rejected_or_uncertain", "acceptance_percent"])
    for name, total, accepted in review:
        writer.writerow([name, total, accepted, total - accepted, f"{100 * accepted / total:.1f}"])

with (ASSETS / "vlm-accuracy-changes.csv").open("w", newline="", encoding="utf-8") as stream:
    writer = csv.writer(stream)
    writer.writerow(["attribute", "accessory", "minicpm_v_4_6_change_pp", "siglip_2_change_pp"])
    for row in data["accuracyChanges"]["rows"]:
        writer.writerow([row["attribute"], row["accessory"], row["miniCPM"], row["siglip"]])

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 11,
    "text.color": "#221a2c", "axes.labelcolor": "#221a2c",
    "xtick.color": "#504958", "ytick.color": "#221a2c",
    "svg.fonttype": "none",
})
fig, ax = plt.subplots(figsize=(9.6, 4.7), layout="constrained")
y = np.arange(len(review))
accepted_percent = np.array([100 * accepted / total for _, total, accepted in review])
ax.barh(y, accepted_percent, height=0.52, color="#496f60", label="Accepted", zorder=3)
ax.barh(y, 100 - accepted_percent, left=accepted_percent, height=0.52,
        color="#e3d9ed", label="Rejected or uncertain", zorder=3)
for row, (name, total, accepted), percent in zip(y, review, accepted_percent):
    ax.text(3, row, f"{percent:.1f}% accepted", va="center", color="white", weight="bold", fontsize=11)
    ax.text(103, row, f"{accepted}/{total}", va="center", fontsize=11)
ax.set_yticks(y, [name for name, _, _ in review])
ax.invert_yaxis()
ax.set_xlim(0, 118)
ax.set_xticks([0, 25, 50, 75, 100], ["0%", "25%", "50%", "75%", "100%"])
ax.set_xlabel("Share of reviewed edits", labelpad=10)
ax.set_title("Human review of generated accessory edits", loc="left", fontsize=16, weight="bold", pad=42)
ax.text(0, 1.09, "Reviewed subset only; sample sizes differ by accessory.", transform=ax.transAxes,
        color="#504958", fontsize=10)
ax.text(103, -0.6, "Accepted / reviewed", fontsize=9, color="#504958")
ax.set_ylim(2.65, -0.78)
ax.grid(axis="x", color="#ebe7ee", zorder=0)
ax.tick_params(axis="both", length=0, pad=8)
for spine in ax.spines.values():
    spine.set_visible(False)
ax.legend(loc="upper left", bbox_to_anchor=(0, -0.21), ncol=2, frameon=False, fontsize=10)
fig.savefig(ASSETS / "vlm-human-review.svg", bbox_inches="tight", facecolor="white")
fig.savefig(ASSETS / "vlm-human-review.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)
print("Generated SHACL diagram and human-review chart (PNG, SVG, CSV).")
