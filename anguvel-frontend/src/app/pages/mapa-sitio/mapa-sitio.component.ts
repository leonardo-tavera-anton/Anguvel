import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core'; // IMPORTANTE: de @angular/core
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Solo common y isPlatformBrowser aquí
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mapa-sitio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <h2>Ubicación y Mapa del Sitio</h2>

      <div class="map-wrapper">
        <div id="map"></div>
      </div>

      <p>A continuación, se presenta la estructura de nuestro sitio web para facilitar su navegación.</p>
      
      <ul class="sitemap-list">
        <li><a routerLink="/">Inicio</a></li>
        <li>
          Trámites y Servicios
          <ul>
            <li><a routerLink="/tramites-licencias">Trámites y Licencias</a></li>
            <li><a routerLink="/gestion-tributaria">Gestión Tributaria y Pagos</a></li>
            <li><a routerLink="/seguridad-ciudadana">Seguridad Ciudadana</a></li>
            <li><a routerLink="/reporte-incidencias">Reporte de Incidencias</a></li>
            <li><a routerLink="/consultas-proyectos">Consultas de Proyectos</a></li>
            <li><a routerLink="/usuarios">Gestión de Usuarios</a></li>
          </ul>
        </li>
        <li>
          Información Institucional
          <ul>
            <li><a routerLink="/preguntas-frecuentes">Preguntas Frecuentes</a></li>
            <li><a routerLink="/politica-privacidad">Política de Privacidad</a></li>
          </ul>
        </li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </div>
  `,
  styles: [`
    @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

    .page-container { padding: 2rem; max-width: 800px; margin: 0 auto; text-align: left; }
    .map-wrapper { 
      margin-bottom: 2rem; 
      border-radius: 15px; 
      overflow: hidden; 
      border: 1px solid #ccc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    #map { height: 350px; width: 100%; z-index: 1; background: #f8f9fa; }
    h2 { color: #003366; text-align: center; margin-bottom: 2rem; }
    .sitemap-list { list-style: none; padding-left: 0; }
    .sitemap-list li { margin-bottom: 0.75rem; font-size: 1.1rem; }
    .sitemap-list li a { color: #0056b3; text-decoration: none; }
    .sitemap-list li a:hover { text-decoration: underline; }
    .sitemap-list ul { list-style: disc; padding-left: 20px; margin: 0.5rem 0; }
  `]
})
export class MapaSitioComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  private async loadLeaflet() {
    // Importación dinámica para evitar problemas con SSR
    const L = await import('leaflet');
    
    // Coordenadas: Nuevo Chimbote
    const lat = -9.1271288;
    const lng = -78.5216441;

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const iconDefault = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    L.marker([lat, lng], { icon: iconDefault })
      .addTo(map)
      .bindPopup('<b>Municipalidad Distrital</b>')
      .openPopup();
  }
}