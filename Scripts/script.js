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
    console.log("chiave:  ", myKey);
    console.log("token:  ", myToken);

    carica(myKey, myToken).then(() => {
        console.log("luoghi:  ", luoghi);
        render();
      });
  })
  .catch((error) => console.error('Errore:', error));

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

const pubsub = createPubSub();

const nav = createNavigator(document.querySelector('#container'));

let map = createMap(mapContainer);

let table = createTable(tableContainer, pubsub);// creo oggetto
table.setData(luoghi);

let add = createAdd(modalContainer, pubsub);


function render(){
  map.renderMap();

  table.setData(luoghi);
  table.renderTable();

  luoghi = add.createModal(add_btn);
}


// iscrivo all evento newPlaceAdded
pubsub.subscribe("newPlaceAdded", (newLuoghi) => {
  luoghi.push(newLuoghi);
  console.log("Nuovo luogo aggiunto, aggiorno la tabella.");
  table.setData(luoghi); // aggiorna i dati della tabella
  table.renderTable(); // render della tabella con i nuovi dati

  // Salva i luoghi dopo averli aggiornati
  salva(myKey, myToken, newLuoghi).then(() => {
    console.log('Luoghi salvati con successo.');
  }).catch(err => {
    console.log('Errore durante il salvataggio:', err);
  });
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