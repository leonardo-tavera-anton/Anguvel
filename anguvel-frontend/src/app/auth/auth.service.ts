import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private url_api = 'http://localhost:8000/api';

  // El estado inicial depende de si existe el ID del usuario en el navegador
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialToken());
  isAuthenticated$ = this.loggedIn.asObservable();

  private checkInitialToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('id_usuario');
    }
    return false;
  }

  // MÉTODO NUEVO: Este es el que pedía tu Interceptor
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  login(credentials: { nombre: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.url_api}/login`, credentials).pipe(
      tap((response: any) => {
        // Verificamos respuesta y que estemos en el navegador
        if (response.user && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('id_usuario', response.user.id_usuario.toString());
          localStorage.setItem('nombre', response.user.nombre);
          
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
          }
          
          // Activamos el estado de autenticación
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.loggedIn.next(false);
  }
}