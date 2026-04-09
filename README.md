# CAID Phase 1 GitHub Pages Template

This folder is a GitHub Pages-ready Phase 1 template for CAID.

## What it does
- publishes a sanitized public export of Sheet1
- provides a searchable incident table
- provides clickable record-level detail pages
- uses a static JSON data source

## Files
- `index.html` — public dataset table
- `incident/incident.html` — detail page
- `assets/style.css` — presentation
- `assets/script.js` — table filtering and navigation
- `assets/incident.js` — detail page rendering
- `data/incidents.json` — public export
- `data/incidents.csv` — public export
- `export_public_dataset.py` — regenerate public data from the private workbook

## GitHub Pages
1. Create a repo named `caid`
2. Upload these files
3. Go to Settings → Pages
4. Choose Deploy from a branch
5. Select `main` and `/root`
6. Visit `https://<your-username>.github.io/caid/`

## Public/private model
Only the public JSON / CSV export should be committed.
The private master workbook should remain outside the public repository.
