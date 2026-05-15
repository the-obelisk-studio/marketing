# Dashboard cards

The per-production at-a-glance page (`Dashboard → Production`) renders **role-curated cards**. Each role sees a different ordered set of cards based on what's most useful for their daily work.

This page is the full matrix of which roles see which cards, plus what each card does.

## How card sequencing works

Grace picks an ordered card list per role, then filters out any cards your access profile can't see. Vault cards are hidden on the Standard plan. While your access profile is still loading the page only shows the day header — that keeps the page from flashing empty.

## Per-role card matrix

| Role | Cards (in order) | Count |
|---|---|---|
| **Owner / Producer / UPM / Tier-1 (other)** | Day Header · Your Call Today · Compliance Flags · Call Sheet Status · Today On Set · Crew & Cast On Set · Budget Snapshot · Today's Scenes · Shot List Progress | 9 |
| **AD** | Day Header · Your Call Today · Compliance Flags · Call Sheet Status · Crew & Cast On Set · Today On Set · Today's Scenes | 7 |
| **Director** | Day Header · Your Call Today · Today's Scenes · Shot List Progress · Today On Set · Continuity Notes | 6 |
| **DP** | Day Header · Your Call Today · Shot List Progress · Today's Scenes · Today On Set | 5 |
| **Camera Op** | Day Header · Your Call Today · Shot List Progress · Today's Scenes | 4 |
| **Script Sup** | Day Header · Your Call Today · Today's Scenes · Shot List Progress · Editor Log Glance · Continuity Notes · Today On Set | 7 |
| **VFX Sup** | Day Header · Your Call Today · Today's Scenes · VFX Queue · Shot List Progress · Today On Set | 6 |
| **Department Head / Tier-2 (other)** | Day Header · Your Call Today · Today's Scenes · Today On Set · Crew & Cast On Set | 5 |
| **Crew / Tier-3 (other)** | Day Header · Your Call Today · Today's Scenes | 3 |
| **Cast / Cast Minor / Cast Guardian** | Day Header · Your Call Today · Today's Scenes (filtered to scenes you appear in) | 3 |
| **Owner without seat** | T1 list minus Compliance Flags (read-only access can't act on flags) | 8 |

Camera Op doesn't get Today On Set because the schedule section is hidden by default for that role.

## Each card explained

### Day Header

Page chrome card. Production title + shoot day + date + day-stepper buttons + archived/locked state badge. Compact variant for T3 (smaller font, no day-stepper).

Always visible.

### Your Call Today

The T3 hero (and everyone else's). Shows:

- Your call time (with override vs general-call distinction)
- Today's address + hospital
- Your scenes today (filtered to scenes you appear in if cast)

Empty state when you're not on the call sheet: "You're not on the call sheet for today."

Always visible.

### Compliance Flags

Surface flag cards for turnaround / minor hours / safety meeting status. Used by AD + UPM + owner.

Gate: Call Sheets write (the AD-equivalent permission).

### Call Sheet Status

Today's call sheet state — built / approved / sent. Quick links to view + edit. Shows scene + crew counts.

Gate: Call Sheets read.

### Today On Set

Strip-progress card. Shows:

- N of M strips wrapped
- Current strip (if any)
- Projected wrap vs planned (live only on today's shoot day)
- Drill-in link to the Set Dashboard

Gate: Schedule read.

### Crew & Cast On Set

Crew + cast count + department histogram for today. Top 4 departments by headcount.

Gate: Crew read OR Cast read.

### Budget Snapshot

Total budget + actuals (PO sum) + percent bar.

Gate: Budget read.

### Today's Scenes

Today's scenes list with strip color + scene number + INT/EXT/time + location + page count. Drills into the breakdown.

Always visible (data comes from set status, not the scenes section).

### Shot List Progress

Total shots planned across today's scenes + takes captured.

Gate: Shots read.

### Editor Log Glance

Circled takes today + director picks. Top 4 scenes by circle count.

Gate: Editor Log read.

### VFX Queue

Today's VFX shots (required vs captured) + production-wide status breakdown.

Gate: VFX Dashboard read.

### Continuity Notes

Today's continuity notes filtered by today's scenes. By-department histogram.

Gate: Script Sup Dashboard read.

## Card chrome convention

Every card has the same shape:

- **Header** — accent strip color + uppercase mono title + optional status chip
- **Body** — actual content
- **Drill-in footer** — small gold "→ OPEN X" link

## Set Dashboard companion cards

The Set Dashboard has 7 additional companion cards beyond the at-a-glance set:

1. **Weather Strip** — banner with hourly forecast, sunset countdown, rain alert.
2. **Tomorrow Glance** — collapsible advance call sheet preview.
3. **Company Move** — orange banner for company-move strips.
4. **Progress Narrative** — one-line summary above the timeline.
5. **Location Logistics** — address + hospital + base camp + wifi + catering, editable.
6. **Safety Bulletin** — hazards + MARK MEETING DONE toggle + emergency contacts.
7. **Walkie Channels** — per-channel mapping + crew chat link, T1/T2 editable inline.

These have their own access controls but follow the same card chrome conventions.

## Why owner-without-seat loses Compliance Flags

The owner-without-seat profile is read-only across the board. Compliance Flags needs write permission on call sheets (so the AD can act on a flag — approve the sheet, update a minor override, etc.), so it filters out.

To get all 9 cards as owner, self-join the production via Settings → Access → **CLAIM PRODUCER SEAT**. This consumes a floating T1 seat but flips you to full owner access.

## Related

- [Per-production dashboard concepts](../concepts.md) — the philosophy.
- [Access control](access-control.md) — role tiers + section gates.
