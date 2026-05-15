# Vault security

The Vault is **deterrent-tier protection** — designed to make screen-recording-and-leak attribution easy, not to make it impossible. OBS or QuickTime can still capture playback, but the captured copy carries identifying watermarks. This page documents the security mechanics in depth.

A stronger tier — server-side watermark burn-in plus air-gapped review — is on the roadmap.

## Token + share

Each share carries:

- **Token** — generated with ~256 bits of entropy. Hashed before storage; the raw token only appears in the URL.
- **Recipient email** — registered to the share. Code requests + access codes go to this email.
- **Session nonce** — incremented on every successful code-verify. Used for device-kick.
- **Locked-until** — rate-limit timestamp. Bumps on too-many failed code attempts.
- **Expiry** — typically 48h but configurable on creation.

Producer can revoke any time.

## Magic-link flow

1. Producer creates share → email goes out with the magic link.
2. Recipient clicks link → lands on the viewer page.
3. Viewer requests a code → Grace generates a 6-digit code, stores it hashed with a 10-min TTL + 5-attempt limit.
4. Email goes out from the Vault sender with the code.
5. Recipient types the code → on match, the session is established.
6. Viewer loads the player.

## Session

After successful verify:

- The session is **per-share** (not per-user), scoped to the viewer URL.
- It's **HTTP-only** — JavaScript can't read it.
- It's **secure** — sent only over HTTPS.
- It's **signed** — the server validates every range request.
- **TTL** — 24 hours. Sliding refresh when more than an hour old.

## Device kick

The session nonce bumps on every successful verify. The session includes the nonce. When the next range request comes in, the server checks the cookie's nonce against the share's current nonce. If they don't match (because someone else verified more recently), the cookie is invalid.

Net effect: only the most recently verified device can keep playing. If the recipient shares the link + code with someone else, the second person verifies (bumping the nonce) and the first person's stream breaks on the next range request.

## Range-only stream

The stream endpoint **refuses non-range requests**. This prevents a fallback path from pulling a full 5 GB into memory at once.

## Watermarks

The viewer player draws two watermark layers on top of the video element:

### Layer 1 — Persistent corner watermark

Bottom-right of the player area:

- **Recipient email**
- **Share ID** (first 8 characters)
- **UTC timestamp** (refreshed every 30 seconds)

Pointer-events disabled + user-select disabled + monospace font for visibility.

### Layer 2 — Large diagonal wandering watermark

Same info, much larger, set at ~30% opacity, rotated -15°, with position transforms that update every 8 seconds. Wanders across the frame on a pseudo-random path so the watermark can't be cropped out of a captured rect.

Both layers can't be hidden via DevTools without breaking the page entirely.

## Forensic log

Every viewer interaction is logged. Event types:

- **Code request** — recipient requested an access code
- **Code request failed** — too many requests / share locked
- **Verify attempt** — code entered (success or fail)
- **Verify success** — code matched
- **Verify failed** — code didn't match
- **Play start** — first range request after verify
- **Seek** — range request that's far from the previous range
- **Device change** — session nonce mismatch detected
- **Exit** — recipient left the player

Each event captures: share, event type, user agent, IP, time.

When a leak surfaces, the producer can pull the log and match the watermark on the leaked copy to the corresponding code request + IP.

## Upload path

Vault screener uploads go **direct from your browser to cloud storage** — the server never buffers the file body. The server hands the browser a temporary upload URL (10-minute TTL); the browser uploads to it; then the browser tells the server "done" and the screener row is created.

Cap enforcement:
- Max file size: 5 GB.
- Allowed extensions: `.mp4`, `.mov`, `.mkv` (videos only).

## Dailies vs screeners

The same security infrastructure powers both. Dailies are stored as screener rows under the hood but excluded from the master screeners list — they surface only on the dailies page.

## Standard-plan gating

The four Vault sections (Screeners, Dailies, DIT, Screener Sharing) are hidden for orgs on the Standard plan. The sidebar shows them with a STUDIO pill; clicking opens the upgrade modal instead of routing.

## What we don't protect against

- Camera-recording the screen (a person physically holding a phone, recording the monitor).
- Trusted device leaks — if the recipient is logged in and gives the codes to a friend, the friend's IP / device just shows up in the forensic log.
- High-end captures where the watermark is at a known frame position and can be inpainted out.

For productions that need stronger protection, the Fort Knox tier is on the roadmap:

- Server-side watermark burn-in (each viewer gets a re-encoded copy with their watermark baked into pixels).
- Local-LLM screening on a hardware-air-gapped device for sensitive cuts before they leave the building.

## Related

- [Vault workflow](../workflows/10-vault.md) — the user-facing flow.
- [Access control](access-control.md) — Studio plan gating.
