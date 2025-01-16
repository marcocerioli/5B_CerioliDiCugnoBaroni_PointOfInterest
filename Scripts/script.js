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
        "foto": "https://i.postimg.cc/rwyqGd64/roma.png"
    },
    {
        "id": "2",
        "nome": "Milano",
        "descrizione": "Duomo🔥🔥🔥🔥."
    },
    {
        "id": "3",
        "nome": "Vimodrone",
        "descrizione": "Capitale del mondo."
    }
];


let map = createMap(mapContainer);

let table = createTable(tableContainer);// creo oggetto
table.setData(luoghi);

let add = createAdd(modalContainer);


// Funzione per il rendering della pagina
function render() {
    map.renderMap();
    table.renderTable();
    add.createModal(add_btn);
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
