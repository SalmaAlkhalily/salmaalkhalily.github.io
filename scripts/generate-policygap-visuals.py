"""Explain documented PolicyGap formulas; no assessment data or benchmark results are used."""
from pathlib import Path
import csv
import json

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.ticker import FuncFormatter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "images" / "projects"
ASSETS.mkdir(parents=True, exist_ok=True)
data = json.loads((ROOT / "src" / "data" / "policyGapData.json").read_text(encoding="utf-8"))

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "svg.fonttype": "none",
                     "text.color": "#221a2c", "xtick.color": "#504958", "ytick.color": "#504958"})

def save(fig, name):
    fig.savefig(ASSETS / f"{name}.png", dpi=180, bbox_inches="tight", facecolor="white")
    fig.savefig(ASSETS / f"{name}.svg", bbox_inches="tight", facecolor="white")
    plt.close(fig)

def clean(ax):
    ax.set_axisbelow(True)
    ax.tick_params(length=0, pad=8)
    for spine in ax.spines.values():
        spine.set_visible(False)

def priority(score, confidence):
    if score is None or score >= 1:
        return 0.0
    example = data["priorityExample"]
    return round(example["businessImpact"] * example["weight"] * (1-score) * (0.5+0.5*confidence), 4)

confidence = [i/100 for i in range(101)]
fig, ax = plt.subplots(figsize=(10, 5.5), layout="constrained")
for score, label, color, style in [
    (0, "Not implemented / needs review", "#5b3b7a", "-"),
    (0.5, "Partially implemented", "#496f60", "-"),
    (1, "Implemented", "#6b6472", "--"),
]:
    ax.plot(confidence, [priority(score, c) for c in confidence], label=label, color=color, linestyle=style, linewidth=2.5)
example_c = data["priorityExample"]["confidence"]
ax.axvline(example_c, color="#a49aaa", linestyle=":", linewidth=1.2)
for score, color, offset in [(0, "#5b3b7a", (-55, -25)), (0.5, "#496f60", (-55, 13))]:
    y=priority(score,example_c)
    ax.scatter([example_c],[y],color=color,s=40,zorder=4)
    ax.annotate(f"{y:g}",(example_c,y),textcoords="offset points",xytext=offset,color=color,weight="bold")
ax.set_xlim(0,1);ax.set_ylim(-.04,1.06)
ax.set_xlabel("Model-reported confidence", labelpad=10)
ax.set_ylabel("Gap priority", labelpad=10)
ax.set_title("How status and confidence affect priority", loc="left", fontsize=16, weight="bold", pad=36)
ax.text(0,1.04,"Formula illustration: business impact = 1 and control weight = 1.",transform=ax.transAxes,fontsize=10,color="#504958")
ax.grid(color="#ebe7ee")
ax.legend(loc="upper left",bbox_to_anchor=(0,-.18),ncol=2,frameon=False,fontsize=10)
clean(ax);save(fig,"policygap-priority")

chunk=data["chunking"]
length=chunk["nominalTokens"]*chunk["charactersPerToken"]
overlap=chunk["overlapTokens"]*chunk["charactersPerToken"]
step=length-overlap
windows=[{"chunk":i+1,"start_character":i*step,"end_character":i*step+length,
          "overlap_with_previous":overlap if i else 0} for i in range(3)]
fig,ax=plt.subplots(figsize=(10,4.4),layout="constrained")
for i,row in enumerate(windows):
    ax.barh(i,length,left=row["start_character"],height=.5,color="#5b3b7a")
    if i>0:ax.barh(i,overlap,left=row["start_character"],height=.5,color="#496f60")
    if i<len(windows)-1:ax.barh(i,overlap,left=row["end_character"]-overlap,height=.5,color="#496f60")
    ax.text(row["start_character"]+length/2,i,f'{row["start_character"]:,} to {row["end_character"]:,}',ha="center",va="center",color="white",fontsize=10)
ax.set_yticks(range(3),["Chunk 1","Chunk 2","Chunk 3"]);ax.invert_yaxis()
ax.set_xlim(-50,windows[-1]["end_character"]+50)
ax.set_xlabel("Character position in an illustrative text",labelpad=10)
ax.xaxis.set_major_formatter(FuncFormatter(lambda x,_:f"{int(x):,}"))
ax.grid(axis="x",color="#ebe7ee")
ax.set_title("Overlapping chunks retain nearby context",loc="left",fontsize=16,weight="bold",pad=36)
ax.text(0,1.05,f"Nominal windows: {length:,} characters, including {overlap:,} characters of overlap.",transform=ax.transAxes,fontsize=10,color="#504958")
ax.legend(handles=[Patch(color="#5b3b7a",label="Chunk text"),Patch(color="#496f60",label="Shared with a neighbour")],
          loc="upper left",bbox_to_anchor=(0,-.25),ncol=2,frameon=False,fontsize=10)
clean(ax);save(fig,"policygap-chunking")

samples=[{"confidence":c,"not_implemented_or_needs_review":priority(0,c),
          "partially_implemented":priority(.5,c),"implemented":priority(1,c)} for c in confidence]
for name,rows in [("policygap-priority",samples),("policygap-chunking",windows)]:
    with (ASSETS/f"{name}.csv").open("w",newline="",encoding="utf-8") as stream:
        writer=csv.DictWriter(stream,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
print("Generated two explanatory PolicyGap charts (PNG/SVG) and CSV data. No PDF was copied.")
