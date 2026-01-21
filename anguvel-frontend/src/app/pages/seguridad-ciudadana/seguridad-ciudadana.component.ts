import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seguridad-ciudadana',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Seguridad Ciudadana</h2>
      <p>Conozca nuestras iniciativas para mantener la seguridad en la comunidad.</p>
      <p>Contenido relacionado con el backend se mostrará aquí.</p>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      text-align: center;
    }
    h2 {
      color: #003366;
      margin-bottom: 1rem;
    }
    p {
      color: #333;
      line-height: 1.6;
    }
  `]
})
export class SeguridadCiudadanaComponent { }
