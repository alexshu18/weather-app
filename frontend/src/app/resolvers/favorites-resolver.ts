import { ResolveFn } from '@angular/router';
import { FavoriteCityModel } from '../models/favorite-city.model';
import { catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { FavoriteCity } from '../services/favorite-city';

export const favoritesResolver: ResolveFn<FavoriteCityModel[]> = () =>
  inject(FavoriteCity)
    .getAllCities()
    .pipe(catchError(() => of([])));
