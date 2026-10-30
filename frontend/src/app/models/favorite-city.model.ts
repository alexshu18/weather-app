export interface NewFavoriteCityModel {
  country: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface FavoriteCityModel extends NewFavoriteCityModel {
  id: number;
}
