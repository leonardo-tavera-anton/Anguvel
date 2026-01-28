import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router'; 
import { AuthService } from '../auth/auth.service'; 
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy { 
  appName = 'Municipalidad de Nuevo Chimbote';
  surName = 'Portal Consultas';
  
  // Variable para controlar el menú móvil
  isMenuOpen: boolean = false; 

  navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Trámites y Licencias', path: '/tramites-licencias' },
    { label: 'Gestión Tributaria', path: '/gestion-tributaria' },
    { label: 'Seguridad Ciudadana', path: '/seguridad-ciudadana' },
    { label: 'Reporte de Incidencias', path: '/reporte-incidencias' },
    { label: 'Consultas de Proyectos', path: '/consultas-proyectos' },
  ];

  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { } 

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (status) => {
        this.isAuthenticated = status;
      }
    );
  }

  // Método opcional por si prefieres llamar a una función en el (click)
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.isMenuOpen = false; // Cerramos el menú al cerrar sesión
  }
}