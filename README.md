# NACHTSIEGEL v0.8 — Die drei Siegelpfade

## Installation auf GitHub Pages
Die Dateien `index.html`, `game.js`, `engine.js`, `style.css` und `manifest.webmanifest` direkt in das Repository-Hauptverzeichnis hochladen bzw. ersetzen. Keine Unterordner verwenden. Die `tests.js` ist nur für lokale Tests und wird nicht für die Website benötigt.

## Neu in v0.8
- 3 taktische Felder je Spieler; Beschwörungen bleiben stehen, bis sie besiegt werden. Am Ende des eigenen Zugs greift jede Beschwörung die gegnerische Einheit auf demselben Feld an oder, wenn frei, den Helden (Block vor Schild vor LP).
- 12 neue Beschwörungskarten: 100 Kartenarten insgesamt. Beschwörungen kommen über Booster in die Sammlung.
- 12 gerichtete Ordensreaktionen. Jeder Wechsel des Ordens während eines Zugs bringt weiterhin +2 Resonanz; zusätzlich wird die passende Reaktion ausgelöst.
- Bei 15 Resonanz kann Siegelbruch ausgelöst werden: -8 Resonanz, 9 Schaden, +5 Schild. Vollresonanz-Energievorteil bleibt erhalten, solange 15 Resonanz gehalten werden.
- Bestehende Handregeln (3 Startkarten, +2 je Folgezug, Limit 6), Deckeditor mit Karteneffekten, Shop und ein Modus bleiben erhalten.

## Balance / Grenzen
Dies ist eine frühe Balance-Version. Beschwörungen können lange auf dem Feld bleiben; umfangreiche KI-Simulationen und echte iPhone-Safari-Tests sind noch ausstehend. Die KI wählt das erste freie Feld; der Spieler wählt das Feld per Dialog. Der Spielstand bleibt unter dem bisherigen lokalen Schlüssel gespeichert. Laufende Kämpfe werden beim Neuladen zurückgesetzt.

## Tests
`node --check engine.js && node --check game.js && node tests.js`
