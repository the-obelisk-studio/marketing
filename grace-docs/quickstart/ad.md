# Quickstart — 1st AD

You're the beachhead user. Grace's entire design is shaped around your daily cycle: assemble the call sheet, get it approved, send to crew, run the shoot day, capture timecards, generate the DPR, repeat.

You have **T2 access** with `callSheets:write` — full write on the call sheet flow. The Producer/UPM owns the budget; you own the day clock.

## Your daily cycle

In rough order, every shoot day:

1. **Build tomorrow's call sheet** — the night before. Production → Call Sheet → pick the day. Grace pre-populates from the schedule strips; you set general call, lock per-row call-time overrides (HMU chains, pickup actors), add department notes. See [Call sheets](../workflows/04-call-sheets.md).
2. **Approve + send** — once it looks right, mark approved and send to crew + cast. Each recipient gets a Grace-branded email with a unique magic link to view the day's sheet.
3. **Run the day** — Production → Set Dashboard. Strip timeline, current scene, meal timer, OT clock, projected wrap, turnaround compliance. Mark strips prepping → shooting → wrapped as the day goes. See [Set Dashboard](../workflows/05-set-dashboard.md).
4. **Capture timecards** — Production → Timecards. Grace pre-fills based on call time + meal duration; you override the actuals as people arrive/wrap. See [Timecards](../reference/timecards.md).
5. **Generate DPR** — Daily Production Report, button on the set dashboard. PDF goes to UPM/producer.
6. **Repeat** — open the next day's sheet.

![Call sheet day 1](../img/workflows/04-call-sheets/day1-approved.png)

## The Set Dashboard is your home

12 hours of your shoot day will be on `/dashboard/production/set`. It tells you:

- **Where you are** — current strip highlighted, day clock, real-time vs planned wrap.
- **Where you're behind** — projected delta in minutes (gold = catching up, red = significant slip).
- **Compliance state** — meal timer, OT accumulation, turnaround vs yesterday's wrap.
- **Today's location, hazards, comms** — the [companion cards](../workflows/05-set-dashboard.md) (location + logistics, safety bulletin, weather strip, walkie channels) below the timeline.
- **What's next** — Tomorrow at-a-glance, between hero and timeline.

![Set Dashboard](../img/concepts/set-dashboard.png)

## Compliance is mostly automatic

Grace flags compliance issues as you work:

- **Turnaround violation** — red strip on the day-header if the previous day's wrap puts today's call inside the union turnaround window. Hours-shortfall shows. Force-call memo PDF auto-generates on approve.
- **Minor hours** — if a minor's day exceeds union profile (8/10/12 hours depending on age), approve blocks with a 422 until you either fix the schedule or acknowledge the violation. Acknowledgment is logged in the audit trail.
- **Meal penalty** — meal timer on the compliance footer counts up from call (or last meal end). At 6h on the IATSE profile, it turns red and starts logging penalties to the budget. The cascade is automatic — POs land in the meal-penalty bucket.
- **Safety meeting** — when today's scenes include stunt / weapon / animal / SFX / water / heights / pyro / aerial elements, the Safety Bulletin card requires a sign-off with initials before crew arrival. See [Compliance](../workflows/06-compliance.md).

## What you don't have access to

Vault items (screeners, dailies, DIT pipeline) are Studio-tier features and gated to T1 by default. Producer can grant you read via per-section overrides if needed.

Budget rates and per-person crew/cast rates are hidden from you by tier baseline — those are commercially sensitive. You can read the budget structure but not the line-item dollar amounts unless the producer overrides.

## Next reads

- [Call sheets](../workflows/04-call-sheets.md) — full daily cycle walkthrough.
- [Set Dashboard](../workflows/05-set-dashboard.md) — every card and button on the page.
- [Compliance](../workflows/06-compliance.md) — turnaround, meal, minor hours, the 8 doc types.
