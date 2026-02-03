import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api'; 
  private http = inject(HttpClient);

  /**
   * 1. REPORTES DE INCIDENCIAS (Tu prioridad actual)
   * Usa FormData para poder enviar la imagen al servidor.
   */
  public crearReporte(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return this.http.post(`${this.baseUrl}/reporte_incidencias`, formData);
  }

  /**
   * 2. SEGURIDAD CIUDADANA
   */
  public getSeguridad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/seguridad_ciudadana`);
  }

  /**
   * 3. TRÁMITES Y LICENCIAS
   */
  public getTramites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tramites_licencias`);
  }

  /**
   * 4. GESTIÓN TRIBUTARIA (PAGOS)
   */
  public getPagos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/gestion_tributaria_pagos`);
  }

  /**
   * 5. CONSULTA DE PROYECTOS
   */
  public getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/consulta_proyectos`);
  }

  /**
   * 6. USUARIOS Y LOGIN
   */
  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  public getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios`);
  }

  public getAll(resource: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${resource}`);
  }
  
  /**
   * MÉTODO GENÉRICO PARA ELIMINAR CUALQUIER RECURSO
   * Ejemplo: this.apiService.deleteGeneric('reporte_incidencias', 5)
   */
  public deleteGeneric(resource: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${resource}/${id}`);
  }
}