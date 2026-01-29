import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Bienvenido al portal consultas</h2>
      <p>Este es el portal oficial de la Municipalidad, donde podrá realizar diversos trámites y consultas en línea.</p>
      <p>Explore nuestras secciones para encontrar la información que necesita.</p>
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
export class HomeComponent { }
