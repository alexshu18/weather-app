import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherModel } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);


  getWeather(latitude: number, longitude: number): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(environment.weatherApiUrl, {
      params: {
        latitude,
        longitude,
        current: 'temperature_2m,rain',
        timezone: 'auto',
      },
    });
  }
}
