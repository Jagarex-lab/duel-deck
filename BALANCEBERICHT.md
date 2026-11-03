# NACHTSIEGEL v2.5 – Balancingbericht

**10.000 Kämpfe:** 4387 Siege der Testdecks, 5593 Siege der KI, 20 Abbrüche nach Entscheidungsgrenze; 0 Unentschieden.
Durchschnittliche gesamte Spielerzüge pro Partie: **20.2**.

## Siegquoten nach Decktyp

| Decktyp | Spiele | Siege Testdeck | Quote |
|---|---:|---:|---:|
| ash | 910 | 518 | 56.9 % |
| tide | 909 | 291 | 32.0 % |
| thorn | 909 | 318 | 35.0 % |
| veil | 909 | 383 | 42.1 % |
| ash-mono | 909 | 313 | 34.4 % |
| tide-mono | 909 | 429 | 47.2 % |
| thorn-mono | 909 | 312 | 34.3 % |
| veil-mono | 909 | 578 | 63.6 % |
| tempo | 909 | 383 | 42.1 % |
| control | 909 | 400 | 44.0 % |
| value | 909 | 462 | 50.8 % |

## Schwierigkeitsstufen

| KI-Level | Spiele | Siege Testdeck | Quote |
|---|---:|---:|---:|
| 1 | 3334 | 2007 | 60.2 % |
| 2 | 3333 | 1936 | 58.1 % |
| 5 | 3333 | 444 | 13.3 % |

## Einordnung
- Vor Korrektur: Schwere KI war schwächer als normale KI, da teure Karten nicht bezahlbar waren.
- Nach Korrektur: Schwere KI erhält +1 Energie pro Zug. Das macht sie klar schwerer, kann aber die Fairness gegenüber menschlichen Spielern beeinträchtigen; Schwierigkeitsbonus ist bewusst offen sichtbar.
- Zwischen Standarddecks bestehen weiter große Leistungsunterschiede; besonders defensive Gezeiten-Decks sind im heuristischen Test unterlegen. **Nicht als fertig ausbalanciert bezeichnen.**
- 11 untersuchte Decktypen, keine vollständige Kombinatorik und keine direkten Deck-gegen-Deck-Matches.
- Vier spielbare Standarddecks enthalten zusammen alle 16 definierten Effekte, darunter eine legendäre Impulskarte. Nicht jeder Effekt wurde in jedem Testkampf ausgelöst.
- 250 zusätzliche Replay-Tests bestanden.

## Nächste Schritte
1. Direkte Deck-gegen-Deck-Matches und symmetrische Startspieler-Verteilung.
2. Deckbezogene Statistik zu Siegart, Kartenaktivierung, Pfadkontrolle und Zugzahl.
3. Balancekorrekturen erst auf Grundlage dieser Matchups und menschlicher Testpartien.
