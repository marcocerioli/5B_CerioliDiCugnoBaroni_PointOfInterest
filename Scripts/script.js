import { createMap, createAdd, createTable } from './components.js';

const mapContainer = document.getElementById('map-container');
const tableContainer = document.getElementById('table-container');
const modalContainer = document.getElementById('modal-container');

const add_btn = document.getElementById('add');

let luoghi = [
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

let map = createMap(mapContainer);

let table = createTable(tableContainer);// creo oggetto
table.setData(luoghi);

let add = createAdd(modalContainer);


// Funzione per il rendering della pagina
function render() {
    map.renderMap();
    table.renderTable();
    luoghi = add.createModal(add_btn);
    console.log(luoghi);
}

render();



// Barra di ricerca
document.getElementById('searchButton').onclick = () => {
    let searchTerm = document.getElementById('searchInput').value;
    const dati_filtrati = dati.filter((e) =>
        e.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    table.setData(dati_filtrati);
    table.renderTable();
};
