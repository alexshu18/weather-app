import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeocodingResponse } from '../models/geocoding.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Geocoding {
  private readonly http = inject(HttpClient);

  searchCity(name: string): Observable<GeocodingResponse> {
    return this.http.get<GeocodingResponse>(environment.geocodingApiUrl, {
      params: {
        name,
        count: 5,
      },
    });
  }
}
