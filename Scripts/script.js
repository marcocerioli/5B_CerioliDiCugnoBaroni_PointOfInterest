import { createTable } from './components.js';

const mapContainer = document.getElementById('map-container');
const tableContainer = document.getElementById('table-container');

let dati = [
    {
        "nome": "Roma",
        "descrizione": "Capitale d'Italia, famosa per la sua storia millenaria, il Colosseo, il Vaticano e la sua cucina tradizionale.",
        "foto": "https://i.postimg.cc/rwyqGd64/roma.png"
    },
    {
        "nome": "Milano",
        "descrizione": "Duomo🔥🔥🔥🔥."
    },
    {
        "nome": "Vimodrone",
        "descrizione": "Capitale del mondo."
    }
];

let map;

// Funzione per creare la mappa
function createMap(parentElement) {
    parentElement.style.height = '500px';
    parentElement.style.width = '100%';

    map = L.map(parentElement).setView([42.5, 12.5], 5); // Coordinate dell'Italia
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);
}


let table = createTable(tableContainer);// creo oggetto
table.setData(dati);

// Funzione per il rendering della pagina
function render() {
    createMap(mapContainer);
    table.renderTable();
}

render();




document.getElementById('searchButton').onclick = () => {
    let searchTerm = document.getElementById('searchInput').value;
    const dati_filtrati = dati.filter((e) =>
        e.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    table.setData(dati_filtrati);
    table.renderTable();
};
