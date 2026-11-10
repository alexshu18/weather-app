import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CityModel, FavoriteCityModel } from '../models/favorite-city.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCity {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.backendApiUrl}/favorites`;

  private readonly citiesState = signal<FavoriteCityModel[]>([]);
  readonly cities = this.citiesState.asReadonly();

  getAllCities(): Observable<FavoriteCityModel[]> {
    return this.http
      .get<FavoriteCityModel[]>(this.apiUrl)
      .pipe(tap((cities) => this.citiesState.set(cities)));
  }

  addCity(city: CityModel): Observable<FavoriteCityModel> {
    const body = {
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    };
    return this.http
      .post<FavoriteCityModel>(this.apiUrl, body)
      .pipe(tap((created) => this.citiesState.update((cities) => [...cities, created])));
  }

  renameCity(id: number, newName: string): Observable<FavoriteCityModel> {
    return this.http
      .patch<FavoriteCityModel>(`${this.apiUrl}/${id}`, { name: newName })
      .pipe(
        tap((updated) =>
          this.citiesState.update((cities) => cities.map((c) => (c.id === id ? updated : c))),
        ),
      );
  }

  deleteCity(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.citiesState.update((cities) => cities.filter((c) => c.id !== id))));
  }
}
