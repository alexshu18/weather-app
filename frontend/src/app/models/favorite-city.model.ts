export interface CityModel {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface FavoriteCityModel extends CityModel {
  id: number;
}
