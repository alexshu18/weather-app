import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { favoritesResolver } from './resolvers/favorites-resolver';

export const routes: Routes = [
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.routes').then((m) => m.weatherRoutes),
    canActivate: [authGuard],
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
    path: 'favorites',
    canActivate: [authGuard],
    resolve: { cities: favoritesResolver },
    loadComponent: () =>
      import('./favorites/favorite-list/favorite-list').then((m) => m.FavoriteList),
  },
  {
    path: '**',
    redirectTo: 'weather',
  },
];
