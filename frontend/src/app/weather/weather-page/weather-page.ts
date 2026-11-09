import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { WeatherModel } from '../../models/weather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { getHttpError } from '../../shared/http-error';
import { FavoriteList } from '../../favorites/favorite-list/favorite-list';
import { CitySearch } from '../../search/city-search/city-search';
import { CityModel } from '../../models/favorite-city.model';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-weather-page',
  imports: [FavoriteList, CitySearch, Header],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.scss',
})
export class WeatherPage implements OnInit {
  private readonly weatherService = inject(WeatherService);

  protected readonly weatherData = signal<WeatherModel | undefined>(undefined);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.loadWeather(56.95, 24.11);
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
  protected onCitySelected(city: CityModel) {
    this.loadWeather(city.latitude, city.longitude);
  }
}
