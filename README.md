# RYGNeco Reporting Engine

A client-facing **e-waste impact reporting engine** — the module that turns raw pickup and processing data into branded, board-ready sustainability reports. Built within RYGNeco (co-founded with Leila Meyer), as part of the RYGNeco e-waste management platform.

## What it does

Clients who recycle electronics through RYGNeco need proof of impact: for ESG disclosures, compliance files, CSR pages, and tax documentation. This engine generates that proof on demand — from a single pickup receipt to a full annual impact report — with the sections, branding, and export format the client chooses.

## Architecture

A pluggable, dependency-light core with three cooperating pieces:

| Component | Role |
|---|---|
| `src/core/ReportGenerator.js` | Orchestrates report assembly: header, selected sections, footer, metadata |
| `src/core/DataProcessor.js` | Aggregates raw pickup/device data into KPIs, environmental equivalencies (CO2e, materials recovered), and financial impact |
| `src/core/TemplateEngine.js` | Renders sections through Handlebars-style templates with registered formatters |

Supporting layers:

- `src/config/` — declarative definitions: **5 report types** (per-pickup, monthly, quarterly, semi-annual, annual), **8 toggleable core sections** (executive summary, KPIs, environmental impact, asset tracking, financial impact, CSR impact, compliance, recommendations) plus 4 specialized ones (data destruction certificates, processing breakdown, timeline, benchmarking), and default export settings
- `src/styles/` — base, component, and print stylesheets
- `src/templates/` — report page templates (quarterly sample included)
- `src/utils/` — date utilities, formatters, validators
- `integration-ready/` — a self-contained React + Material UI `ReportingModule.js` used to drop the engine into the platform's client dashboard

## Export formats

`pdf`, `html`, and `json` — PDF generation via **jsPDF** + **html2canvas**, templating via **Handlebars** (see `package.json`).

## Try the demo

No install needed for a first look:

- **Open `demo.html` directly in a browser** — it renders standalone and walks through report types and section toggles.
- **Open `full-e-waste-report.html`** — a complete, print-ready sample client report (also standalone).

To serve it instead:

```bash
node server.js     # http://localhost:9000
# or
node run-demo.js   # http://localhost:3000, guided demo server
```

`npm install` is only required for the Vite dev/build/test toolchain (`npm run dev`, `npm run build`, `npm test`).

## Repository layout

```
src/
  core/       ReportGenerator, DataProcessor, TemplateEngine
  config/     reportTypes, sections, defaults
  styles/     base.css, components.css, print.css
  templates/  quarterly-report.html
  utils/      dateUtils, formatters, validators
integration-ready/   React/MUI dashboard integration module
demo.html            standalone interactive demo
full-e-waste-report.html  standalone sample report
server.js / run-demo.js   tiny Node servers for local preview
create-report.ps1    PowerShell one-shot report builder
```

Note: the customizer/viewer UI components referenced by `src/index.js` live in the main platform dashboard; this repo ships the engine core plus the `integration-ready/` bridge used to embed it there. `INTEGRATION_GUIDE.md` documents the full dashboard integration path.

## Attribution

Built within RYGNeco (co-founded with Leila Meyer, CEO & lead developer) as part of the RYGNeco platform, 2025.
