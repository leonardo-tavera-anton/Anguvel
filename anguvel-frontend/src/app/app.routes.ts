import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TramitesLicenciasComponent } from './pages/tramites-licencias/tramites-licencias.component';
import { GestionTributariaComponent } from './pages/gestion-tributaria/gestion-tributaria.component';
import { SeguridadCiudadanaComponent } from './pages/seguridad-ciudadana/seguridad-ciudadana.component';
import { ReporteIncidenciasComponent } from './pages/reporte-incidencias/reporte-incidencias.component';
import { ConsultasProyectosComponent } from './pages/consultas-proyectos/consultas-proyectos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { MapaSitioComponent } from './pages/mapa-sitio/mapa-sitio.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tramites-licencias', component: TramitesLicenciasComponent },
  { path: 'gestion-tributaria', component: GestionTributariaComponent },
  { path: 'seguridad-ciudadana', component: SeguridadCiudadanaComponent },
  { path: 'reporte-incidencias', component: ReporteIncidenciasComponent },
  { path: 'consultas-proyectos', component: ConsultasProyectosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: 'mapa-sitio', component: MapaSitioComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];