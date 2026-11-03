# NACHTSIEGEL v1.2 – Phasen & Kartenverbrennung

## Installation
Die Dateien `index.html`, `engine.js`, `game.js`, `style.css` und `manifest.webmanifest` im Stammverzeichnis des GitHub-Pages-Repositories ersetzen. Browsercache ggf. aktualisieren (`?v=12`).

## Änderungen
- Nachziehphase: Ab dem zweiten eigenen Zug darfst du Karten **gezielt aus der Hand verbrennen**, bevor bis zu zwei Karten gezogen werden. Das Handlimit von sechs wird strikt eingehalten. Ohne freie Plätze werden weniger Karten gezogen. Verbrennung geht in den Ablagestapel; damit ist die Entscheidung relevant für den Erinnerungsruf.
- Sichtbare Phasen: Nachziehen → Beschwören/Resonanz → Angriff → Zugende. Angriffe werden weiterhin durch `Zug beenden` ausgelöst.
- Kampf-Feedback: Ereignisfeld mit farblich unterschiedlichen Treffer-, Heilungs- und Beschwörungseffekten, animierte Phasenmarkierung und Kreaturen-Einblendungen; reduzierte Bewegung respektiert.
- Nichtlegendäre Ordensimpuls-Karten wurden in Resonanzkarten umgewandelt; nur die vier legendären Kreaturen erhalten `pulse`.
- Schwächung wirkt bis zum Ende des nächsten Angriffs der betroffenen Seite und verfällt erst **danach**.
- Bestehender Speicherstand bleibt unter dem bisherigen lokalen Schlüssel erhalten.

## Einschränkung
Die Kampfereignisse werden derzeit als animiertes Ereignisfeld und Chronik visualisiert, nicht als vollständige sequenzielle 3D-/Partikelanimation pro Angriff. Der Gegnerzug wird weiterhin synchron berechnet.
