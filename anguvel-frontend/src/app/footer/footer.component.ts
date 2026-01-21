import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  municipalityName = 'Municipalidad de Nuevo Chimbote';
  address = 'Centro Cívico S/N - Nuevo Chimbote Urb. José Carlos Mariátegui';
  horario = 'Lun - Vie: 08:00am - 04:00pm';
  email = 'nchimbote@muni.gob.pe'; // Placeholder mostrados en pagina
}
