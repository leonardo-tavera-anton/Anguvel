import { Routes } from '@angular/router';
import { DataDisplayComponent } from './data-display/data-display.component';

export const routes: Routes = [
    { path: '', component: DataDisplayComponent }, // Al entrar a / se verá el componente
    { path: 'data', component: DataDisplayComponent }
];