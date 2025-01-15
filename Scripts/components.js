export function createTable(parentElement) {
    let dati;
    let searchTerm = ''; // Variabile per la ricerca
    return {

        setData: (newData) => {
            dati = newData
        },

        renderTable: () => {
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
            

            // Aggiunta delle righe con i dati filtrati
            dati.forEach((e) => {
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
            
        }
    };
}