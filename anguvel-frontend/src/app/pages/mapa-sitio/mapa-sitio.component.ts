import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa-sitio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Mapa del Sitio</h2>
      <p>A continuación, se presenta la estructura de nuestro sitio web para facilitar su navegación.</p>
      <ul class="sitemap-list">
        <li><a routerLink="/">Inicio</a></li>
        <li>
          Trámites y Servicios
          <ul>
            <li><a routerLink="/tramites-licencias">Trámites y Licencias</a></li>
            <li><a routerLink="/gestion-tributaria">Gestión Tributaria y Pagos</a></li>
            <li><a routerLink="/seguridad-ciudadana">Seguridad Ciudadana</a></li>
            <li><a routerLink="/reporte-incidencias">Reporte de Incidencias</a></li>
            <li><a routerLink="/consultas-proyectos">Consultas de Proyectos</a></li>
            <li><a routerLink="/usuarios">Gestión de Usuarios</a></li>
          </ul>
        </li>
        <li>
          Información Institucional
          <ul>
            <li><a routerLink="/preguntas-frecuentes">Preguntas Frecuentes</a></li>
            <li><a routerLink="/politica-privacidad">Política de Privacidad</a></li>
            <!-- Add more institutional links here if needed -->
          </ul>
        </li>
        <li><a href="#">Contacto</a></li> <!-- Placeholder for a future contact page -->
      </ul>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: left;
    }
    h2 {
      color: #003366;
      text-align: center;
      margin-bottom: 2rem;
    }
    .sitemap-list {
      list-style: none;
      padding-left: 0;
    }
    .sitemap-list li {
      margin-bottom: 0.75rem;
      font-size: 1.1rem;
    }
    .sitemap-list li a {
      color: #0056b3;
      text-decoration: none;
    }
    .sitemap-list li a:hover {
      text-decoration: underline;
    }
    .sitemap-list ul {
      list-style: disc;
      padding-left: 20px;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .sitemap-list ul li {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
  `]
})
export class MapaSitioComponent { }
