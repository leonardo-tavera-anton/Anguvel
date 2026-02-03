import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api'; 
  private http = inject(HttpClient);

  // Recibe el FormData ya construido desde el componente
  public crearReporte(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporte_incidencias`, formData);
  }

  // Método genérico para cargar tablas en el DataDisplay
  public getAll(resource: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${resource}`);
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  public deleteGeneric(resource: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${resource}/${id}`);
  }
}