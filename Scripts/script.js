import { createMap, createAdd, createTable, createNavigator, createPubSub, createLogin } from './components.js';
import { carica, salva, luoghi } from './carica_salva.js';
const mapContainer = document.getElementById('map-container');
const tableContainer = document.getElementById('table-container');
const modalContainer = document.getElementById('modal-container');
const loginContainer = document.getElementById('login-container');
const tableAdmin = document.getElementById('table-container-admin');
const add_btn = document.getElementById('add');
const login_btn = document.getElementById('login');
let myToken, myKey, tokenMap;


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
    tokenMap = data.TokenLocationIQ
    console.log("chiave:  ", myKey);
    console.log("token:  ", myToken);
    console.log("tokenMap:  ", tokenMap);

    carica(myKey, myToken).then(() => {
        console.log("CARICA:  ", luoghi);
        render();
      });
  })
  .catch((error) => console.error('Errore:', error));


const pubsub = createPubSub();

const nav = createNavigator(document.querySelector('#container'));

let map = createMap(mapContainer);

let table = createTable(tableContainer, pubsub);// creo oggetto
let table2 = createTable(tableAdmin,pubsub);

let add = createAdd(modalContainer, pubsub);

let login = createLogin(loginContainer, myToken, pubsub);
login.createModal(login_btn);


function render(){
  map.renderMap();

  table.setData(luoghi, tokenMap);
  table.renderTable();

  luoghi = add.createModal(add_btn);
}


// iscrivo all evento newPlaceAdded
pubsub.subscribe("newPlaceAdded", (luoghi) => {
  console.log("Nuovo luogo aggiunto, aggiorno la tabella.");
  table.setData(luoghi, tokenMap); // aggiorna i dati della tabella
  table.renderTable(); // render della tabella con i nuovi dati

  // Salva i luoghi dopo averli aggiornati
  salva(myKey, myToken, luoghi).then(() => {
    console.log('Luoghi salvati con successo.');
  }).catch(err => {
    console.log('Errore durante il salvataggio:', err);
  });
});


pubsub.subscribe("Logged", (isLogged) => {
  console.log("tabella aggiornata ", isLogged);
  table2.setData(luoghi, tokenMap); // aggiorna i dati della tabella
  table2.renderTableAdmin(); // render della tabella con i nuovi dati
});

// barra di ricerca
document.getElementById('searchButton').onclick = () => {
    let searchTerm = document.getElementById('searchInput').value;
    const dati_filtrati = dati.filter((e) =>
        e.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    table.setData(dati_filtrati);
    table.renderTable();
};