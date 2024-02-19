[Orthanc multithread](https://orthanc.uclouvain.be/book/faq/scalability.html)

## Test1

- `fetch.html` fa download in streaming da orthanc di due immagini da ca. 50 mb in parallelo dal "main"
- `fetch-ww.html` fa downlaod delle stesse due immagini ma spawnando due webworker

Risultato: i tempi di download sono molto simili se lascio la rete al massimo (100 megabit/s), circa 8 e 11 secondi per le due serie rispettivamente. La serie che ci mette di più sembra andare più piano mentre anche l'altra è in download.
Se strozzo la rete a 10 megabit, entrambe hanno esattamente lo stesso tempo di download (1.5 min) con entrambi i metodi.

## Next

Provare con un server utilizzando le websocket per il download.

| Test  | Descr |
| ----- | ----- |
| Test1 | ...   |
| Test2 | ...   |
| Test2 | ...   |
