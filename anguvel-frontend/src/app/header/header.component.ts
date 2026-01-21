import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  appName = 'Municipalidad de Nuevo Chimbote';
  navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Trámites y Licencias', path: '/tramites-licencias' },
    { label: 'Gestión Tributaria', path: '/gestion-tributaria' },
    { label: 'Seguridad Ciudadana', path: '/seguridad-ciudadana' },
    { label: 'Reporte de Incidencias', path: '/reporte-incidencias' },
    { label: 'Consultas de Proyectos', path: '/consultas-proyectos' },
    { label: 'Usuarios', path: '/usuarios' },
  ];
}
