const mapContainer = document.getElementById('map-container');
const tableContainer = document.getElementById('table-container');

let dati = [];
let map;
let renderTable; // Funzione globale per il rendering della tabella

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

// Funzione per creare la tabella
function createTable(parentElement) {
    dati = [
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

    let searchTerm = ''; // Variabile per la ricerca

    renderTable = function () {
        let html = '';

        // Input per la ricerca
        html += `
        <div class="search-container">
            <div class="input-group mb-3">
                <input type="text" id="searchInput" class="form-control" placeholder="Cerca per nome..." value="${searchTerm}">
                <button id="searchButton" class="btn btn-primary">Cerca</button>
            </div>
        </div>
        `;

        // Struttura della tabella
        html += '<table class="table table-bordered table-striped table-container">';
        html += `
        <thead class="prova">
            <tr>
                <th>Nome</th>
                <th>Descrizione</th>
                <th>Foto</th>
            </tr>
        </thead>
        <tbody>
        `;

        // Filtraggio dei dati in base alla ricerca
        const filteredData = dati.filter((e) =>
            e.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Aggiunta delle righe con i dati filtrati
        filteredData.forEach((e) => {
            html += `
            <tr>
                <td>${e.nome}</td>
                <td>${e.descrizione}</td>
                <td>
                    ${e.foto ? `<img src="${e.foto}" alt="${e.nome}" style="width: 150px; height: auto;">` : 'N/A'}
                </td>
            </tr>
            `;
        });

        html += '</tbody></table>';
        parentElement.innerHTML = html;

        // Assegna l'evento al bottone di ricerca
        document.getElementById('searchButton').onclick = () => {
            searchTerm = document.getElementById('searchInput').value;
            renderTable();
        };
    };

    renderTable(); // Render iniziale della tabella
}

// Funzione per il rendering della pagina
function render() {
    createMap(mapContainer);
    createTable(tableContainer);
}

render();
