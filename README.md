# Duel Deck – Card Arena (MVP v0.1)

Ein komplett eigenständiger, mobiloptimierter Sammelkarten-/Deckbuilding-Prototyp ohne Build-Tools, Abhängigkeiten, Server oder Benutzerkonten. **Sprache:** Deutsch. **Ziel:** Safari auf iPhone, später eine native iOS-App.

## Spielen auf dem iPhone

1. Repository auf GitHub erstellen, z. B. `duel-deck`.
2. `index.html`, `game.js` und `manifest.webmanifest` im Hauptverzeichnis hochladen.
3. GitHub → Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. `https://DEINNAME.github.io/duel-deck/` in Safari öffnen. Über Teilen → **Zum Home-Bildschirm** hinzufügen.

Alternativ lokal auf einem Computer `python3 -m http.server 8000` im Ordner starten und `http://localhost:8000` aufrufen. Da keine Netzwerkaufrufe nötig sind, funktioniert das Spiel auch ohne Backend.

## Regeln

- 40 Spieler-LP gegen Gegner mit steigenden LP; pro Runde **3 Energie** und **3 Karten**.
- Angriff verursacht Schaden; Block fängt Schaden ab; Heilung stellt bis zu 40 LP wieder her.
- Die Gegnerabsicht (Angriff oder Block) wird vor dem Zug angezeigt.
- Gespielte und ungespielte Karten wandern in den Ablagestapel; bei leerem Ziehstapel wird er neu gemischt.
- Sieg: Gold und nächstes Kapitel; Niederlage: 10 Trostgold.
- Ein Kartenpaket kostet **100 erspieltes Gold** und enthält eine Karte. Chancen: 66 % gewöhnlich, 28 % selten, 6 % episch.
- Sammlung und Deckeditor: 6–12 Karten pro Deck, maximal so viele Kopien wie im Besitz.
- Automatisches lokales Speichern, JSON-Export/-Import.

## Architektur und Ausblick

- `index.html`: responsive Oberfläche, Design, PWA-Metadaten.
- `game.js`: Kartendaten, seeded PRNG, Zustandsmaschine, Kämpfe, Sammlung, UI.
- `manifest.webmanifest`: Homescreen-Integration.
- `tests.js`: automatisierte Tests der Kernfunktionen (Node.js optional).

**Kommerzielle Weiterentwicklung:** Kampf- und UI-Logik in separate Module teilen, Replay-/Balance-Tests ergänzen, mehr Gegner und Karteneffekte, tägliche Herausforderungen, Analytics, Cloud-Speicherung, Datenschutz/AGB, Sound und zugängliche UI. Für den App Store später z. B. mit Capacitor in eine iOS-App einbetten; für iOS-Build, Signierung und Einreichung sind ein geeigneter Build-Dienst oder macOS/Xcode und ein Apple-Developer-Konto erforderlich.

**Wichtig:** Dies ist ein Prototyp, kein verkaufsfertiges Produkt. Keine Echtgeldkäufe, keine bezahlten Zufallspakete und keine Werbe-SDKs integriert. Spielerfortschritt wird im Browser lokal gespeichert und kann bei Löschen der Website-Daten verloren gehen.
