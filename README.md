# NACHTSIEGEL v2.5 – Vier Standarddecks und Balancetest

## Installation
Alle Dateien aus diesem Verzeichnis in das Stammverzeichnis des GitHub-Pages-Repositories hochladen. Vorherige Dateien ersetzen. In Safari neu laden.

## Vier Standarddecks
In Arena und Deckwerkstatt stehen Aschensturm, Gezeitenwall, Dornenwacht und Nachtgewebe bereit. Ein Klick lädt das gewählte Deck (25 Karten). Alle 16 Effekttypen kommen in den vier Listen zusammen vor. Das Testlabor schaltet Karten unabhängig vom Sammlungsbestand frei.

## Änderungen
- KI auf schwer erhält eine zusätzliche Energie pro Zug, da teure Karten zuvor nicht zuverlässig spielbar waren.
- Standarddecks angepasst. Spielregeln der v2.4-Pfadkontrolle unverändert.
- Keine Rückgängig-Funktion.

## Simulation und Grenzen
10.000 deterministische Kämpfe mit 11 Deck-Archetypen, drei KI-Stufen und wechselnden Seeds. Dies ist **keine exhaustive Prüfung aller möglichen 25-Karten-Decks** und kein echtes PvP-Matchmaking. Der Gegner verwendet weiterhin seinen durch Seed und KI-Level bestimmten Kartenpool; keine vollständige Paarung jedes Decks gegen jedes andere. Die KI des Testtreibers spielt heuristisch, kein menschliches Niveau. Timeout bedeutet >145 Spielerentscheidungen, nicht zwingend Engine-Fehler.

**Balancing bleibt experimentell:** Die Unterschiede zwischen Archetypen sind deutlich. Eine globale Änderung von Kartenwerten ohne direkte PvP-Matchup-Tests wäre voreilig. Weitere Auswertung in `BALANCEBERICHT.md` und `balance-10000.json`.

## Technische Tests
`node test.js` (250 deterministische Replays) und `node simulate.js 10000` (10.000 KI-Kämpfe). Kein realer iPhone-Safari-Test durchgeführt.
