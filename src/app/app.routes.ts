import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.routes').then((m) => m.weatherRoutes),
  },
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
];
