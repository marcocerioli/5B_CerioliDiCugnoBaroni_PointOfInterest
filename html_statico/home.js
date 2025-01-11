const mapContainer = document.getElementById('map-container');

let map;

function createMap(parentElement) {
    parentElement.style.height = '500px';
    parentElement.style.width = '100%';

    map = L.map(parentElement).setView([42.5, 12.5], 5); // coordinate dell'Italia
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);
}

function render() {
    createMap(mapContainer);
}

render();
