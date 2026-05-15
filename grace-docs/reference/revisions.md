# Script revisions

Grace tracks script revisions properly — not as "upload a new file, lose history" but as a versioned change with diff review, fork-or-stay artifact versions, and the standard industry color cycle. This page is the detailed reference for how revisions work.

## The state machine

A script revision carries:

- **isCurrent** — exactly one current script per production at a time.
- **Parent script** — soft link to the previous version.
- **Analysis status** — *pending* (parsing) / *pending review* (diff staged) / *committed* (merged into the breakdown) / *discarded*.
- **Diff payload** — transient staging of the AI's diff vs the parent script. Cleared on commit / discard.
- **Revision color** — one of the 11 industry colors.
- **Revision label** — auto-generated like "Blue Revision — 2026-05-15."

When you upload a new script:

1. **Parse** — status flips to *pending*. The worker streams via the AI; the TopBar pill shows live progress.
2. **Diff stage** — once parsed, status flips to *pending review*. The diff is staged. You can view it at the breakdown review page.
3. **Commit** — accept/reject per scene, optionally fork artifact versions, click COMMIT. The new revision becomes current; the parent stops being current.
4. **Discard** — alternatively, abandon the draft. Nothing changes in the breakdown.

## Industry revision colors

The standard production-stationery color cycle, in order:

> white → blue → pink → yellow → green → goldenrod → buff → salmon → cherry → tan → ivory

After ivory, prefix becomes "Double":

> Double white → Double blue → Double pink → ... → Double ivory → Triple white → ...

White is index 0 (the original shooting script); blue is the first revision; etc.

Each revision's color is rendered in:

- The script header in the breakdown UI.
- The schedule strip footers (when shooting from a specific revision).
- Call sheets — the printed PDF shows "Blue Revision — 2026-05-15" so crew know they're working off the right pages.

## Scene matching

Grace runs a scene-by-scene diff between parent and child scripts using a three-pass heuristic:

1. **Exact match** by scene number. Both scripts have a "5A" → it's the same scene.
2. **Heading similarity** — catches renames like "INT. KITCHEN - DAY" → "INT. ALANA'S KITCHEN - DAY" where the description didn't change much.
3. **Content fingerprint** — catches content-only changes where the header didn't move.

Results bucket into:

- **Unchanged** — same scene, same content.
- **Modified** — same scene number, different content. Shown side-by-side for accept/reject.
- **Added** — new scene number in child, no parent match.
- **Removed** — parent scene number missing from child.
- **Possible** — heading similarity match but not exact. Manual review.

## Merge-by-name on commit

When you commit a modified scene, Grace **merges elements by name** (matched case-insensitively within a category) instead of wipe-and-replace. For each existing element on the parent scene:

- If a matching element exists in the child → UPDATE (preserving cast linkage, verification status, descriptions).
- If no match → DELETE (soft-delete; soft-deleted elements stay in audit but excluded from views).
- Any new element from the child → INSERT.

This is critical because the AI parse doesn't see user-edited fields. If you (a producer) marked a stunt element as verified, then re-uploaded the script, a wipe-and-replace would lose the verification. Merge-by-name preserves it.

## Artifact versioning

The schedule, budget, and shot list are version-controlled per (production, script). Exactly one version per artifact is active at any time. Activating a new version atomically deactivates the previous one.

On revision commit, the UI offers **fork toggles** per artifact:

- **Fork schedule** — clone the active schedule, bind to the new script. Edits to the new version don't affect the old.
- **Fork budget** — same idea.
- **Fork shot list** — same.

Default is "stay on the active version" — most revisions don't need a fork (color pages don't change the schedule). You'd fork when the revision genuinely changes shoot order or scope.

## Call sheets pin their version

Call sheets bind to the schedule version that was active at approve time. You literally cannot delete a schedule version that has approved call sheets pointing at it. This is the archival invariant — the call sheet you sent on Day 1 references exactly the schedule that was current.

## Scene snapshots

Each commit freezes a snapshot of every scene tied to that revision. So when you pull up "Day 1's call sheet referenced these scenes from the blue revision" you see exactly the scene data that existed at that revision — not whatever the scene looks like today.

## The dot system on revisions

When a revision is committed, accepted MODIFIED scenes have their elements re-stamped:

- **Existing elements** preserved (gold dots stay gold).
- **New elements from the AI** get blue dots (Grace suggested).
- **Removed elements** soft-deleted (omitted scenes stay visible with strike-through).

A producer reviewing a revision sees at a glance which elements are fresh AI guesses vs human-verified.

## The revision page UI

The breakdown review page has per-scene accept/reject toggles, fork toggles for schedule/budget/shot list, optional fork name, and COMMIT and DISCARD buttons. Bottom of page shows a summary count (X modified, Y added, Z removed).

## Related

- [Script → Breakdown workflow](../workflows/02-script-to-breakdown.md) — the user-facing flow.
- [Pre-production](../workflows/03-pre-production.md) — artifact versioning context.

