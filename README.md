# NACHTSIEGEL v1.0 – Balance-Hotfix

GitHub Pages: Dateien index.html, engine.js, game.js, style.css, manifest.webmanifest direkt in das Repository-Hauptverzeichnis laden. Nicht den Ordner hochladen. Safari lädt JS/CSS mit ?v=10.

## Änderungen
- 25 Karten im Startdeck; vorhandene v0.9-Spielstände mit 20 Karten werden beim Laden automatisch auf 25 ergänzt. Spielstand vorher exportieren.
- Gegnerdeck: ebenfalls 25 Karten. Gegnerauswahl bleibt zufällig; die Kartenauswahl und Deckstärke sind noch nicht vollständig gleichwertig.
- Erschöpfung: maximal einmal pro eigenem Zug, nur wenn Hand und Nachziehstapel leer sind. 1, 2, 3, danach maximal 3 Schaden pro betroffenem Zug.
- Tatsächlich gezogene Karten werden korrekt protokolliert, dazu Restkarten im Stapel.
- Zweiter Spieler erhält 4 dauerhafte Schildpunkte als Ausgleich.
- Keine Änderungen an der Sammlung, Shop, Resonanz, den fünf Pfaden oder den 100 Kreaturen.

## Automatisierte Tests
`node tests.js`
`node ui-smoke.test.js`
`node simulate.js 2000`

Das Ergebnis der 2.000 deterministischen Simulationen steht in balance-v10.json. Sie sind ein KI-Benchmark, kein echter iPhone-Safari-Test und kein Beweis für vollständige Balance.
