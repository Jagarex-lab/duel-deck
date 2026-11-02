# ÄTHERBRUCH v0.5 – Die Chronik der Namenlosen

Ein mobiloptimierter, offline-fähiger (nach Laden der Dateien; Webfonts benötigen beim ersten Besuch Internet) Fantasy-Kartenprototyp für Safari und GitHub Pages. Keine Installation, keine Build-Schritte, keine Bibliotheken.

## Veröffentlichung vom iPhone

1. ZIP in der iPhone-App **Dateien** entpacken.
2. Im GitHub-Repository `jagarex-lab/duel-deck` die **fünf** Dateien `index.html`, `style.css`, `engine.js`, `game.js` und `manifest.webmanifest` ins Hauptverzeichnis hochladen bzw. ersetzen. `tests.js` und README sind optional.
3. Änderungen committen und GitHub Pages abwarten.
4. `https://jagarex-lab.github.io/duel-deck/?v=5` in Safari öffnen.

**Wichtig:** v0.5 benutzt neue Dateinamen `engine.js` und `style.css`. Nur `index.html` und `game.js` zu ersetzen genügt nicht.

## Regeln

- Münzwurf entscheidet deterministisch aus dem Spielseed, wer beginnt.
- 18–24 Karten im Deck, maximal 3 Kopien je Kartentyp; 5 Handkarten maximal. Ungespielte Handkarten bleiben liegen. Bei Überfüllung wählt der Spieler, was verbrannt wird.
- Jede Seite hat 3 Grundenergie. Wechsel zwischen Karten verschiedener Orden erzeugt Resonanz; ab 4 bzw. 8 Resonanz erhält man +1 bzw. +2 Energie je Zug. Resonanzkarten beschleunigen den Aufbau.
- Block absorbiert Schaden zuerst und verfällt zu Beginn des nächsten eigenen Zugs; Schild absorbiert danach und bleibt erhalten, maximal 30.
- Beide Seiten besitzen endliche Decks und erhalten steigenden Erschöpfungsschaden, wenn sie ohne Nachziehkarten ziehen.
- Gegner besitzt Karten, Energie, Hand, Deck, Schild, Block und protokollierte Aktionen. Die KI ist heuristisch und muss noch durch Simulationsturniere balanciert werden.
- 72 Kartenarten aus vier Orden, lokale Sammlung, Filter, Deckeditor, Kartenpakete gegen Spielwährung, Prolog, Spielstand-Export/Import.

## Spielstand-Migration

v0.5 verwendet `aetherbruch-v05-save`. Bei der ersten Ausführung werden aus `duel-deck-save-v1` Münzen, Kapitel, Siege und Niederlagen übernommen und 200 Splitter als Umstiegsbonus gewährt. **Alte Karten-IDs sind nicht kompatibel**: die Sammlung wird als neues Startdeck angelegt. Alte Daten bleiben unverändert gespeichert. Wer seinen alten Spielstand sichern möchte, sollte ihn vor dem Update aus v0.4 exportieren.

## Tests

`node tests.js` (Node.js ab Version 18). Engine ist deterministisch, ohne externe Abhängigkeiten.

## Status

Spielbarer Prototyp, kein produktionsreifes App-Store-Spiel. Kartenillustrationen sind bewusst individuell gerahmte Platzhalter. Die Mechanik ist ein eigener Prototyp; absolute weltweite Neuheit wird nicht behauptet. Vor kommerzieller Veröffentlichung: ausführliche Balance-, UX-, Datenschutz-, Rechte- und App-Store-Tests.
