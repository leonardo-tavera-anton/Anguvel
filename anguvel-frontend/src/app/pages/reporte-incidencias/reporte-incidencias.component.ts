import { Component, OnInit, inject } from '@angular/core'; // Añadido inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-reporte-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <span class="back-btn">‹</span>
          <h1>Nuevo Reporte</h1>
          <div class="ticket-badge">
            <small>TICKET</small>
            <span>{{ nuevoReporte.numero_ticket }}</span>
          </div>
        </div>
      </header>

      <main class="form-content">
        <form (ngSubmit)="enviarIncidencia()">
          
          <div class="form-card">
            <label>Categoría <span class="req">*</span></label>
            <select [(ngModel)]="nuevoReporte.categoria" name="cat" (change)="onCategoriaChange()" required>
              <option value="" disabled>Seleccione una categoría</option>
              <option *ngFor="let cat of categoriasKeys" [value]="cat">{{ cat }}</option>
            </select>

            <label class="mt-15">Subcategoría <span class="req">*</span></label>
            <select [(ngModel)]="nuevoReporte.subcategoria" name="sub" [disabled]="!nuevoReporte.categoria" required>
              <option value="" disabled>Especifique el problema</option>
              <option *ngFor="let sub of subcategoriasDisponibles" [value]="sub">{{ sub }}</option>
            </select>
          </div>

          <div class="form-card">
            <label>Ubicación Detectada <span class="req">*</span></label>
            <div class="location-wrapper">
              <textarea [(ngModel)]="nuevoReporte.ubicacion_incidencia" name="ubi" 
                        placeholder="Dirección automática por GPS..." readonly required></textarea>
              
              <button type="button" class="btn-gps-large" (click)="obtenerGeolocalizacion()" [class.loading]="cargandoGps">
                <span class="icon">📍</span>
                {{ cargandoGps ? 'Localizando...' : 'Actualizar mi ubicación' }}
              </button>
            </div>
          </div>

          <div class="form-card">
            <label>Descripción del suceso <span class="req">*</span></label>
            <textarea [(ngModel)]="nuevoReporte.descripcion" name="desc" 
                      rows="3" placeholder="Describe brevemente lo ocurrido..." required></textarea>
          </div>

          <div class="form-card">
            <label>Evidencia Visual (Opcional)</label>
            <div class="custom-upload" (click)="fotoInput.click()">
              <input #fotoInput type="file" (change)="onFileSelected($event)" accept="image/*" hidden>
              
              <div *ngIf="!imagePreview" class="upload-ui">
                <span class="cam-icon">📸</span>
                <p>Toca para tomar foto o subir</p>
              </div>

              <img *ngIf="imagePreview" [src]="imagePreview" class="preview-img">
              <div *ngIf="imagePreview" class="change-label">Tap para cambiar foto</div>
            </div>
          </div>

          <div class="action-area">
            <button type="submit" class="btn-submit" [disabled]="!esValido() || cargandoGps">
              REGISTRAR REPORTE
            </button>
          </div>
        </form>
      </main>
    </div>
  `,
  styles: [`
    :host { --primary: #003366; --accent: #28a745; --bg: #f5f7fa; }
    * { box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
    .app-container { background: var(--bg); min-height: 100vh; }
    .app-header { background: var(--primary); color: white; padding: 15px; position: sticky; top: 0; z-index: 100; }
    .header-content { display: flex; justify-content: space-between; align-items: center; max-width: 500px; margin: 0 auto; }
    .back-btn { font-size: 30px; font-weight: 200; cursor: pointer; }
    h1 { font-size: 18px; margin: 0; }
    .ticket-badge { text-align: right; background: rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 8px; }
    .ticket-badge small { display: block; font-size: 9px; opacity: 0.8; letter-spacing: 1px; }
    .ticket-badge span { font-size: 12px; font-weight: bold; color: #ffcc00; }
    .form-content { max-width: 500px; margin: 0 auto; padding: 15px; }
    .form-card { background: white; padding: 20px; border-radius: 16px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    label { display: block; font-size: 13px; font-weight: 700; color: #444; margin-bottom: 8px; }
    .req { color: #e74c3c; }
    .mt-15 { margin-top: 15px; }
    select, textarea {
      width: 100%; padding: 14px; border: 1.5px solid #eee; border-radius: 12px;
      font-size: 16px; background: #fafafa; color: #333; transition: 0.3s;
    }
    select:focus, textarea:focus { border-color: var(--primary); outline: none; background: white; }
    .location-wrapper { display: flex; flex-direction: column; gap: 10px; }
    .btn-gps-large {
      width: 100%; background: var(--accent); color: white; border: none; padding: 15px;
      border-radius: 12px; font-weight: bold; font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .custom-upload {
      width: 100%; height: 180px; background: #f0f4f8; border: 2px dashed #cbd5e0;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; position: relative; overflow: hidden;
    }
    .upload-ui { text-align: center; color: var(--primary); }
    .cam-icon { font-size: 40px; display: block; margin-bottom: 5px; }
    .preview-img { width: 100%; height: 100%; object-fit: cover; }
    .change-label { position: absolute; bottom: 0; width: 100%; background: rgba(0,0,0,0.6); color: white; padding: 5px; font-size: 11px; text-align: center; }
    .btn-submit {
      width: 100%; background: var(--primary); color: white; border: none; padding: 20px;
      border-radius: 16px; font-size: 16px; font-weight: bold; cursor: pointer;
      box-shadow: 0 6px 15px rgba(0,51,102,0.2);
    }
    .btn-submit:disabled { background: #cbd5e0; box-shadow: none; cursor: not-allowed; }
  `]
})
export class ReporteIncidenciasComponent implements OnInit {
  private apiService = inject(ApiService); // Inyectamos tu ApiService actualizado

  catalogo: any = {
    'SEGURIDAD CIUDADANA': ['ROBO', 'INTENTO DE ROBO', 'SOSPECHOSO', 'PELEAS', 'ASESINATO'],
    'INFRAESTRUCTURA': ['ALUMBRADO', 'VEREDAS', 'BACHES', 'SEMAFOROS'],
    'LIMPIEZA': ['BASURA ACUMULADA', 'DESMONTE', 'QUEMA DE BASURA'],
    'MEDIO AMBIENTE': ['INCENDIO', 'ARBOL CAIDO', 'FALTA DE RIEGO'],
    'PROTECCIÓN ANIMAL': ['MALTRATO ANIMAL', 'ANIMAL HERIDO', 'ABANDONO']
  };

  categoriasKeys = Object.keys(this.catalogo);
  subcategoriasDisponibles: string[] = [];
  cargandoGps = false;
  imagePreview: string | null = null;

  nuevoReporte: any = {
    numero_ticket: '',
    estado: 'pendiente',
    categoria: '',
    subcategoria: '',
    descripcion: '',
    ubicacion_incidencia: '',
    latitud: '',
    longitud: '',
    fecha_incidencia: '',
    hora_incidencia: '',
    foto_adjunta: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.generarTicketReal();
  }

  generarTicketReal() {
    const ahora = new Date();
    const isoDate = ahora.getFullYear().toString() +
                    (ahora.getMonth() + 1).toString().padStart(2, '0') +
                    ahora.getDate().toString().padStart(2, '0');
    const isoTime = ahora.getHours().toString().padStart(2, '0') +
                    ahora.getMinutes().toString().padStart(2, '0') +
                    ahora.getSeconds().toString().padStart(2, '0');
    
    this.nuevoReporte.numero_ticket = `TK-${isoDate}-${isoTime}`;
    this.nuevoReporte.fecha_incidencia = ahora.toLocaleDateString('en-CA');
    this.nuevoReporte.hora_incidencia = ahora.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  onCategoriaChange() {
    this.subcategoriasDisponibles = this.catalogo[this.nuevoReporte.categoria];
    this.nuevoReporte.subcategoria = '';
  }

  obtenerGeolocalizacion() {
    this.cargandoGps = true;
    navigator.geolocation.getCurrentPosition((pos) => {
      this.nuevoReporte.latitud = pos.coords.latitude.toString();
      this.nuevoReporte.longitud = pos.coords.longitude.toString();
      
      this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.nuevoReporte.latitud}&lon=${this.nuevoReporte.longitud}`)
        .subscribe(data => {
          this.nuevoReporte.ubicacion_incidencia = data.display_name;
          this.cargandoGps = false;
        }, () => this.cargandoGps = false);
    }, () => this.cargandoGps = false);
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

  esValido(): boolean {
    return !!(this.nuevoReporte.categoria && this.nuevoReporte.subcategoria && this.nuevoReporte.latitud && this.nuevoReporte.descripcion);
  }

  enviarIncidencia() {
    // Usamos el ApiService para enviar la data real al Back
    this.apiService.crearReporte(this.nuevoReporte).subscribe({
      next: (res) => {
        alert("✅ Reporte guardado en base de datos. Ticket: " + this.nuevoReporte.numero_ticket);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al guardar reporte:', err);
        alert("❌ Error: No se pudo conectar con el servidor o el ticket ya existe.");
      }
    });
  }

  resetForm() {
    this.generarTicketReal();
    this.nuevoReporte.categoria = '';
    this.nuevoReporte.subcategoria = '';
    this.nuevoReporte.descripcion = '';
    this.nuevoReporte.ubicacion_incidencia = '';
    this.nuevoReporte.latitud = '';
    this.nuevoReporte.longitud = '';
    this.nuevoReporte.foto_adjunta = null;
    this.imagePreview = null;
  }
}