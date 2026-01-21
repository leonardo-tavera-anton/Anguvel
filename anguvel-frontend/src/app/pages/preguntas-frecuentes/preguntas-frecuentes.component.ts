import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Preguntas Frecuentes</h2>
      <div class="faq-item">
        <h3>¿Cómo puedo realizar un trámite en línea?</h3>
        <p>
          Para realizar un trámite en línea, debe dirigirse a la sección "Trámites y Licencias",
          seleccionar el trámite deseado y seguir los pasos indicados.
          Es posible que necesite registrarse o iniciar sesión.
        </p>
      </div>
      <div class="faq-item">
        <h3>¿Dónde puedo consultar el estado de mis pagos?</h3>
        <p>
          Puede consultar el estado de sus pagos tributarios en la sección "Gestión Tributaria y Pagos".
          Ingrese su número de documento y código de contribuyente para acceder a su información.
        </p>
      </div>
      <div class="faq-item">
        <h3>¿Cómo reporto una incidencia en la vía pública?</h3>
        <p>
          Si desea reportar una incidencia (ej. alumbrado público, limpieza, seguridad),
          diríjase a la sección "Reporte de Incidencias" y complete el formulario con los detalles.
          Le solicitamos ser lo más específico posible.
        </p>
      </div>
      <div class="faq-item">
        <h3>¿Cuál es el horario de atención de la Municipalidad?</h3>
        <p>
          Nuestras oficinas están abiertas de Lunes a Viernes de 8:00 AM a 4:00 PM.
          Para atención en línea, nuestro portal está disponible 24/7.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
      text-align: left;
    }
    h2 {
      color: #003366;
      text-align: center;
      margin-bottom: 2rem;
    }
    .faq-item {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    .faq-item:last-child {
      border-bottom: none;
    }
    .faq-item h3 {
      color: #0056b3;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
    .faq-item p {
      color: #555;
      line-height: 1.6;
    }
  `]
})
export class PreguntasFrecuentesComponent { }
