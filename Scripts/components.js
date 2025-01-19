import { hide, show } from './functions.js';

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

export function createTable(parentElement, pubsub) {
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
                    <th>Coordinate</th>
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
                    <td>${e.coordinate}</td>
                    <td>
                        <img src="${e.foto}" alt="${e.nome}" style="width: 150px; height: auto;">
                    </td>
                </tr>
                `;
            });
            
            html += '</tbody></table>';
            parentElement.innerHTML = html;            
        }
    };
}

export function createAdd(parentElement, pubsub) {
  let luoghi = []; // Lista dei luoghi

  return {
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
                                      <label for="coordinate">Coordinate</label>
                                      <input type="text" class="form-control" id="coordinate" required>
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

          // Elementi della modale
          const modal = document.getElementById('luoghiModal');
          const cancelButton = document.getElementById('cancelButton');
          const submitButton = document.getElementById('submit');

          // Mostra la modale
          add_btn.onclick = () => {
              modal.style.display = 'block';
              console.log("Modale mostrata:", modal.style.display);
          };

          // Nascondi la modale
          cancelButton.onclick = () => {
              modal.style.display = 'none';
          };

          // Invia i dati
          submitButton.onclick = () => {
              const nome = document.getElementById('nome').value;
              const descrizione = document.getElementById('descrizione').value;
              const coordinate = document.getElementById('coordinate').value;
              const foto = document.getElementById('foto').value;

              const nuovoLuogo = {
                  id: luoghi.length + 1,
                  nome: nome,
                  descrizione: descrizione,
                  coordinate: coordinate,
                  foto: foto
              };

              // Aggiungi alla lista locale
              luoghi.push(nuovoLuogo);

              // pubblico l'evento
              pubsub.publish("newPlaceAdded", luoghi);

              // Chiudi la modale
              modal.style.display = 'none';
              console.log("Nuovo luogo aggiunto:", nuovoLuogo);
          };
      }
  };
}

export function createLogin(parentElement, myToken) {
    let isLogged = false;

    return {
        createModal: (login_btn) => {
            console.log("isLogged     ",isLogged)

            const loginContainer = parentElement;

            const loginHTML = `
        
            <div id="loginModal" class="modal" tabindex="-1" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
        
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Login</h1>
                </div>
        
                <div class="modal-body">
                    <form id="loginForm">
        
                    <div class="form-group">
                        <label for="user">User</label>
                        <input type="text" class="form-control" id="user" required>
                    </div>
        
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
        
                    <button type="button" id="submitBtn" class="btn btn-primary">Invia</button>
                    <button type="button" id="cancelBtn" class="btn btn-secondary">Annulla</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
            `;
        
            loginContainer.innerHTML += loginHTML;
        
            const modal = document.getElementById('loginModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const submitBtn = document.getElementById('submitBtn');
        
  
  
        const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": myToken
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(r => {
                resolve(r.result);
            })
            .catch(reject);
        });
        };
  
  
        login_btn.onclick = () => {
        modal.style.display = 'block';
        };
    
        cancelBtn.onclick = () => {
        modal.style.display = 'none';
        };
  

        submitBtn.onclick = () => {
        const inputName = document.getElementById('user').value;
        const inputPassword = document.getElementById('password').value;
        login(inputName, inputPassword).then((result) => {
            if (result) {
                isLogged = true;
                console.log("login riuscito");
                console.log(inputName);
                console.log(inputPassword);
                modal.style.display = 'none';
            } else {
                console.log("login fallita");
            }
        });
        };
        }
    }
  
  }

export const createPubSub = () => {
  const dict = {};
  return {
      subscribe: (eventName, callback) => {
          // controllo se esiste l'evento, senno lo creo
          if (!dict[eventName]) {
              dict[eventName] = [];
          }
          // aggiungo la callback
          dict[eventName].push(callback);
      },
      publish: (eventName, data) => {
          // controllo se ce gia una callback per l'evento
          if (dict[eventName]) {
              // per ogni callback, invio anche i dati
              dict[eventName].forEach((callback) => callback(data));
          }
      }
  }
}

export const createNavigator = (parentElement) => {
  const pages = Array.from(parentElement.querySelectorAll(".page"));
  
  const render = () => {
      const url = new URL(document.location.href);
      const pageName = url.hash.replace("#", "");
      const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
  
      hide(pages);
      show(selected);
  }
  window.addEventListener('popstate', render); 
  render();   
}