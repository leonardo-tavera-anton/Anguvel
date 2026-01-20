import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule here
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss'
})
export class DataDisplayComponent implements OnInit {
  private apiService = inject(ApiService);

  resources: string[] = [
    'usuarios',
    'consulta_proyectos',
    'gestion_tributaria_pagos',
    'reporte_incidencias',
    'seguridad_ciudadana',
    'tramites_licencias'
  ];
  selectedResource: string = this.resources[0]; // Default to 'usuarios'
  data: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getAll(this.selectedResource).subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.error = 'Failed to fetch data. Please check the backend API.';
        this.loading = false;
      }
    });
  }
}
