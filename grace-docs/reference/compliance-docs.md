# Compliance documents

Grace auto-generates 8 standard compliance document types as PDFs. Most fire automatically as a side-effect of normal call-sheet, safety, and timecard activity. The AD prints, collects signatures, and uploads the executed copy back.

## Lifecycle

Every compliance document goes through:

- **Draft** — initial state. Grace generated it; nobody signed yet.
- **Pending signature** — sent to signers (e-signature integration on the roadmap; manual via email today).
- **Executed** — signed copy uploaded back to Grace. The draft stays on file for audit; the executed version replaces the live copy on the row.
- **Expired** / **Superseded** — for documents with effective/expiration dates.

## The 8 types

### 1. Exhibit G

The standard SAG-AFTRA Exhibit G — every working cast member's hours on a given day. Auto-generated when a call sheet with cast on call is approved.

Contents:
- Cast name, character name, contract type
- Day length (call → wrap)
- Meal periods
- Studio teacher hours (for minors)
- 1st AD sign-off line

### 2. Turnaround Waiver

Auto-generated when call-sheet approve detects a turnaround violation. Affected roles (anyone scheduled both days) listed with the gap shortfall.

Contents:
- Yesterday's wrap time
- Today's earliest call time
- Gap (e.g., 9.5h)
- Required minimum (12h for IATSE)
- Shortfall (2.5h)
- Per-role list of who's affected
- Signature lines

### 3. Meal Penalty Acknowledgment

Auto-generated when meal timer crosses the union threshold. Tracks penalty units and crew/cast affected.

Contents:
- Day's general call
- First meal time (planned)
- Actual meal start (from timecards or marker)
- Minutes past threshold
- Penalty units accrued (= floor(minutes / 30))
- Per-role list + signature lines

The budget automatically logs the penalty cost to the meal-penalty line for that day.

### 4. Studio Teacher Report

Required when minor cast are on call. Auto-generated.

Contents:
- Minor's name, age, character
- School hours (3h required for K-12)
- Set hours
- Rest periods
- Meal break time
- Total day length (capped per CA Education Code by age)
- Studio teacher signature line

### 5. Injury Report

Manual generation. Use the compliance dashboard's **+ NEW INJURY REPORT** button.

Contents:
- Incident time + location
- Who was involved
- Department(s) affected
- Description of incident
- Medical action taken
- Witnesses
- 1st AD + medic sign-off

A richer in-app form for incident data entry is on the roadmap; today the generator uses a shell template.

### 6. Safety Meeting Sign-In

Auto-generated when the Safety Bulletin card's **MARK MEETING DONE** button is clicked. Captures initials, timestamp, attendees.

Contents:
- Date + shoot day
- Hazards covered (stunts / SFX / weapons / animals / etc. from today's elements)
- Marker initials + timestamp
- Attendee sign-in lines (manual fill on print)

### 7. Daily Crew Timesheet

Auto-generated from the timecards page (button) per shoot day.

Contents:
- Per-crew row: name, dept, role, contract type
- Times: in / meal out / meal in / 2nd meal out / 2nd meal in / wrap
- Hours worked + OT
- Initials (bold for overrides, italic grey for Grace prefills)
- Meal penalty footer if applicable

### 8. Daily Cast Timesheet

Same as crew but for cast with the longer flow:

- Arrived / makeup in / on set / meal out / meal in / wrap / dismissed
- Meals / Penalty / Violations count
- Character name + work day type (Work / Travel / Hold / Rehearsal)

## Format conventions

All PDFs share consistent chrome:

- **Header** — production title, "OBELISK STUDIO" / "GRACE PRODUCTION OS" branding, day + date.
- **Body** — type-specific content.
- **Footer** — page numbering, generation timestamp, document ID for audit.

Signature blocks are tabular: name / role / signature line.

Print convention: light theme. PDFs always render on white background even when the live app is dark.

## Day-bucketing on the compliance dashboard

The compliance dashboard groups documents by shoot day from the document title (e.g., "Exhibit G — Day 3"). Keep the day number in the title and the grouping will keep working.

## On the roadmap

- **Per-jurisdiction Minor Work Permits** — each US state has different forms (CA EC, NY DOL, GA Labor, etc.). Requires per-state legal review before templating.
- **SAG-specific compliance variants** — Low Budget exemptions, Ultra Low Budget hour tolerances, Short Project Agreement variants. Tied to the production-size field.
- **E-signature integration** — vendor decision is locked. The 8 generators will hook into the e-signature flow: documents transition from draft → pending signature on submission, then auto-flip to executed when the signed copy comes back. Today, signing is paper-first: AD prints the PDF, collects signatures, scans, and uploads the executed copy.

## Related

- [Compliance workflow](../workflows/06-compliance.md) — the AD's daily compliance cycle.
- [Timecards reference](timecards.md) — the data feeding into the timesheet PDFs.
