"""Plot saved NLP notebook scores. This script does not execute or train notebook models."""
from pathlib import Path
import csv
import json

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "images" / "projects"
ASSETS.mkdir(parents=True, exist_ok=True)
data = json.loads((ROOT / "src" / "data" / "nlpResults.json").read_text(encoding="utf-8"))

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "svg.fonttype": "none",
                     "text.color": "#221a2c", "xtick.color": "#504958", "ytick.color": "#221a2c"})
palette = {"TF-IDF + source distance": "#5b3b7a", "Text only": "#496f60"}

def save(fig, name):
    fig.savefig(ASSETS / f"{name}.png", dpi=180, bbox_inches="tight", facecolor="white")
    fig.savefig(ASSETS / f"{name}.svg", bbox_inches="tight", facecolor="white")
    plt.close(fig)

def style(ax):
    ax.invert_yaxis()
    ax.tick_params(length=0, pad=8)
    ax.grid(axis="x", color="#ebe7ee", zorder=0)
    ax.set_axisbelow(True)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.legend(handles=[Patch(color=color, label=label) for label, color in palette.items()],
              loc="upper left", bbox_to_anchor=(0, -0.19), ncol=2, frameon=False, fontsize=10)

for key, metric, name, title, subtitle, axis, limit in [
    ("classification", "f1Macro", "nlp-classification-comparison", "Human, mixed or AI: classification",
     "Saved test results on 2,711 texts. Model inputs differ as shown in the legend.",
     "Macro F1 (higher is better)", 1.05),
    ("regression", "rmse", "nlp-regression-comparison", "Estimating the human-written share",
     "Saved test results on 2,711 texts; targets and predictions range from 0 to 1.",
     "RMSE (lower is better)", 0.28),
]:
    rows = sorted(data[key], key=lambda row: row[metric], reverse=(key == "classification"))
    fig, ax = plt.subplots(figsize=(10, 4.8 if key == "classification" else 4.2), layout="constrained")
    bars = ax.barh([row["model"] for row in rows], [row[metric] for row in rows], height=0.6,
                   color=[palette[row["input"]] for row in rows])
    ax.bar_label(bars, labels=[f'{row[metric]:.4f}' for row in rows], padding=7, fontsize=11)
    ax.set_xlim(0, limit)
    ax.set_xlabel(axis, labelpad=10)
    ax.set_title(title, loc="left", fontsize=16, weight="bold", pad=36)
    ax.text(0, 1.04, subtitle, transform=ax.transAxes, fontsize=10, color="#504958")
    style(ax)
    save(fig, name)

for name, rows, columns in [
    ("nlp-classification-comparison", data["classification"], ["model", "input", "accuracy", "f1Macro", "f1Weighted", "precisionMacro", "recallMacro"]),
    ("nlp-regression-comparison", data["regression"], ["model", "input", "mse", "rmse", "mae", "r2"]),
    ("nlp-xgboost-confusion", data["confusion"]["rows"], ["actual", "human", "mixed", "ai"]),
]:
    with (ASSETS / f"{name}.csv").open("w", newline="", encoding="utf-8") as stream:
        writer = csv.DictWriter(stream, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)

print("Generated NLP classification and regression charts (PNG/SVG) and three CSV tables.")
