import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="main-wrapper">
      <section class="content-area">
        <div class="card">
          <h2>🚨 Registro con GPS y Foto</h2>
          
          <form (ngSubmit)="enviarIncidencia()">
            <div class="form-grid">
              
              <div class="field">
                <label>Categoría</label>
                <select [(ngModel)]="nuevoReporte.categoria" name="cat" (change)="onCategoriaChange()">
                  <option *ngFor="let cat of categoriasKeys" [value]="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="field">
                <label>Subcategoría</label>
                <select [(ngModel)]="nuevoReporte.subcategoria" name="sub" [disabled]="!nuevoReporte.categoria">
                  <option *ngFor="let sub of subcategoriasDisponibles" [value]="sub">{{ sub }}</option>
                </select>
              </div>

              <div class="field full">
                <label>Ubicación (Detectada automáticamente)</label>
                <div class="input-with-btn">
                  <input type="text" [(ngModel)]="nuevoReporte.ubicacion_incidencia" name="ubi" placeholder="Esperando GPS...">
                  <button type="button" class="btn-gps" (click)="obtenerGeolocalizacion()">
                    📍 {{ cargandoGps ? 'Buscando...' : 'Mi ubicación' }}
                  </button>
                </div>
                <small class="coords" *ngIf="nuevoReporte.latitud">
                  Coordenadas: {{ nuevoReporte.latitud }}, {{ nuevoReporte.longitud }}
                </small>
              </div>

              <div class="field full">
                <label>Evidencia Fotográfica</label>
                <div class="upload-container" (click)="fileInput.click()">
                  <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" hidden>
                  <div *ngIf="!imagePreview" class="upload-placeholder">
                    <span class="icon">📷</span>
                    <p>Haz clic para subir o tomar foto</p>
                  </div>
                  <img *ngIf="imagePreview" [src]="imagePreview" class="preview-img">
                </div>
              </div>

              <div class="field">
                <label>Fecha</label>
                <input type="text" [value]="nuevoReporte.fecha_incidencia" readonly class="readonly">
              </div>

              <div class="field">
                <label>Hora</label>
                <input type="text" [value]="nuevoReporte.hora_incidencia" readonly class="readonly">
              </div>

              <div class="field full">
                <label>Descripción</label>
                <textarea [(ngModel)]="nuevoReporte.descripcion" name="desc" rows="2"></textarea>
              </div>
            </div>

            <button type="submit" class="btn-send" [disabled]="cargandoGps">
              🚀 ENVIAR REPORTE A LARAVEL
            </button>
          </form>
        </div>
      </section>

      <aside class="sidebar" *ngIf="historicoReal.length > 0">
        <h3>📊 Estadísticas Reales</h3>
        <div class="ranking-item" *ngFor="let item of rankingFrecuentes">
          <span>{{ item.nombre }}</span>
          <strong>{{ item.cantidad }}</strong>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .main-wrapper { display: flex; gap: 20px; padding: 20px; font-family: 'Segoe UI', sans-serif; background: #f4f7f6; }
    .content-area { flex: 3; }
    .card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
    
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .full { grid-column: span 2; }
    
    .input-with-btn { display: flex; gap: 8px; }
    .btn-gps { background: #28a745; color: white; border: none; padding: 0 15px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
    
    .upload-container { 
      border: 2px dashed #003366; border-radius: 10px; height: 180px; 
      display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden;
      background: #f8fbff;
    }
    .preview-img { width: 100%; height: 100%; object-fit: cover; }
    .upload-placeholder { text-align: center; color: #003366; }
    .icon { font-size: 40px; }

    .btn-send { 
      margin-top: 20px; width: 100%; padding: 15px; background: #003366; 
      color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; 
    }
    .readonly { background: #eee; }
    .sidebar { flex: 1; background: white; padding: 20px; border-radius: 12px; height: fit-content; }
    .ranking-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
  `]
})
export class ReporteIncidenciasComponent implements OnInit {

  // Mapeo de Categorías
  catalogo: { [key: string]: string[] } = {
    'INFRAESTRUCTURA': ['ALUMBRADO', 'VEREDAS', 'PISTAS/BACHES', 'SEMAFOROS'],
    'AREAS VERDES': ['ARBOL CAIDO', 'INCENDIO FORESTAL', 'PODA'],
    'ANIMALES': ['ABANDONO', 'MALTRATO', 'ANIMAL HERIDO'],
    'DELICTIVOS': ['ROBO', 'SOSPECHOSO', 'PELEAS', 'ASESINATO'],
    'LIMPIEZA': ['BASURA ACUMULADA', 'QUEMA DE BASURA']
  };

  categoriasKeys = Object.keys(this.catalogo);
  subcategoriasDisponibles: string[] = [];
  
  // Datos para el Modelo de Laravel
  nuevoReporte = {
    numero_ticket: '',
    estado: 'pendiente' as const,
    categoria: 'INFRAESTRUCTURA',
    subcategoria: '',
    descripcion: '',
    ubicacion_incidencia: '',
    latitud: '',
    longitud: '',
    fecha_incidencia: '',
    hora_incidencia: '',
    foto_adjunta: null as any // Aquí irá el archivo real
  };

  imagePreview: string | null = null;
  cargandoGps = false;
  historicoReal: any[] = [];
  rankingFrecuentes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setTiempoReal();
    this.onCategoriaChange();
  }

  setTiempoReal() {
    const ahora = new Date();
    this.nuevoReporte.fecha_incidencia = ahora.toLocaleDateString('en-CA');
    this.nuevoReporte.hora_incidencia = ahora.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    this.nuevoReporte.numero_ticket = 'TK-' + Math.floor(Math.random() * 100000);
  }

  onCategoriaChange() {
    this.subcategoriasDisponibles = this.catalogo[this.nuevoReporte.categoria];
    this.nuevoReporte.subcategoria = this.subcategoriasDisponibles[0];
  }

  // --- LÓGICA DE GEOLOCALIZACIÓN ---
  obtenerGeolocalizacion() {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta GPS");
      return;
    }

    this.cargandoGps = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.nuevoReporte.latitud = pos.coords.latitude.toString();
        this.nuevoReporte.longitud = pos.coords.longitude.toString();
        
        // Llamada a API externa para obtener el nombre de la calle (Reverse Geocoding)
        this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.nuevoReporte.latitud}&lon=${this.nuevoReporte.longitud}`)
          .subscribe(data => {
            this.nuevoReporte.ubicacion_incidencia = data.display_name;
            this.cargandoGps = false;
          });
      },
      (error) => {
        alert("Error al obtener ubicación. Asegúrate de dar permisos.");
        this.cargandoGps = false;
      }
    );
  }

  // --- LÓGICA DE FOTO ---
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoReporte.foto_adjunta = file; // Guardamos el archivo para enviarlo
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  enviarIncidencia() {
    // Al ser una App con Archivos, en el servicio usarías FormData
    const formData = new FormData();
    Object.keys(this.nuevoReporte).forEach(key => {
      formData.append(key, (this.nuevoReporte as any)[key]);
    });

    console.log("FormData listo para enviar al controlador de Laravel");
    this.historicoReal.push({...this.nuevoReporte});
    this.actualizarRanking();
    alert("Reporte enviado con éxito con Foto y GPS");
  }

  actualizarRanking() {
    const counts = this.historicoReal.reduce((acc, curr) => {
      acc[curr.subcategoria] = (acc[curr.subcategoria] || 0) + 1;
      return acc;
    }, {});
    this.rankingFrecuentes = Object.keys(counts).map(k => ({ nombre: k, cantidad: counts[k] }));
  }
}