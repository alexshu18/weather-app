import { Component, DestroyRef, inject, signal, OnInit, computed } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { WeatherModel } from '../../models/weather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { getHttpError } from '../../shared/http-error';
import { FavoriteList } from '../../favorites/favorite-list/favorite-list';
import { CitySearch } from '../../search/city-search/city-search';
import { CityModel } from '../../models/favorite-city.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FavoriteCity } from '../../services/favorite-city';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

const DEFAULT_CITY: CityModel = {
  name: 'Riga',
  latitude: 56.95,
  longitude: 24.11,
  country: 'Latvia',
};
@Component({
  selector: 'app-weather-page',
  imports: [CitySearch, MatCardModule, MatProgressSpinner, MatButtonModule],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.scss',
})
export class WeatherPage implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly weatherData = signal<WeatherModel | undefined>(undefined);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly selectedCity = signal<CityModel | null>(null);
  private readonly destroyRef = inject(DestroyRef);
  private readonly favoriteCityService = inject(FavoriteCity);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const name = params.get('name');
      const lat = params.get('lat');
      const lon = params.get('lon');
      if (!name || !lat || !lon) {
        this.showCity(DEFAULT_CITY);
        return;
      }
      this.showCity({
        name,
        country: params.get('country') ?? '',
        latitude: Number(lat),
        longitude: Number(lon),
      });
    });
  }

  addToFavorites() {
    const city = this.selectedCity();
    if (!city) return;
    this.favoriteCityService
      .addCity(city)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (err: HttpErrorResponse) => this.errorMessage.set(getHttpError(err.status)),
      });
  }

  private loadWeather(latitude: number, longitude: number) {
    this.weatherData.set(undefined);
    this.errorMessage.set(null);
    this.weatherService
      .getWeather(latitude, longitude)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.weatherData.set(data);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(getHttpError(err.status));
          console.error(err);
        },
      });
  }

  private showCity(city: CityModel) {
    this.selectedCity.set(city);
    this.loadWeather(city.latitude, city.longitude);
  }

  protected onCitySelected(city: CityModel) {
    this.router.navigate([], {
      queryParams: {
        name: city.name,
        country: city.country,
        lat: city.latitude,
        lon: city.longitude,
      },
    });
  }

  protected readonly isFavorite = computed(() => {
    const city = this.selectedCity();
    return (
      !!city &&
      this.favoriteCityService
        .cities()
        .some(
          (f) =>
            Math.abs(f.latitude - city.latitude) < 0.01 &&
            Math.abs(f.longitude - city.longitude) < 0.01,
        )
    );
  });
}
