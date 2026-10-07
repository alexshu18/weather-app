import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://api.open-meteo.com/v1/forecast';

  getWeather(latitude: number, longitude: number): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(this.url, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,rain',
        timezone: 'auto',
      },
    });
  }
}
