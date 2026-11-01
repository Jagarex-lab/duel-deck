# Duel Deck – Fantasy Arena v0.2

## Auf dem iPhone spielen
Alle Dateien `index.html`, `game.js`, `manifest.webmanifest` in das **Stammverzeichnis** deines GitHub-Pages-Repositories hochladen und vorhandene Dateien ersetzen. Unter **Settings → Pages** `main` und `/ (root)` wählen. Safari ggf. neu laden.

## Regeln
- 48 Lebenspunkte, 3 Energie pro Runde, 3 Karten pro Zug.
- Deck: mindestens 12, maximal 18 Karten; maximal 3 Kopien je Karte und nicht mehr als im Besitz.
- **Keine automatische Neu-Mischung:** Gezogene Karten kommen nach Verwendung/Ablage nicht zurück.
- Heilzauber sind nach Einsatz **verbraucht** und höchstens eine Heilkarte pro Zug ist spielbar.
- Der Gegner besitzt einen endlichen, vorab gemischten Stapel aus 12 Aktionen.
- Wenn eine Seite keine Karten mehr ziehen kann, erhält sie ab dann pro Runde steigenden Erschöpfungsschaden.
- Gegnerstärke steigt langsamer, insbesondere ab Kapitel 10.
- Alte Speicherstände aus v0.1 werden beim Laden migriert; laufende alte Duelle werden zurückgesetzt.
- Weitere Fantasy-Karten: Elfen, Zwerge, Drachen, Paladine, Phönix, Golem, Greif, Hexe.

## Tests
`node tests.js` (Node.js nur für Entwicklung/Tests erforderlich, nicht zum Spielen auf iPhone).

Prototyp ohne Echtgeldkäufe, Server oder Werbung.
