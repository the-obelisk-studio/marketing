# Manual screenshot checklist

Capture each screenshot in your browser at **https://dev.thydarkhour.com** while signed in as the org owner. Save each PNG at the exact path under `~/grace-docs/img/`. Path is relative — the directory tree gets created on commit.

## Setup (one-time, before you start)

- [ ] Sign in to dev as the **Sunrise Dev owner** (your main account).
- [ ] Select **Sunrise Dev** in the TopBar production switcher. Confirm it stays selected as you navigate between pages.
- [ ] **Window size**: maximize browser to at least **1440 × 900** for desktop shots. Use DevTools device-mode at **390 × 844** (iPhone 14 Pro) for mobile shots.
- [ ] **Zoom**: 100% (Cmd/Ctrl-0).
- [ ] **Theme**: light theme (toggle is on your user menu if it isn't already).
- [ ] **Banners**: dismiss any blue/gold/red banners that appear at the top of the dashboard (Subscribe, OwnerReadOnly, Lapsed) before capturing.
- [ ] **Grace Co-Pilot panel**: close it (chevron at top-right of the panel) so it doesn't dominate the right side of every screenshot. Open it back up only for the specific shots that document it.
- [ ] **Sidebar**: expanded (not collapsed) for all screenshots unless the entry says otherwise.

## How to take a screenshot

- **macOS**: `Cmd-Shift-4` then `Space` then click the browser window (captures just the window, no shadow with the `--no-shadow` flag). Or `Cmd-Shift-4` and drag.
- **Windows**: `Win-Shift-S` → window mode.
- **Linux**: `gnome-screenshot -w` (window) or a similar tool.
- **DevTools full-page**: in Chrome DevTools, Cmd-Shift-P → "Capture full size screenshot". Use this for `fullPage: true` entries (most workflow pages).

Save each PNG at the path listed below. Drop them straight into `~/grace-docs/img/<path>`.

---

## 1 — Concepts (3 shots)

- [ ] **`concepts/dashboard-home.png`** — `https://dev.thydarkhour.com/dashboard`
  Productions grid showing Sunrise Dev (+ any others). The home view before selecting a production. Sidebar hidden, OrgMenu gear icon visible in TopBar.

- [ ] **`concepts/per-production-dashboard.png`** — `/dashboard/production` (after selecting Sunrise)
  Full-page screenshot. Should show all 9 owner cards: DayHeader, YourCallToday, ComplianceFlags, CallSheetStatus, TodayOnSet, CrewCastOnSet, BudgetSnapshot, TodaysScenes, ShotListProgress. Confirm cards have real data (no skeleton bars).

- [ ] **`concepts/set-dashboard.png`** — `/dashboard/production/set`
  Full-page. Should include WeatherStrip at top, LocationLogistics + SafetyBulletin between header and hero card, hero card with day-1 scene, TomorrowGlance + CompanyMove banner, strip timeline, compliance footer, WalkieChannels at the bottom.

## 2 — Quickstart (1 shot)

- [ ] **`quickstart/sidebar-overview.png`** — `/dashboard/breakdown`
  Just the sidebar — crop tightly to it. Shows the 5 sections (Breakdown / Pre-Pro / Production / Vault / Settings) expanded. Used for "where to find things."

## 3 — Workflow 02: Script → Breakdown (3 shots)

- [ ] **`workflows/02-script-to-breakdown/scenes-list.png`** — `/dashboard/breakdown`
  Full-page. The scenes table populated with Sunrise's ~87 scenes. Scroll to top before capturing.

- [ ] **`workflows/02-script-to-breakdown/element-summary.png`** — `/dashboard/breakdown/summary`
  Full-page. Element categories grouped (cast / props / stunts / weapons / etc.) — should show the hazard elements we seeded.

- [ ] **`workflows/02-script-to-breakdown/cast-report.png`** — `/dashboard/breakdown/cast`
  Full-page. The 41 cast members with their workdays.

## 4 — Workflow 03: Pre-Production (8 shots)

- [ ] **`workflows/03-pre-production/schedule.png`** — `/dashboard/pre-pro/schedule`
  Full-page. The drag-friendly strip schedule with days laid out. Day 1 should be clearly visible.

- [ ] **`workflows/03-pre-production/budget.png`** — `/dashboard/pre-pro/budget`
  Full-page. Budget categories collapsed at the top level so structure is visible. Total should show in the rightmost column.

- [ ] **`workflows/03-pre-production/dood.png`** — `/dashboard/pre-pro/dood`
  Full-page. Day-out-of-days cast/work-day grid.

- [ ] **`workflows/03-pre-production/locations.png`** — `/dashboard/pre-pro/locations`
  Full-page. Locations list with at least the day-1 location geocoded.

- [ ] **`workflows/03-pre-production/props.png`** — `/dashboard/pre-pro/props`
  Full-page. Props inventory (10 rows).

- [ ] **`workflows/03-pre-production/shot-list.png`** — `/dashboard/pre-pro/shot-list`
  Full-page. Shot list grouped by scene. Should show ~55 shots.

- [ ] **`workflows/03-pre-production/purchase-orders.png`** — `/dashboard/pre-pro/purchase-orders`
  Full-page. The 10 seeded POs across approved/pending/rejected/paid.

- [ ] **`workflows/03-pre-production/vendors.png`** — `/dashboard/pre-pro/vendors`
  Full-page. 5 demo vendors + 1 existing = 6 rows.

- [ ] **`workflows/03-pre-production/documents.png`** — `/dashboard/pre-pro/documents`
  Full-page. Documents list (12 total — original 4 + 8 seeded compliance).

## 5 — Workflow 04: Call sheets (3 shots)

- [ ] **`workflows/04-call-sheets/day1-approved.png`** — `/dashboard/production/call-sheet`
  Full-page. Day 1 — should show APPROVED badge, general call 07:00, location Alana's Apartment, scenes + crew populated.

- [ ] **`workflows/04-call-sheets/crew-roster.png`** — `/dashboard/production/crew`
  Full-page. Crew table (23 rows) grouped by ATL/BTL/OTHER clusters.

- [ ] **`workflows/04-call-sheets/cast-roster.png`** — `/dashboard/production/cast`
  Full-page. Cast roster (41 rows) with workdays + character names.

## 6 — Workflow 05: Set Dashboard live shoot (2 shots — desktop covered in concepts, plus mobile)

- [ ] **`workflows/05-set-dashboard/day1.png`** — `/dashboard/production/set` (day 1)
  Same as `concepts/set-dashboard.png` but you can re-capture if you want a different framing. Same full-page.

  *(Note: this can be the same file as `concepts/set-dashboard.png` if you'd rather not duplicate. Skip if so.)*

## 7 — Workflow 06: Compliance (2 shots)

- [ ] **`workflows/06-compliance/dashboard.png`** — `/dashboard/compliance`
  Full-page. Compliance docs grouped by shoot day. Should show the 8 seeded doc types + originals.

- [ ] **`workflows/06-compliance/timecards-day1.png`** — `/dashboard/production/timecards`
  Full-page. Day-1 timecards with mix of gold (human) + blue (Grace) dots. Confirm initials column shows "JR" on the override rows.

## 8 — Workflow 07: Script Supervisor (2 shots)

- [ ] **`workflows/07-script-supervisor/dashboard.png`** — `/dashboard/production/script-supervisor`
  Full-page. Scenes/shots/takes/continuity layout.

- [ ] **`workflows/07-script-supervisor/creative-refs.png`** — `/dashboard/production/creative`
  Full-page. Creative refs / mood-board uploads.

## 9 — Workflow 08: VFX (1 shot)

- [ ] **`workflows/08-vfx/dashboard.png`** — `/dashboard/production/vfx`
  Full-page. VFX shots with status mix (required / captured / na).

## 10 — Workflow 09: Editor Log (1 shot)

- [ ] **`workflows/09-editor-log/circled-takes.png`** — `/dashboard/production/editor-log`
  Full-page. Scene → shot → circled takes tree. Should show 13 circled takes + 4 director picks.

## 11 — Workflow 10: Vault (3 shots)

- [ ] **`workflows/10-vault/screeners.png`** — `/dashboard/vault/screeners`
  Full-page. Screeners list — should show 2 existing screeners.

- [ ] **`workflows/10-vault/dailies.png`** — `/dashboard/vault/dailies`
  Full-page. Dailies packages — day-1 package visible.

- [ ] **`workflows/10-vault/dit-pipeline.png`** — `/dashboard/vault/dit`
  Full-page. DIT media cards — 3 cards across hot/offloading/verified statuses.

## 12 — Reference (3 shots)

- [ ] **`reference/access-control/page.png`** — `/dashboard/settings/access`
  Full-page. Crew rows with role chips + access overrides.

- [ ] **`reference/access-control/org-settings.png`** — `/dashboard/settings/org`
  Full-page. Org metadata, owner indicator, delete-org danger zone.

- [ ] **`reference/billing-and-seats/page.png`** — `/dashboard/settings/billing`
  Full-page. Plan / addons / seat usage / invoice history.

## 13 — Mobile variants (3 shots)

Switch DevTools to device mode, set 390 × 844 (iPhone 14 Pro), reload.

- [ ] **`concepts/per-production-dashboard-mobile.png`** — `/dashboard/production`
  Full-page. Cards stack to single column.

- [ ] **`workflows/04-call-sheets/day1-mobile.png`** — `/dashboard/production/call-sheet`
  Full-page on mobile width. Confirms call sheet renders cleanly on phone.

- [ ] **`workflows/05-set-dashboard/day1-mobile.png`** — `/dashboard/production/set`
  Full-page on mobile width. Confirms set dashboard timeline + cards stack.

---

## When you're done

Total: **31 screenshots** (one is optional, see Workflow 05). You can skip any that don't look good and we'll fill the gap with caption-only text in the docs.

After capturing:

```
cd ~/grace-docs
ls img/         # confirm structure
git add img/
git commit -m "docs: initial screenshot capture from Sunrise Dev"
git push
```

Then ping me and we'll move to Phase 1: scaffolding the actual markdown docs that reference these images.

## Optional: state setups for specific shots

A few entries benefit from a specific UI state. If you want them, set up the state then capture. Otherwise the default state works.

- **`workflows/02-script-to-breakdown/scenes-list.png`**: scroll so the first 5–7 scenes are visible. Don't capture mid-table.
- **`workflows/05-set-dashboard/day1.png`**: mark at least one strip "shooting" or "wrapped" so the timeline shows a non-default state (use the toggle button on a strip row). The CompanyMove banner only shows if day 2's move-strip is on today — viewing day 2 via the day-stepper is fine.
- **`workflows/06-compliance/timecards-day1.png`**: confirm one cell has its dot in gold (human override) and another nearby in blue (Grace fill). Both states should be visible in the same shot.
- **`reference/access-control/page.png`**: pick a crew row with overrides so the customize chip is visible.

If a screenshot ends up looking off (banner sneaks in, sidebar wrong width, etc.), retake — the path is overwrite-friendly.
