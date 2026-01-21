import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h2>Política de Privacidad</h2>
      <p>
        La Municipalidad de Anguvel se compromete a proteger la privacidad de sus usuarios.
        Esta política describe cómo recopilamos, usamos y protegemos su información personal.
      </p>

      <h3>1. Información que Recopilamos</h3>
      <p>
        Podemos recopilar información personal identificable, como su nombre, dirección,
        número de identificación, correo electrónico y número de teléfono, cuando
        usted se registra para utilizar nuestros servicios, realiza un trámite o se
        comunica con nosotros. También podemos recopilar información no personal,
        como datos de uso del sitio web, tipo de navegador e información demográfica.
      </p>

      <h3>2. Uso de la Información</h3>
      <p>
        La información recopilada se utiliza para:
        <ul>
          <li>Procesar sus solicitudes y trámites.</li>
          <li>Mejorar la calidad de nuestros servicios.</li>
          <li>Comunicarnos con usted sobre actualizaciones o información relevante.</li>
          <li>Cumplir con nuestras obligaciones legales.</li>
        </ul>
        <p>
          No compartiremos su información personal con terceros sin su consentimiento,
          excepto cuando sea requerido por ley.
  
      </p>
      <h3>3. Protección de la Información</h3>
      <p>
        Implementamos medidas de seguridad técnicas y organizativas adecuadas para
        proteger su información personal contra el acceso no autorizado, la divulgación,
        la alteración o la destrucción. Sin embargo, ninguna transmisión de datos
        a través de Internet es 100% segura.
      </p>

      <h3>4. Sus Derechos</h3>
      <p>
        Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento
        de sus datos personales. Para ejercer estos derechos, puede contactarnos a
        través de los canales de comunicación indicados en nuestro sitio web.
      </p>

      <h3>5. Cambios en la Política de Privacidad</h3>
      <p>
        Nos reservamos el derecho de modificar esta política de privacidad en cualquier
        momento. Cualquier cambio será publicado en esta página y entrará en vigor
        inmediatamente después de su publicación.
      </p>
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
    h3 {
      color: #0056b3;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-size: 1.3rem;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    ul {
      list-style: disc;
      margin-left: 20px;
      margin-bottom: 1rem;
      color: #555;
    }
    ul li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class PoliticaPrivacidadComponent { }
