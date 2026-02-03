import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url_api = 'http://localhost:8000/api'; // Cambia esto por tu IP real

  // BehaviorSubject que mantiene el estado de autenticación real
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  // Observable que escucha el Guard
  isAuthenticated$ = this.loggedIn.asObservable();

  private checkToken(): boolean {
    // Retorna true si existe el ID del ciudadano en el navegador
    return !!localStorage.getItem('id_usuario');
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url_api}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.user) {
          // Guardamos los datos del modelo Usuario que me pasaste
          localStorage.setItem('id_usuario', response.user.id_usuario.toString());
          localStorage.setItem('user_name', response.user.nombre);
          localStorage.setItem('user_dni', response.user.dni);
          
          // Avisamos a toda la app que ya estamos logueados
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }
}