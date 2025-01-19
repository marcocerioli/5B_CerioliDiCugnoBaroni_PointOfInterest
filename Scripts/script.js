import { createMap, createAdd, createTable, createNavigator, createPubSub } from './components.js';
import { carica, salva, luoghi } from './carica_salva.js';
const mapContainer = document.getElementById('map-container');
const tableContainer = document.getElementById('table-container');
const modalContainer = document.getElementById('modal-container');
const add_btn = document.getElementById('add');
let myToken, myKey;

fetch('./conf.json')
  .then((response) => {
    if (!response.ok) {
      console.log('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then((data) => {
    myToken = data.cacheToken;
    myKey = data.myKey;
    console.log(myKey);
    console.log(myToken);

    carica(myKey, myToken)
      .then((loadedLuoghi) => {
        console.log("luoghi", loadedLuoghi);
        render();
      });
  })
  .catch((error) => console.error('Errore:', error));

//carica(myKey,myToken);

let l = [
    {
        "id": "1",
        "nome": "Roma",
        "descrizione": "Capitale d'Italia, famosa per la sua storia millenaria, il Colosseo, il Vaticano e la sua cucina tradizionale.",
        "coordinate": "00000000000",
        "foto": "https://i.postimg.cc/rwyqGd64/roma.png"
    },
    {
        "id": "2",
        "nome": "Milano",
        "descrizione": "Duomo🔥🔥🔥🔥.",
        "coordinate": "00000000000",
        "foto": "https://i.postimg.cc/rwyqGd64/roma.png"

    },
    {
        "id": "3",
        "nome": "Vimodrone",
        "descrizione": "Capitale del mondo.",
        "coordinate": "00000000000",
        "foto": "https://i.postimg.cc/rwyqGd64/roma.png"

    }
];

//admin componente in una pag admin
//oggetto che entrambi vedeono e notifica pub sub       lista mappa e elenco
//dirty ----> cache
//
//pubsub
//navigator

const pubsub = createPubSub();

const nav = createNavigator(document.querySelector('#container'));

let map = createMap(mapContainer);

let table = createTable(tableContainer, pubsub);// creo oggetto
table.setData(l);

let add = createAdd(modalContainer, pubsub);


function render() {
  map.renderMap();
  table.renderTable();
  l = add.createModal(add_btn);
}


// iscrivo all evento newPlaceAdded
pubsub.subscribe("newPlaceAdded", (newLuoghi) => {
  console.log("Nuovo luogo aggiunto, aggiorno la tabella.");
  table.setData(newLuoghi); // aggiorna i dati della tabella
  table.renderTable(); // render della tabella con i nuovi dati
});


//render();



// barra di ricerca
document.getElementById('searchButton').onclick = () => {
    let searchTerm = document.getElementById('searchInput').value;
    const dati_filtrati = dati.filter((e) =>
        e.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    table.setData(dati_filtrati);
    table.renderTable();
};