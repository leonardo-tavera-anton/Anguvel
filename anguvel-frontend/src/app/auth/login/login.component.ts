import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    nombre: '',
    contrasena: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.errorMessage = null; // Reset error message on new login attempt
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // Navigation on success is now handled by the AuthService,
        // but we can also navigate from here if we want a specific redirection.
        this.router.navigate(['/reporte-incidencias']);
      },
      error: (err) => {
        // Handle login errors (e.g., wrong credentials)
        this.errorMessage = err.error?.message || 'Error al iniciar sesión. Por favor, intente de nuevo.';
        console.error('Login failed', err);
      }
    });
  }
}
