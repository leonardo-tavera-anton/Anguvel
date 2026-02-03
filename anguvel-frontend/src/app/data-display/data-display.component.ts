import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
  private apiService = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  resources: string[] = [
    'usuarios',
    'consulta_proyectos',
    'gestion_tributaria_pagos',
    'reporte_incidencias',
    'seguridad_ciudadana',
    'tramites_licencias'
  ];
  
  selectedResource: string = this.resources[0];
  data: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.loading = true;
    this.error = null;
    this.data = []; 

    // Llamada al servicio con el método getAll definido previamente
    this.apiService.getAll(this.selectedResource).subscribe({
      next: (response: any) => {
        // Validación de datos para respuestas de Laravel
        if (Array.isArray(response)) {
          this.data = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.data = response.data;
        } else {
          this.data = [];
        }
        
        this.loading = false;
        console.log('Datos cargados para:', this.selectedResource, this.data);
      },
      error: (err: any) => { // <--- CORREGIDO: Se añadió ': any' para evitar el error TS7006
        console.error('Error fetching data:', err);
        this.error = `Error: No se pudo conectar con el recurso "${this.selectedResource}".`;
        this.loading = false;
      }
    });
  }
}