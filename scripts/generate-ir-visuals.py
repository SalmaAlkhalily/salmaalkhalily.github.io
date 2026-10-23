"""Plot saved IR notebook results from src/data/irResults.json, without running the notebook."""
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
data = json.loads((ROOT / "src" / "data" / "irResults.json").read_text(encoding="utf-8"))
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 10, "svg.fonttype": "none",
                     "text.color": "#221a2c", "xtick.color": "#504958", "ytick.color": "#221a2c"})

def save(fig, name):
    fig.savefig(ASSETS / f"{name}.png", dpi=180, bbox_inches="tight", facecolor="white")
    fig.savefig(ASSETS / f"{name}.svg", bbox_inches="tight", facecolor="white")
    plt.close(fig)

def style(ax):
    ax.invert_yaxis()
    ax.tick_params(length=0, pad=8)
    ax.grid(axis="x", color="#ebe7ee", zorder=0)
    ax.set_axisbelow(True)
    for spine in ax.spines.values(): spine.set_visible(False)

rows = data["comparison"]
fig, ax = plt.subplots(figsize=(10, 5.8), layout="constrained")
bars = ax.barh([r["model"] for r in rows], [r["ndcg10"] for r in rows], height=0.65,
               color=["#5b3b7a" if i == len(rows)-1 else "#6d8e80" for i in range(len(rows))])
ax.bar_label(bars, labels=[f'{r["ndcg10"]:.4f}' for r in rows], padding=6, fontsize=10)
ax.set_xlim(0, 0.86)
ax.set_xlabel("NDCG@10 (higher is better)", labelpad=10)
ax.set_title("Retrieval results on 100 public queries", loc="left", fontsize=16, weight="bold", pad=32)
ax.text(0, 1.02, "Saved notebook outputs; fusion weights were tuned on this public set.", transform=ax.transAxes, fontsize=10, color="#504958")
style(ax)
save(fig, "ir-retrieval-comparison")

weights = data["weights"]
palette = {"Dense": "#5b3b7a", "Sparse": "#496f60", "Metadata": "#887344"}
fig, ax = plt.subplots(figsize=(10, 5.8), layout="constrained")
bars = ax.barh([r["signal"] for r in weights], [r["weight"] for r in weights], height=0.65,
               color=[palette[r["type"]] for r in weights])
ax.bar_label(bars, labels=[f'{r["weight"]:.3f}' for r in weights], padding=6, fontsize=10)
ax.set_xlim(0, 0.37)
ax.set_xlabel("Optimised fusion weight (rounded)", labelpad=10)
ax.set_title("The eight active retrieval signals", loc="left", fontsize=16, weight="bold", pad=32)
ax.text(0, 1.02, "Weights from the GTE-large run, notebook section 8.6.", transform=ax.transAxes, fontsize=10, color="#504958")
ax.legend(handles=[Patch(color=color, label=label) for label,color in palette.items()],
          loc="upper left", bbox_to_anchor=(0, -0.16), ncol=3, frameon=False)
style(ax)
save(fig, "ir-fusion-weights")

for name, rows, columns in [
    ("ir-retrieval-comparison", data["comparison"], ["model", "ndcg10", "recall100", "map"]),
    ("ir-fusion-weights", data["weights"], ["signal", "weight", "type", "description"]),
]:
    with (ASSETS / f"{name}.csv").open("w",newline="",encoding="utf-8") as stream:
        writer=csv.DictWriter(stream,fieldnames=columns)
        writer.writeheader();writer.writerows(rows)
print("Generated IR comparison and fusion charts (PNG/SVG) and CSV data.")
