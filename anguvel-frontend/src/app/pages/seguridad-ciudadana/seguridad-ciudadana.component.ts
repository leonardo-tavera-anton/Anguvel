import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-seguridad-ciudadana',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">

      <h2>🛡️ Seguridad Ciudadana</h2>
      <p class="subtitle">
        Seleccione el servicio que desea visualizar
      </p>

      <!-- BOTONES -->
      <section class="selector-grid">
        <button (click)="verBomberos()" class="btn fire">🚒 Bomberos</button>
        <button (click)="verPolicia()" class="btn police">🚓 Policía</button>
        <button (click)="verSerenazgo()" class="btn serenazgo">🛡️ Serenazgo</button>
        <button (click)="verHospital()" class="btn hospital">🏥 Hospital</button>
      </section>

      <!-- BOMBEROS -->
      <section *ngIf="activo === 'bomberos'" class="info-section fire-info">
        <h3>🚒 Bomberos Chimbote</h3>
        <p><strong>Teléfono:</strong> (043) 313333</p>
        <div id="mapBomberos"></div>
      </section>

      <!-- POLICÍA -->
      <section *ngIf="activo === 'policia'" class="info-section police-info">
        <h3>🚓 Policía Chimbote</h3>
        <p><strong>Teléfono:</strong> (043) 312010</p>
        <div id="mapPolicia"></div>
      </section>

      <!-- SERENAZGO -->
      <section *ngIf="activo === 'serenazgo'" class="info-section serenazgo-info">
        <h3>🛡️ Serenazgo</h3>
        <p><strong>Emergencias:</strong></p>
        <ul>
          <li>+51 935 912 001</li>
          <li>+51 927 420 002</li>
          <li>+51 916 140 004</li>
          <li>+51 927 640 006</li>
        </ul>
        <p><strong>Correo:</strong> seguridadciudadana@muninuevochimbote.gob.pe</p>
        <div id="mapSerenazgo"></div>
      </section>

      <!-- HOSPITAL -->
      <section *ngIf="activo === 'hospital'" class="info-section hospital-info">
        <h3>🏥 Hospital Regional Eleazar Guzmán Barrón</h3>
        <p><strong>Teléfono:</strong> (043) 311608</p>
        <div id="mapHospital"></div>
      </section>

    </div>
  `,
  styles: [`
    @import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

    .page-container { padding: 2rem; }
    h2 { color: #003366; }
    .subtitle { margin-bottom: 2rem; color: #555; }

    .selector-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 1rem;
      border: none;
      border-radius: 10px;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,.15);
    }

    .fire { background: #d32f2f; }
    .police { background: #1976d2; }
    .serenazgo { background: #00796b; }
    .hospital { background: #388e3c; }

    .info-section {
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .fire-info { background: #ffebee; }
    .police-info { background: #e3f2fd; }
    .serenazgo-info { background: #e0f2f1; }
    .hospital-info { background: #e8f5e9; }

    #mapBomberos,
    #mapPolicia,
    #mapSerenazgo,
    #mapHospital {
      height: 350px;
      width: 100%;
      margin-top: 1rem;
      border-radius: 12px;
    }
  `]
})
export class SeguridadCiudadanaComponent {

  activo: 'bomberos' | 'policia' | 'serenazgo' | 'hospital' | null = null;
  mapas: any = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  limpiarMapas() {
    Object.values(this.mapas).forEach((map: any) => map.remove());
    this.mapas = {};
  }

  async crearMapa(id: string, lat: number, lng: number, texto: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');

    if (this.mapas[id]) {
      this.mapas[id].remove();
      delete this.mapas[id];
    }

    setTimeout(() => {
      const map = L.map(id).setView([lat, lng], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(texto)
        .openPopup();

      map.invalidateSize();
      this.mapas[id] = map;
    }, 100);
  }

  verBomberos() {
    this.limpiarMapas();
    this.activo = 'bomberos';
    this.crearMapa('mapBomberos', -9.1273813, -78.5216314, '🚒 Bomberos Nuevo Chimbote');
  }

  verPolicia() {
    this.limpiarMapas();
    this.activo = 'policia';
    this.crearMapa('mapPolicia', -9.1277948, -78.5213693, '🚓 Policía Nuevo Chimbote');
  }

  verSerenazgo() {
    this.limpiarMapas();
    this.activo = 'serenazgo';
    this.crearMapa('mapSerenazgo', -9.1265817, -78.5222312, '🛡️ Serenazgo Nuevo Chimbote');
  }

  verHospital() {
    this.limpiarMapas();
    this.activo = 'hospital';
    this.crearMapa('mapHospital', -9.1190053,-78.5220558, '🏥 Hospital Regional Nuevo Chimbote');
  }
}
