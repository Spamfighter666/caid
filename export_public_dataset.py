import json
from pathlib import Path
import pandas as pd

SOURCE_XLSX = "caid_master.xlsx"
SHEET_NAME = "Sheet1"
OUT_JSON = Path("data/incidents.json")
OUT_CSV = Path("data/incidents.csv")

def pick(row, cols, default=""):
    for c in cols:
        if c in row and pd.notna(row[c]) and str(row[c]).strip() != "":
            return row[c]
    return default

def normalize_bool(val):
    s = str(val).strip().lower()
    if s in {"yes","true","1"}: return True
    if s in {"no","false","0"}: return False
    return None

df = pd.read_excel(SOURCE_XLSX, sheet_name=SHEET_NAME, engine="openpyxl")
df.columns = [str(c).strip() for c in df.columns]

records = []
for _, row in df.iterrows():
    rec_id = pick(row, ["record_id"], 0)
    try:
        rec_id = int(float(rec_id))
    except Exception:
        rec_id = 0
    rec = {
        "id": rec_id,
        "date": str(pick(row, ["incident_date","date"], "")),
        "city": str(pick(row, ["city"], "")),
        "province": str(pick(row, ["province"], "")),
        "target_name": str(pick(row, ["canonical_target_name","target_name","target_entity"], "")),
        "target_type": str(pick(row, ["target_category","target_type"], "")),
        "incident_type": str(pick(row, ["attack_type","incident_type","incident_category"], "")),
        "description": str(pick(row, ["summary"], "")),
        "severity": str(pick(row, ["early_warning_band","confidence_level"], "reported")),
        "arrests": normalize_bool(pick(row, ["arrests_made","arrest_made"], "")),
        "charges": str(pick(row, ["charge_types"], "")),
        "court_jurisdiction": str(pick(row, ["court_jurisdiction"], "")),
        "police_agency": str(pick(row, ["police_agency"], "")),
        "police_file_number": str(pick(row, ["police_file_number"], "")),
        "damage_estimate_cad": str(pick(row, ["damage_estimate_cad"], "")),
        "source": str(pick(row, ["source_url","police_reference_url"], "")),
        "notes": str(pick(row, ["notes"], "")),
    }
    records.append(rec)

OUT_JSON.parent.mkdir(exist_ok=True)
OUT_JSON.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
pd.DataFrame(records).to_csv(OUT_CSV, index=False)
print(f"Wrote {OUT_JSON} and {OUT_CSV}")
