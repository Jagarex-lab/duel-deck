# NACHTSIEGEL v0.6 — iPhone / GitHub Pages

## Installation
Alle fünf Webdateien (`index.html`, `engine.js`, `game.js`, `style.css`, `manifest.webmanifest`) ins Wurzelverzeichnis des GitHub-Pages-Repositories hochladen und alte Versionen ersetzen. Keine Unterordner hochladen. `tests.js` und `ui-smoke.test.js` sind optional.

## Änderungen
- Neues vorläufiges Branding NACHTSIEGEL; 88 Kartentypen (16 neue Karten), vier echte einzigartige legendäre Bosskarten.
- Münzwurf und Stapelmischung verwenden im Browser `crypto.getRandomValues` als Seed. Bei jedem Neustart wird neu gemischt.
- Energie startet bei 2 und steigt bei 5/10/15 Resonanz auf 3/4/5. Vollresonanz verleiht zusätzlich 2 Schild pro eigenem Zug. Ordenswechsel +2 Resonanz.
- Schild hält bis Verbrauch (max. 24); Block verfällt beim nächsten eigenen Zug.
- Kompakte Pocket-Sammlung (vier Karten pro Reihe auf kleinen Smartphones), Filter, kompakte Deckliste.
- Getrennter Shop, Booster 240 Splitter, drei Karten mit mindestens einer seltenen, Verteilung 67/25/7/1 %.
- Zurücksetz-Kobold (Startdeck), drei Modi (Chronik, Endloser Pfad, Rissduell), zusätzliche Effekte und CSS-Animationen.
- Gegnerprotokoll farblich markiert.

## Einschränkungen
Die Spielbalance ist ein erster Entwurf, nicht statistisch ausbalanciert. Animationen sind einfache CSS-Übergänge, keine 3D-Beschwörungssequenzen. Das Design verwendet weiterhin Platzhalter statt individueller Illustrationen. Der Name ist ein Arbeitstitel.

## Tests
`node --check engine.js`, `node --check game.js`, `node tests.js`, `node ui-smoke.test.js`. Browser-Tests auf echtem iPhone wurden nicht durchgeführt.

## Spielstand
Verwendet den bisherigen lokalen Speicher `aetherbruch-v05-save`, importiert die v0.5-Sammlung. Vor Aktualisierung bitte exportieren. Laufende Kämpfe werden nicht gespeichert.
