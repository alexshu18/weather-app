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
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then((m) => m.Register),
  },
  {
    path: '**',
    redirectTo: 'weather',
  },
];
