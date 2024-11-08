import L from 'leaflet';
import marker from '../assets/marker.svg';
import waypoints from '../data/waypoints';

export default class Map {
    constructor(elementId) {
        this.map = L.map(elementId).setView([6.769671493971395, -73.26342750849783], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '...'
        }).addTo(this.map);

        this.addWaypoints();
        this.addPolyline();
    }

    addWaypoints() {

        const icon = L.icon({
            iconUrl: marker, // Usa la cadena SVG importada
            iconSize: [25, 41], // Ajusta el tamaño del icono
            iconAnchor: [12, 41], // Punto de anclaje del icono (la punta)
            popupAnchor: [1, -41], // Ajusta la posición del popup
        });

        waypoints.forEach(waypoint => {
            L.marker([waypoint.lat, waypoint.lng], {icon: icon})
                .addTo(this.map)
                .bindPopup(waypoint.name)
                .on('mouseover', function() { this.openPopup(); })
                .on('mouseout', function() { this.closePopup(); });
        });
    }


    addPolyline() {
        const coordinates = waypoints.map(waypoint => [waypoint.lat, waypoint.lng]);

        L.polyline(coordinates, {
            color: '#A37547', //
            weight: 5,        // Grosor de la línea
            opacity: 0.8,      // Opacidad
            dashArray: '10, 10', // Patrón de línea discontinua (segmentada)
            lineJoin: 'round'   // Estilo de unión entre segmentos
        }).addTo(this.map);
    }
}