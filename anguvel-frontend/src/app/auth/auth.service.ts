import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Adjust to your Laravel backend API URL
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  public isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.access_token && response.usuario) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('id_usuario', response.usuario.id_usuario);
            localStorage.setItem('user_name', response.usuario.nombre);
          }
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Call a backend logout endpoint here if it exists and is needed.
      // e.g., this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_usuario');
      localStorage.removeItem('user_name');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}
