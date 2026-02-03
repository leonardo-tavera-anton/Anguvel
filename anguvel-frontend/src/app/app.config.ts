import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // Import withInterceptors
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor'; // Import the interceptor
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // Importante para usar la API Fetch moderna
      withInterceptors([authInterceptor]), // Register the interceptor
    )
  ]
};