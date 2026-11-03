# NACHTSIEGEL v2.3 – Pfadkontrolle und Kampfaudit

Neue Siegbedingung: Drei Nachtsiegel, je eines am Ende der eigenen Angriffsphase mit mindestens drei unbestrittenen besetzten Pfaden. Alternativ Sieg durch gegnerische HP = 0. Siegel sind dauerhaft und öffentlich sichtbar.

Deck-Kreislauf: Wenn der Nachziehstapel leer ist und die Ablage Karten enthält, wird sie deterministisch neu gemischt. Der 1./2./3. und jeder weitere Kreislauf kostet 1/2/3 ungeschützte Lebenspunkte. Sind beide leer, gilt weiterhin Erschöpfung.

Audit: Korrekte firstEvent/lastEvent-Grenzen, actionId pro Ereignis, präzisere Lebensraub-/Durchdringungs- und Todesmeldungen, Markierung offener Todesvorgänge. Kein Undo. Replay und Seed bleiben deterministisch.

ACHTUNG: Dies ist ein experimenteller Regelwechsel. Alte v2.2-Kampf-JSON-Dateien müssen mit der v2.2-Engine reproduziert werden; v2.3 ist nicht rückwärtskompatibel. PvP braucht später einen autoritativen Server und Reduktion der verdeckten Zustandsdaten im Netzwerk.

Installation: Die sechs Webdateien im Repository ersetzen; index.html enthält Cache-Busting v2.3.
