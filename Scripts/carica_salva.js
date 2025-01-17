let myToken, myKey;
export let luoghi = [];

export function carica(myKey,myToken) {
  return fetch('https://ws.cipiaceinfo.it/cache/get', {
    headers: {
      'Content-Type': 'application/json',
      key: myToken,
    },
    method: 'POST',
    body: JSON.stringify({
      key: myKey,
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      console.log('Dati caricati:', r.result);
      luoghi = r.result || [];
    })
    .catch((err) => console.log('Errore durante il caricamento:', err));
}

export function salva(myKey,myToken,luoghi) {
  return fetch('https://ws.cipiaceinfo.it/cache/set', {
    headers: {
      'Content-Type': 'application/json',
      key: myToken,
    },
    method: 'POST',
    body: JSON.stringify({
      key: myKey,
      value: luoghi,
    }),
  })
    .then((r) => r.json())
    .then((r) => {
      console.log('Dati salvati:', r);
      return r;
    })
    .catch((err) => console.log('Errore durante il salvataggio:', err));
}
