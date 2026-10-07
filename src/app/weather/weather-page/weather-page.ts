import { Component, inject, signal } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather-page',
  imports: [],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.scss',
})
export class WeatherPage {
  private readonly weatherService = inject(WeatherService);

  protected readonly weatherData = toSignal(this.weatherService.getWeather(52.52, 13.41));
}
