# Editor log

`/dashboard/production/editor-log`. The editor's handoff view — every circled take in the production, organized by scene → shot → take, with linked dailies clips. Exportable as EDL, FCPXML, CSV, or PDF for import into the editor's NLE.

![Editor log](../img/workflows/09-editor-log/circled-takes.png)

## What's shown

By default the view is "circled takes only." Each scene that has at least one circled take expands to show:

- **Shot rows** — per shot, with its takes.
- **Take rows** — circled takes by default, with camera report data (camera, lens, t-stop, filter, focus, duration) and the recording timestamp.
- **Director picks** — primary pick + any ranked alternates.
- **Dailies clip link** — if the DIT has delivered the day's dailies, the clip streams inline. Otherwise the raw media file name shows.

## Filters

Toggle filters in the page header to scope the view:

- **Shoot day** — narrow to a single day.
- **Scene** — narrow to one scene.
- **Show all takes** — include hold / NG takes alongside circled.

## Cross-version

The editor log is **cross-shot-list-version by design** (4.5a fix). It does NOT filter by shot list version because takes are production-scoped physical media. If you fork the shot list mid-production (e.g., add additional inserts on a revision), the editor log still surfaces all circled takes across all shot list versions for the same scene.

## Per-shot shoot day

The day a shot was captured is stamped at the take itself (when the Script Sup logs the take), not derived from the schedule. This way, even if the schedule changed after a shot was captured, the editor log still reflects when it actually rolled.

## Exports

From the editor log page, there are four export buttons:

### CSV

Flat per-take spreadsheet with all fields. Easy to import into Excel, Google Sheets, or scripts.

### PDF

Print-friendly version of the on-screen view. Goes to the editor or to lab transfer.

### EDL

CMX 3600-style edit decision list. **Paper cut only** — record timecode is synthesized starting from `01:00:00:00`, source timecode runs `00:00:00:00 → duration` per clip. Reel name is the dailies file name. A comment line at the top marks it as a paper cut so the editor knows to relink against real dailies on import.

This is intentional: Grace doesn't capture source timecode from the camera (4K cameras don't all expose TC). The EDL is a "here's the structure of what got circled" handoff — the actual conform happens in Avid / Premiere / Resolve after media is online.

### FCPXML

Final Cut Pro XML. Offline-structure-only — one asset per unique dailies clip, with local-file references. Imports as a sequence with red placeholders that the editor relinks against the real dailies. Same paper-cut intent as EDL.

## Why no AAF?

AAF (Advanced Authoring Format, Avid's interchange) requires specialized tooling to write properly. It's on the roadmap. In the meantime CSV + PDF + EDL + FCPXML cover the major NLE import paths.

## Director picks → editor log

When the director marks a take as a "select" via [Script Sup picks](07-script-supervisor.md), it appears in the editor log with a small icon indicator + rank. Useful for the editor to know which take to start cutting from when multiple takes are circled.

## What flows in here

- Takes from the [Script supervisor workflow](07-script-supervisor.md)
- Picks from the same workflow
- Dailies clips from [the Vault DIT pipeline](10-vault.md)

The editor log is the convergence point — everything captured during the shoot funnels here for handoff to post.

## Mobile

The page works on mobile but at a tighter density. Realistic use is desktop at end-of-day for the editor.

## Next

- [Vault](10-vault.md) — where the dailies clips themselves live + how they get delivered.
