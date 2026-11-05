import { CityModel } from './favorite-city.model';

export interface GeocodingResult extends CityModel {
  id: number;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}
