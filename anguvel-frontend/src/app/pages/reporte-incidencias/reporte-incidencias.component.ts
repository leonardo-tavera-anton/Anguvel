import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="app-container">
      
      <header class="app-header">
        <div class="header-content">
          <h1>Munireporte 2026</h1>
          <span class="ticket-status">Ticket: {{ nuevoReporte.numero_ticket }}</span>
        </div>
      </header>

      <div class="main-layout">
        <main class="form-section">
          <div class="card">
            <p class="instruction">Complete los datos de la incidencia para atención inmediata.</p>

            <form (ngSubmit)="enviarIncidencia()">
              
              <div class="form-group">
                <label>¿Qué tipo de problema es?</label>
                <div class="custom-select">
                  <select [(ngModel)]="nuevoReporte.categoria" name="cat" (change)="onCategoriaChange()" required>
                    <option value="" disabled>Seleccione una categoría</option>
                    <option *ngFor="let cat of categoriasKeys" [value]="cat">{{ cat }}</option>
                  </select>
                </div>
              </div>

              <div class="form-group" *ngIf="nuevoReporte.categoria">
                <label>Detalle de la incidencia</label>
                <div class="custom-select">
                  <select [(ngModel)]="nuevoReporte.subcategoria" name="sub" required>
                    <option value="" disabled>Especifique el problema</option>
                    <option *ngFor="let sub of subcategoriasDisponibles" [value]="sub">{{ sub }}</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label>Lugar de la incidencia</label>
                <div class="location-box">
                  <input type="text" [(ngModel)]="nuevoReporte.ubicacion_incidencia" name="ubi" 
                         placeholder="Obteniendo dirección..." readonly>
                  <button type="button" class="gps-btn" (click)="obtenerGeolocalizacion()" [class.loading]="cargandoGps">
                    <span *ngIf="!cargandoGps">📍 Mi ubicación</span>
                    <span *ngIf="cargandoGps">⌛ Localizando...</span>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label>Descripción adicional (Opcional)</label>
                <textarea [(ngModel)]="nuevoReporte.descripcion" name="desc" 
                          placeholder="Ej. El poste está a punto de caer..." rows="3"></textarea>
              </div>

              <div class="form-group">
                <label>Evidencia (Foto)</label>
                <div class="photo-upload" (click)="fInput.click()">
                  <input #fInput type="file" (change)="onFileSelected($event)" accept="image/*" hidden>
                  <div *ngIf="!imagePreview" class="placeholder-content">
                    <span class="icon">📷</span>
                    <span>Tocar para tomar foto</span>
                  </div>
                  <img *ngIf="imagePreview" [src]="imagePreview" class="preview-img">
                  <button type="button" *ngIf="imagePreview" class="change-photo">Cambiar</button>
                </div>
              </div>

              <div class="time-info">
                <span>📅 {{ nuevoReporte.fecha_incidencia }}</span>
                <span>⏰ {{ nuevoReporte.hora_incidencia }}</span>
              </div>

              <button type="submit" class="submit-btn" [disabled]="cargandoGps || !nuevoReporte.subcategoria">
                ENVIAR REPORTE OFICIAL
              </button>
            </form>
          </div>
        </main>

        <aside class="stats-section" *ngIf="rankingFrecuentes.length > 0">
          <div class="stats-card">
            <h3>📈 Reportes de hoy</h3>
            <div class="stat-item" *ngFor="let item of rankingFrecuentes">
              <div class="stat-header">
                <span>{{ item.nombre }}</span>
                <strong>{{ item.cantidad }}</strong>
              </div>
              <div class="stat-bar"><div class="fill" [style.width.%]="(item.cantidad / totalHoy) * 100"></div></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    :host { --primary: #003366; --secondary: #28a745; --bg: #f0f4f8; }
    .app-container { background: var(--bg); min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }
    
    /* Header */
    .app-header { background: var(--primary); color: white; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .header-content { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .header-content h1 { font-size: 1.2rem; margin: 0; }
    .ticket-status { font-size: 0.8rem; opacity: 0.9; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; }

    /* Layout */
    .main-layout { display: flex; gap: 2rem; padding: 1.5rem; max-width: 1000px; margin: 0 auto; flex-wrap: wrap; }
    .form-section { flex: 2; min-width: 320px; }
    .stats-section { flex: 1; min-width: 280px; }

    /* Card & Forms */
    .card { background: white; padding: 1.5rem; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .instruction { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
    
    .form-group { margin-bottom: 1.2rem; }
    .form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; color: #333; }
    
    input, select, textarea { 
      width: 100%; padding: 12px; border: 2px solid #e1e8ef; border-radius: 12px; 
      font-size: 1rem; background: #f8fafc; transition: 0.3s;
    }
    input:focus, select:focus { border-color: var(--primary); outline: none; background: white; }

    /* Location Box */
    .location-box { display: flex; flex-direction: column; gap: 8px; }
    .gps-btn { 
      background: var(--secondary); color: white; border: none; padding: 12px; 
      border-radius: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;
    }
    .gps-btn:active { transform: scale(0.98); }
    .gps-btn.loading { background: #6c757d; }

    /* Photo Upload */
    .photo-upload { 
      width: 100%; height: 200px; border: 2px dashed #cbd5e0; border-radius: 15px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: #f8fafc; cursor: pointer; position: relative; overflow: hidden;
    }
    .preview-img { width: 100%; height: 100%; object-fit: cover; }
    .placeholder-content { text-align: center; color: var(--primary); }
    .placeholder-content .icon { font-size: 2.5rem; display: block; }
    .change-photo { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; border: none; padding: 5px 12px; border-radius: 8px; }

    .time-info { display: flex; justify-content: space-around; background: #eef2f7; padding: 10px; border-radius: 10px; margin: 1rem 0; font-size: 0.85rem; font-weight: bold; color: var(--primary); }

    .submit-btn { 
      width: 100%; padding: 18px; background: var(--primary); color: white; 
      border: none; border-radius: 15px; font-size: 1.1rem; font-weight: bold; cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 51, 102, 0.3);
    }
    .submit-btn:disabled { background: #cbd5e0; cursor: not-allowed; box-shadow: none; }

    /* Stats Card */
    .stats-card { background: white; padding: 1.2rem; border-radius: 20px; border-top: 4px solid var(--primary); }
    .stat-item { margin-bottom: 1rem; }
    .stat-header { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px; }
    .stat-bar { background: #edf2f7; height: 8px; border-radius: 4px; overflow: hidden; }
    .stat-bar .fill { background: var(--primary); height: 100%; border-radius: 4px; }

    @media (max-width: 600px) {
      .main-layout { padding: 1rem; }
      .header-content h1 { font-size: 1rem; }
    }
  `]
})
export class ReporteIncidenciasComponent implements OnInit {

  // --- CRITERIO PRO: CATÁLOGO EXTENDIDO ---
  catalogo: { [key: string]: string[] } = {
    'SEGURIDAD CIUDADANA': ['ROBO/ASALTO', 'INTENTO DE ROBO', 'SOSPECHOSO EN LA ZONA', 'PELEA CALLEJERA', 'ASESINATO/HOMICIDIO', 'CONSUMO DE DROGAS/ALCOHOL', 'VANDALISMO/GRAFFITI'],
    'INFRAESTRUCTURA': ['BACHE EN PISTA', 'VEREDA ROTA', 'ALUMBRADO APAGADO', 'POSTE INCLINADO', 'SEMAFORO MALOGRADO', 'OBRA ABANDONADA', 'PUENTE DAÑADO'],
    'LIMPIEZA Y SANIDAD': ['BASURA ACUMULADA', 'DESMONTE/ESCOMBROS', 'QUEMA DE BASURA', 'RECOLECCIÓN DEFICIENTE', 'ANIMAL MUERTO EN VÍA', 'PLAGAS (ROEDORES)'],
    'MEDIO AMBIENTE': ['INCENDIO', 'ARBOL CAIDO/RIESGO', 'FALTA DE RIEGO', 'PODA DE ÁRBOL', 'RUIDOS MOLESTOS', 'CONTAMINACIÓN VISUAL'],
    'PROTECCIÓN ANIMAL': ['MALTRATO ANIMAL', 'ANIMAL HERIDO', 'ABANDONO', 'ANIMAL PELIGROSO SUELTO'],
    'TRÁNSITO Y TRANSPORTE': ['VEHÍCULO MAL ESTACIONADO', 'PARADERO INFORMAL', 'EXCESO DE VELOCIDAD', 'CHOQUE/ACCIDENTE']
  };

  categoriasKeys = Object.keys(this.catalogo);
  subcategoriasDisponibles: string[] = [];
  
  nuevoReporte = {
    numero_ticket: '',
    estado: 'pendiente' as const,
    categoria: '',
    subcategoria: '',
    descripcion: '',
    ubicacion_incidencia: '',
    latitud: '',
    longitud: '',
    fecha_incidencia: '',
    hora_incidencia: '',
    foto_adjunta: null as any
  };

  imagePreview: string | null = null;
  cargandoGps = false;
  historicoReal: any[] = [];
  rankingFrecuentes: any[] = [];
  totalHoy = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.resetForm();
    this.obtenerGeolocalizacion(); // Auto-start GPS al abrir la app
  }

  onCategoriaChange() {
    this.subcategoriasDisponibles = this.catalogo[this.nuevoReporte.categoria];
    this.nuevoReporte.subcategoria = ''; 
  }

  obtenerGeolocalizacion() {
    this.cargandoGps = true;
    if (!navigator.geolocation) {
      alert("GPS no soportado");
      this.cargandoGps = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.nuevoReporte.latitud = pos.coords.latitude.toString();
        this.nuevoReporte.longitud = pos.coords.longitude.toString();
        
        // Reverse Geocoding para poner la calle real
        this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.nuevoReporte.latitud}&lon=${this.nuevoReporte.longitud}`)
          .subscribe(data => {
            this.nuevoReporte.ubicacion_incidencia = data.display_name; // ubicacion exacta
            this.cargandoGps = false;
          });
      },
      () => { this.cargandoGps = false; }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoReporte.foto_adjunta = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  enviarIncidencia() {
    // Aquí simulamos el envío exitoso
    const reporteFinal = { ...this.nuevoReporte };
    this.historicoReal.push(reporteFinal);
    this.actualizarRanking();
    
    alert(`✅ Reporte enviado: ${this.nuevoReporte.numero_ticket}\nSe ha notificado a las unidades de ${this.nuevoReporte.categoria}.`);
    this.resetForm();
  }

  actualizarRanking() {
    this.totalHoy = this.historicoReal.length;
    const counts = this.historicoReal.reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
      return acc;
    }, {});
    this.rankingFrecuentes = Object.keys(counts).map(k => ({ nombre: k, cantidad: counts[k] }));
  }

  resetForm() {
    const ahora = new Date();
    this.nuevoReporte = {
      numero_ticket: 'TK-' + Math.floor(100000 + Math.random() * 900000),
      estado: 'pendiente',
      categoria: '',
      subcategoria: '',
      descripcion: '',
      ubicacion_incidencia: this.nuevoReporte.ubicacion_incidencia, // mantenemos ubicación si ya la tiene
      latitud: this.nuevoReporte.latitud,
      longitud: this.nuevoReporte.longitud,
      fecha_incidencia: ahora.toLocaleDateString('en-CA'),
      hora_incidencia: ahora.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      foto_adjunta: null
    };
    this.imagePreview = null;
  }
}