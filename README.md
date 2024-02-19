## Pineco

Questa repo contiene una serie di test a livelli incrementali di complessità sull'utilizzo di webworker per il download di dati via websocket.

### Run tests

L'unica dipendenza lato backend è `ws`, che può essere installata con `npm i`.

Per ogni test c'è una cartella che contiene:

- un html con il codice main che istanzia i worker
- un `worker.js` con il codice del worker
- eventualmente un `backend.js`

Per lanciare il test eseguire, da terminale (node version >18):

```
node --expose-gc backend.js
```

E servire il file html con un qualsiasi webserver.

## Descrizione test

- `fetch.html` fa download in streaming da orthanc di due immagini da ca. 50 mb in parallelo dal "main"
- `fetch-ww.html` fa downlaod delle stesse due immagini ma spawnando due webworker

Risultato: i tempi di download sono molto simili se lascio la rete al massimo (100 megabit/s), circa 8 e 11 secondi per le due serie rispettivamente. La serie che ci mette di più sembra andare più piano mentre anche l'altra è in download.
Se strozzo la rete a 10 megabit, entrambe hanno esattamente lo stesso tempo di download (1.5 min) con entrambi i metodi.

## Sunto

| Test  | Descr                                                           |
| ----- | --------------------------------------------------------------- |
| Test1 | No ww, no ws. Due fetch in parallelo dal main                   |
| Test2 | Due ww, no ws. Ogni ww esegue una fetch                         |
| Test3 | Due ww che scaricano sulla stessa ws (porta 8080)               |
| Test4 | Duw ww che scaricano su due ws indipendenti (porta 8081 e 8082) |

## ToDo

- Test con 1 solo ww e 1 ws
- Sdoppiare backend (o due thread o due server)
