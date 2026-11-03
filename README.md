# NACHTSIEGEL v0.9 – Die fünf Pfade

## Installation über iPhone / GitHub Pages

Lade die Dateien `index.html`, `engine.js`, `game.js`, `style.css`, `manifest.webmanifest` **direkt in das Stammverzeichnis** deines GitHub-Repositories. Keine zusätzlichen Unterordner hochladen. Nach Commit einige Minuten auf GitHub Pages warten und die Seite neu laden. `?v=9` kann beim Testen helfen. Die Skripte haben Cache-Busting `?v=9`.

## Spielsystem

- 100 Kreaturenkarten, 25 pro Orden; vier legendäre Bosskreaturen.
- 5 gegenüberliegende Pfade pro Spieler. Jede Kreatur ist eine dauerhafte Spielfeldeinheit und greift am eigenen Zugende an, frühestens im Zug nach Beschwörung (außer Eile).
- 20–25 Karten pro Deck; maximal 3 Kopien, legendäre nur 1.
- Start: 3 Handkarten; +2 pro Folgezug, maximal 6 zu Zugbeginn.
- 2 Startenergie; Resonanz bei 5/10/15 erhöht die Energie auf 3/4/5. Ordenswechsel geben +2 Resonanz und lösen eine Reaktion aus.
- Bei 15 Resonanz eine ordensspezifische Entfesselung, die 8 Resonanz kostet und mindestens eine Kreatur des Ordens voraussetzt.
- Block verfällt zum eigenen Zugbeginn, Schild bleibt bis zum Verbrauch.
- Shop, Pocket-Filter, Deckeditor, Kampfchronik, Zurücksetz-Kobold.

## Speicherstände

Neuer Speicher-Key `nachtsiegel-creatures-v09`; vorhandene v0.6-Daten werden nach Möglichkeit übernommen, inklusive Besitz an Karten-IDs. Die alte v0.8-Version bleibt unangetastet. Export des alten Spielstands wird vor jedem Update empfohlen.

## Tests

`node tests.js` und `node ui-smoke.test.js`; `node --check engine.js` und `node --check game.js`.

## Einschränkungen

Kreaturenbilder sind Platzhalter, die KI ist regelbasiert, keine vollständige Safari-E2E-Testumgebung. Balancewerte sind eine erste Iteration, keine statistisch validierte kompetitive Balance. Kampf wird beim Reload neu gestartet.
