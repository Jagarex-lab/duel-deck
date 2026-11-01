# ÄTHERBRUCH v0.4 — Die vier Orden

Mobile-first fantasy collectible card game prototype, playable on GitHub Pages without build steps.

## Installation on iPhone
Upload `index.html`, `game.js`, `manifest.webmanifest` to the root of your GitHub repository `jagarex-lab/duel-deck`. Commit and wait for GitHub Pages deployment. Open `https://jagarex-lab.github.io/duel-deck/?v=4` in Safari. HTML references `game.js?v=4` to refresh cached scripts.

## Changes
- 62 unique cards total (32 prior + 30 new), four visual factions: Aschenpakt, Gezeitenorden, Dornenzirkel, Nachtkonklave.
- Original sigil-driven vector art using HTML/CSS: no licensed art, no network dependencies.
- Enemy uses actual 12-card deck, hand (max 5), 3 energy per turn, 3 drawn cards per turn, discard and exhausted healing cards.
- Enemy AI evaluates playable cards and its own remaining energy, with an approximate damage/block telegraph.
- Finite decks and symmetrical escalating fatigue when hand and draw pile empty.
- Player 12–18 card deck, max 3 copies; retain unused cards, discard manually on overflow.
- Automatic migration of v1–v3 localStorage savegames; ongoing combat resets on version migration.
- Export saves before updating as precaution.

## Tests
Run `node tests.js` with Node 20+. No packages required.

## Limitations
The AI uses a heuristic, not exhaustive search; no multiplayer or real-money monetization. CSS sigil art is a coherent original prototype art direction, not a finished illustration set.
