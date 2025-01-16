export function createMap(parentElement){
    let map;
    return{
        renderMap: () => {
            parentElement.style.height = '500px';
            parentElement.style.width = '100%';
        
            map = L.map(parentElement).setView([42.5, 12.5], 5); // Coordinate dell'Italia
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);
        }
    }
}

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
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrizione</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
            `;            

            // Aggiunta delle righe con i dati filtrati
            dati.forEach((e) => {
                html += `
                <tr>
                    <td>${e.id}</td>
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

export function createAdd(parentElement){
    let luoghi = [];
    return{
        createModal: (add_btn) => {
          const modalContainer = parentElement;
        
          // HTML della modale
          const modalHTML = `        
            <div id="luoghiModal" class="modal" tabindex="-1" style="display: none;">
              <div class="modal-dialog">
                <div class="modal-content">
        
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">Aggiungi Luogo</h1>
                  </div>
        
                  <div class="modal-body">
                    <form id="luoghiForm">
        
                      <div class="form-group">
                        <label for="Nome">Nome</label>
                        <input type="text" class="form-control" id="nome" required>
                      </div>
        
                      <div class="form-group">
                        <label for="descrizione">Descrizione</label>
                        <textarea class="form-control" id="descrizione" required></textarea>
                      </div>

                      <div class="form-group">
                        <label for="foto">Foto (url)</label>
                        <input type="text" class="form-control" id="foto" required>
                      </div>
        
                      <button type="button" id="submit" class="btn btn-primary">Invia</button>
                      <button type="button" id="cancelButton" class="btn btn-secondary">Annulla</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          `;
        
          modalContainer.innerHTML += modalHTML;
        
          const modal = document.getElementById('luoghiModal');
          const cancelButton = document.getElementById('cancelButton');
          const submitButton = document.getElementById('submit');
        
         
          add_btn.onclick = () => {
            modal.style.display = 'block';
            console.log("Modale mostrata:", modal.style.display);
          };
        
          cancelButton.onclick = () => {
            modal.style.display = 'none';
          };
        
          submitButton.onclick = () => {
            const nome = document.getElementById('nome').value;
            const descrizione = document.getElementById('descrizione').value;
            const foto = document.getElementById('nome').value;

            modal.style.display = 'none';
        
            const nuovoLuogo = {
              id: luoghi.length + 1,
              noem: nome,
              descrizione: descrizione,
              foto: foto
            };
        
            // Aggiungo il nuovo luogo alla lista
            luoghi.push(nuovoLuogo);
            modal.style.display = 'none'; // Chiudo la modale
            console.log(luoghi);
          };
        }
    }
}