# NACHTSIEGEL v2.2 – Admin-Testlabor / Multiplayer-orientierte Regeln

Statische GitHub-Pages-Version, Dateien direkt in das Repository-Hauptverzeichnis laden.

## Änderungen
- Kampfaudit v3: Aktionen mit Eingaben, vollständigem Vorher-/Nachher-Zustand und FNV-1a-Prüfsummen; deterministische Verifikation per `AetherEngine.replayAudit(audit)`.
- Ereignis-Replay im Kampfprotokoll zum schrittweisen Lesen vollständiger Zustände. **Kein Rückgängigmachen von Aktionen.**
- Erschöpfung anhand tatsächlicher Stapelverfügbarkeit statt Handkapazität; Pflichtverbrennen bleibt.
- Effektwarteschlange stoppt bei Kampfsieg; zusätzliche Siegprüfung nach Ordensreaktionen; Betäubung verkürzt bestehende Dauer nicht.
- Beschwörungs-Durchdringung wird nur einmal protokolliert.
- Drei KI-Stufen (Einfach / Normal / Schwer) mit taktischer Feldbewertung.
- Angriffsvorschau mit Schutzabsorption und tödlichen Treffern, ohne Folgereaktionen.
- Animationstempo (aus/schnell/normal/langsam), dauerhafte Kartenfarben relativ zu Basiswerten.
- Vorhandene 100 Karten, Deckbau, Admin-Testlabor, Cache-Refresh und Aufgeben bleiben.

## Grenzen
- Multiplayer ist **noch nicht implementiert**. Die deterministische Replay-Funktion ist eine Grundlage, aber kein sicheres Serverprotokoll.
- Replays verwenden dieselbe Engine, sind daher kein unabhängiger Regelbeweis. Die vollständigen Ereignis-Snapshots dienen zur Diagnose.
- Kein echter Safari-Test durchgeführt.
- Animationen zeigen Kartenänderungen, keine schwebenden Statuszahlen auf Helden.

## Verifikation
`node --check engine.js && node --check game.js && node test_v22.js` (Testskript liegt im Entwicklungsverzeichnis, nicht in der ZIP).
