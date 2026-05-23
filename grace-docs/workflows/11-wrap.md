# Wrap + delivery

What happens at end of shoot. This page is intentionally short — Grace doesn't have a "wrap mode" button. Wrap is just the moment when the workflows above transition from "make new data" to "export final data + archive."

## End-of-show export checklist

Run through these at company wrap:

- [ ] **Final DPR** — generate from the Set Dashboard for the last shoot day. Pulls into the archive of daily reports.
- [ ] **Editor log exports** — from [Editor log](09-editor-log.md), pull CSV / PDF / EDL / FCPXML. Hand to the editor + assistant editor.
- [ ] **VFX turnover PDF** — from [VFX dashboard](08-vfx.md). Hand to the VFX vendor.
- [ ] **Camera report PDFs** — from [Script supervisor workflow](07-script-supervisor.md), one per shoot day.
- [ ] **Script supervisor reports** — same, but the continuity-focused variant.
- [ ] **Daily timesheet PDFs** — from [Timecards](../reference/timecards.md), one per shoot day for both crew + cast.
- [ ] **Compliance documents** — make sure all 8 doc types have their `executed` versions uploaded for each shoot day they were generated.
- [ ] **Final budget actuals** — Budget → Budget shows current state including all POs. Snapshot to PDF for accounting.

## What to do with the org after wrap

A few options:

### Keep it warm

If you're moving into another production with the same company, keep the org active. Just create a new production inside the same org. The crew/cast/vendor masters carry forward if you want to re-invite the same people.

### Archive the production

If a production is done and you don't want it consuming a slot:

1. From the dashboard home, click the edit pencil on the production card.
2. **ARCHIVE THIS PRODUCTION** in the Danger Zone.

What this does:
- Stamps `archivedAt = now()`, sets `archiveReason = 'manual'`.
- Frees the production-slot binding (so a new production can take that slot).
- Flips bundled members → org_floating (they're no longer tied to this production's bundle).
- Strikethrough on the production card + red "ARCHIVED" pill.

Archived productions are **read-only** (anyone with access can view but not write). To resume work, click **↶ UNARCHIVE** on the card.

### Cancel the subscription

If you're wrapping the company and won't need Grace again for months:

1. Settings → Billing → **Cancel subscription**.
2. Stripe sets `cancel_at_period_end = true`. You keep paid access through the current period.
3. At period end, the org transitions to `canceled` status.

Once canceled, the org enters a **7-day grace period** during which it's read-only but recoverable (resubscribe and everything comes back). After 7 days, the read-only clamp becomes permanent — you have to actively re-subscribe to unlock writes.

After 30 days of overflow (more bound productions than addon quota), the oldest bound production auto-archives.

See [Billing & seats](../reference/billing-and-seats.md) for the full state machine.

### Soft-delete the org

If you're shutting down the production company:

1. Settings → Org → Danger Zone.
2. Type the org name to confirm.
3. **DELETE ORGANIZATION**.

What this does:
- Marks the organization as soft-deleted.
- If you have an active Stripe subscription, sets it to cancel at the end of the period so billing terminates without renewal.
- You keep paid access through the current period.
- All productions, members, vendors, etc. survive intact — the org just disappears from your switcher and dashboards.

Soft-delete is recoverable for a soak window — open an issue if you need to undelete. Hard delete is intentionally not exposed in the UI to prevent accidental data loss.

## What you can revisit after wrap

The vault stays accessible — finished screeners can keep being shared, dailies clips remain streamable, magic links continue working until shares are explicitly revoked or expire.

The breakdown, schedule, budget, timecards stay queryable. Read-only for archived productions, but you can pull historical reports any time.

The compliance documents stay in their final status. If you uploaded a signed Exhibit G, it's there forever (or until you delete the org).

## Next phase

- [Billing & seats](../reference/billing-and-seats.md) — what happens when payments lapse.
- [Access control](../reference/access-control.md) — who keeps access on archived productions.
