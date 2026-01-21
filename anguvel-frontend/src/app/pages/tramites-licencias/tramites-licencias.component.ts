import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tramites-licencias',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Trámites y Licencias</h2>
      <p>Aquí encontrará información y formularios para realizar trámites y solicitar licencias.</p>
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
export class TramitesLicenciasComponent { }
