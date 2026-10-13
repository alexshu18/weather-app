export interface WeatherCurrent {
  temperature_2m: number;
  rain: number;
}

export interface WeatherModel {
  current: WeatherCurrent;
}
