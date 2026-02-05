import { Component, Inject, PLATFORM_ID, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-seguridad-ciudadana',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2 class="main-title">🛡️ Central de Emergencias</h2>

      <section class="incidencias-recientes">
        <div class="flex-header">
          <h3>🕒 Reportes Recientes</h3>
          <span class="live-dot">VIVO</span>
        </div>
        
        <div class="scroll-horizontal">
          <div class="card-reporte" *ngFor="let rep of reportesRecientes">
            <div class="card-tag">{{ rep.categoria }}</div>
            <p>{{ rep.subcategoria }}</p>
            <small>📍 {{ rep.ubicacion_incidencia | slice:0:30 }}...</small>
            <div class="card-footer">
              <span>{{ rep.hora_incidencia }}</span>
              <span class="status">{{ rep.estado }}</span>
            </div>
          </div>
          <div *ngIf="reportesRecientes.length === 0" class="no-data">
            Buscando incidencias...
          </div>
        </div>
      </section>

      <div class="map-wrapper">
        <div id="mapaGlobal"></div>
      </div>

      <p class="section-label">Servicios de Auxilio Rápido</p>

      <section class="selector-grid">
        <button (click)="verBomberos()" class="btn fire">🚒 Bomberos</button>
        <button (click)="verPolicia()" class="btn police">🚓 Policía</button>
        <button (click)="verSerenazgo()" class="btn serenazgo">🛡️ Serenazgo</button>
        <button (click)="verHospital()" class="btn hospital">🏥 Hospital</button>
      </section>

      <section *ngIf="activo" class="info-section animate-in">
        <div class="info-header">
          <h3>{{ infoTitulo }}</h3>
          <button (click)="activo = null" class="btn-close">✕</button>
        </div>
        <div [id]="'map' + activo.charAt(0).toUpperCase() + activo.slice(1)" class="map-detalle"></div>
      </section>
    </div>
  `,
  styles: [`
    @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    
    .page-container { padding: 15px; background: #f8f9fa; min-height: 100vh; font-family: 'Segoe UI', sans-serif; }
    .main-title { color: #003366; font-size: 22px; margin-bottom: 20px; text-align: center; font-weight: 800; }

    /* CARRUSEL HORIZONTAL MÓVIL */
    .incidencias-recientes { margin-bottom: 20px; }
    .flex-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .flex-header h3 { font-size: 14px; color: #444; margin: 0; }
    .live-dot { background: #ff0000; color: white; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: bold; animation: pulse 1.5s infinite; }
    
    .scroll-horizontal { display: flex; overflow-x: auto; gap: 12px; padding-bottom: 10px; scrollbar-width: none; }
    .scroll-horizontal::-webkit-scrollbar { display: none; }
    
    .card-reporte { 
      min-width: 200px; background: white; padding: 12px; border-radius: 15px; 
      box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #003366;
    }
    .card-tag { font-size: 9px; font-weight: bold; color: #003366; text-transform: uppercase; margin-bottom: 5px; }
    .card-reporte p { margin: 0; font-weight: bold; font-size: 13px; color: #333; }
    .card-reporte small { color: #777; font-size: 11px; }
    .card-footer { display: flex; justify-content: space-between; margin-top: 10px; font-size: 10px; font-weight: bold; }
    .status { color: #28a745; text-transform: uppercase; }

    /* MAPA */
    .map-wrapper { border-radius: 20px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.1); margin-bottom: 20px; border: 3px solid white; }
    #mapaGlobal { height: 300px; width: 100%; }

    /* BOTONES GRID */
    .section-label { font-size: 12px; font-weight: bold; color: #888; text-transform: uppercase; margin-bottom: 10px; }
    .selector-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .btn { padding: 15px 10px; border: none; border-radius: 12px; color: white; font-weight: bold; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; }
    .fire { background: #d32f2f; } .police { background: #1976d2; } .serenazgo { background: #00796b; } .hospital { background: #388e3c; }

    /* DETALLE */
    .info-section { position: fixed; bottom: 0; left: 0; right: 0; background: white; border-radius: 25px 25px 0 0; padding: 20px; z-index: 1000; box-shadow: 0 -10px 30px rgba(0,0,0,0.2); }
    .info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .btn-close { background: #eee; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; }
    .map-detalle { height: 250px; border-radius: 15px; }

    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    .animate-in { animation: slideUp 0.4s ease-out; }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  `]
})
export class SeguridadCiudadanaComponent implements OnInit {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);
  
  reportesRecientes: any[] = [];
  mapas: any = {};
  activo: string | null = null;
  infoTitulo: string = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarDataYMapa();
    }
  }

  async cargarDataYMapa() {
    const L = await import('leaflet');
    const mapG = L.map('mapaGlobal', { zoomControl: false }).setView([-9.125, -78.520], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapG);

    this.apiService.getAll('reporte_incidencias').subscribe({
      next: (res: any) => {
        // Guardamos los 5 más recientes para el carrusel
        this.reportesRecientes = res.slice(0, 5);

        // Ponemos TODOS los reportes en el mapa
        res.forEach((rep: any) => {
          const lat = parseFloat(rep.latitud);
          const lng = parseFloat(rep.longitud);
          if (!isNaN(lat) && !isNaN(lng)) {
            const icon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background:#003366; width:12px; height:12px; border-radius:50%; border:2px solid white;"></div>`,
              iconSize: [12, 12]
            });
            L.marker([lat, lng], { icon }).addTo(mapG)
              .bindPopup(`<b>${rep.subcategoria}</b><br><small>${rep.hora_incidencia}</small>`);
          }
        });
        this.mapas['global'] = mapG;
      }
    });
  }

  async crearMapaDetalle(id: string, lat: number, lng: number, titulo: string) {
    this.infoTitulo = titulo;
    const L = await import('leaflet');
    
    // Limpiar mapas anteriores si existen
    if (this.mapas['detalle']) {
      this.mapas['detalle'].remove();
    }

    setTimeout(() => {
      const mapD = L.map(id).setView([lat, lng], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapD);
      L.marker([lat, lng]).addTo(mapD).bindPopup(titulo).openPopup();
      this.mapas['detalle'] = mapD;
    }, 200);
  }

  verBomberos() { this.activo = 'bomberos'; this.crearMapaDetalle('mapBomberos', -9.1273813, -78.5216314, 'Cía de Bomberos B107'); }
  verPolicia() { this.activo = 'policia'; this.crearMapaDetalle('mapPolicia', -9.1277948, -78.5213693, 'Comisaría Buenos Aires'); }
  verSerenazgo() { this.activo = 'serenazgo'; this.crearMapaDetalle('mapSerenazgo', -9.1265817, -78.5222312, 'Base Serenazgo'); }
  verHospital() { this.activo = 'hospital'; this.crearMapaDetalle('mapHospital', -9.1190053, -78.5200058, 'Hospital Regional'); }
}