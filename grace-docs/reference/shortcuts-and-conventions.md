# Shortcuts & conventions

Quick reference for the visual conventions used throughout the app.

## The dot system

| Dot | Meaning | Where it appears |
|---|---|---|
| 🔵 Blue | Grace suggested (AI-extracted, rate card default, industry default) | Element rows, budget items, timecard cells, VFX flags |
| 🟡 Gold | Human entered or changed | Same — flips when you touch a blue field |
| 🟢 Green | Verified from signed document | Crew rates from executed deal memos, contract values |

See [the dot system in concepts](../concepts.md#the-dot-system) for the philosophy.

## Strip colors

In the schedule and set dashboard, scene strips are color-coded by interior/exterior + day/night:

| Strip type | Color | Hex |
|---|---|---|
| INT DAY | Blue | `#3B82F6` |
| EXT DAY | Green | `#22C55E` |
| INT NIGHT | Purple | `#8B5CF6` |
| EXT NIGHT | Orange | `#F97316` |

Non-scene strips (lunch, company moves, second unit, stunt rehearsals, travel) have their own colors set per-strip.

## Section accent colors

In the sidebar, each top-level section has an accent dot color:

| Section | Color |
|---|---|
| Story | Gold |
| Schedule & Locations | Purple |
| Budget | Green |
| Creative Prep | Orange |
| Roster | Blue |
| On-Set | Red |
| Coverage | Purple |
| The Vault | Blue |
| Settings | Muted gray |

## Card accent colors

On the per-production dashboard, each card has a left-strip accent indicating its conceptual home:

- **Gold** — Compliance, Day Header
- **Green** — Today On Set, Crew/Cast, Budget
- **Blue** — Call Sheet, Today's Scenes
- **Purple** — Shot List, Editor Log, VFX Queue, Continuity
- **Red** — Compliance alerts (tone-only)

## Status chips

Right-aligned status pills in card headers:

| Label | Color | Meaning |
|---|---|---|
| APPROVED | Green | Call sheet approved by AD |
| DRAFT | Muted | Not yet approved |
| SENT | Blue | Call sheet sent to crew |
| NOT BUILT | Muted | No call sheet for the day yet |
| WRAPPED | Green | Today's strip timeline complete |
| SHOOTING | Gold | Strip currently being shot |
| PREPPING | Gold | Strip in pre-roll prep |
| ARCHIVED | Red | Production archived |
| LOCKED | Gold | Production locked (read-only) |

## Typography

- **Body**: Segoe UI (system font on Windows / macOS / Linux).
- **Monospace**: Courier New. Used for labels, scene numbers, times, budget codes, channel IDs — anywhere alignment in a vertical column matters.
- **Uppercase mono labels**: section headers, card titles, kiosk-display data (DAY 1, CALL 07:00).

## Time format

Times are `HH:MM` 24-hour. Inputs accept multiple formats and normalize to 24-hour:

| Input | Stored as |
|---|---|
| `0710` | `07:10` |
| `710` | `07:10` |
| `7:10` | `07:10` |
| `7:10 am` | `07:10` |
| `710p` | `19:10` |
| `19:10` | `19:10` |

Wrap-past-midnight is supported. `26:30` becomes `02:30` (next day) for display.

## Date format

Dates render as `Month Day, Year`. Example: `May 6, 2026`. Consistent everywhere in the app regardless of browser locale.

## Keyboard shortcuts

The web app doesn't have a global shortcut layer yet. Page-specific shortcuts:

- **Schedule page** — drag strips between days, tab between cells.
- **Timecards page** — Tab moves to next time cell, Enter saves the row.
- **Set Dashboard** — Click the status button on any strip to cycle prepping → shooting → wrapped.

## URL conventions

- **Per-production** routes: `/dashboard/production/*`
- **Pre-production** routes: `/dashboard/pre-pro/*`
- **Settings** routes: `/dashboard/settings/*`
- **Public share** pages: `/s/<token>` (call sheet shares), `/vault/<token>` (vault screeners)
- **Onboarding** routes: `/welcome/*`
- **Invite** acceptance: `/invite/<token>`

## Email senders

All app emails (except Clerk's auth flow) come from `@theobeliskstudio.com`:

- `invites@theobeliskstudio.com` — production invitations
- `callsheet@theobeliskstudio.com` — call sheet sends
- `vault@theobeliskstudio.com` — vault share access codes

From-name is `Grace Production OS` for all three.

Authentication emails (sign-in verification codes, password resets) still come from Grace's identity provider for now.

## Reply-to chain

Grace picks a reply-to address for each outgoing email using a fallback chain:

**Default order**: whoever sent the email → 1st AD → org owner → `support@theobeliskstudio.com`.

**Call sheets** put the 1st AD first: 1st AD → sender → org owner → fallback. "Running late" and logistics questions hit the AD first.

## Related

- [Concepts](../concepts.md) — the visual + philosophical foundations.
- [Access control](access-control.md) — role tiers, sections, gating.
