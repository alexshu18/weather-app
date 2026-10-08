import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { WeatherModel } from '../../models/weather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-page',
  imports: [],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.scss',
})
export class WeatherPage implements OnInit {
  private readonly weatherService = inject(WeatherService);

  protected readonly weatherData = signal<WeatherModel | undefined>(undefined);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.weatherService
      .getWeather(52.52, 13.41)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.weatherData.set(data);
        },
        error: (err) => {
          this.errorMessage.set('Failed to load weather. Please try again later.');
          console.error(err);
        },
      });
  }
}
