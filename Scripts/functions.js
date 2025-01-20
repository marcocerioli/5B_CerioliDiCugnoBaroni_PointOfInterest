//import { tokenMap } from './script.js';

export const hide = (elements) => {
    elements.forEach((element) => {
       element.classList.add("hidden");
       element.classList.remove("visible");
    });
}
 
export const show = (element) => {
    element.classList.add("visible");
    element.classList.remove("hidden");   
}

export function getCoordinates(luogo, tokenMap) {
    console.log(tokenMap);
    let url = `https://us1.locationiq.com/v1/search?key=${tokenMap}&q=${encodeURIComponent(luogo)}&format=json`;
    console.log("url:", url);
  
    // Restituisce una Promise che si risolve con le coordinate
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            resolve({ lat, lon });  // Risolve la Promise con le coordinate
          } else {
            console.log('Luogo non trovato:', luogo);
            reject('Luogo non trovato');
          }
        })
        .catch((error) => {
          console.error('Errore nel geocoding:', error);
          reject('Errore nel geocoding');
        });
    });
  }