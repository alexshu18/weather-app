import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weather.model';
import { environment } from '../../environments/environment';
import { FavoriteCityModel, NewFavoriteCityModel } from '../models/favorite-city.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCity {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.backendApiUrl}/favorites`;

  getAllCities(): Observable<FavoriteCityModel[]> {
    return this.http.get<FavoriteCityModel[]>(this.apiUrl);
  }

  addCity(city: NewFavoriteCityModel): Observable<FavoriteCityModel> {
    return this.http.post<FavoriteCityModel>(this.apiUrl, city);
  }

  renameCity(id: number, newName: string): Observable<FavoriteCityModel> {
    return this.http.patch<FavoriteCityModel>(`${this.apiUrl}/${id}`, {name: newName});
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
