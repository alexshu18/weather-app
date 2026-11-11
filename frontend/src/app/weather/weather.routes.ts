import { Routes } from '@angular/router';
import { WeatherPage } from './weather-page/weather-page';
import { favoritesResolver } from '../resolvers/favorites-resolver';

export const weatherRoutes: Routes = [
  {
    path: '',
    component: WeatherPage,
    resolve: { cities: favoritesResolver },
  },
];
