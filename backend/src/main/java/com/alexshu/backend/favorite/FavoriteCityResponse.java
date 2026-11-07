package com.alexshu.backend.favorite;

public record FavoriteCityResponse(Long id, String name, String country, Double latitude, Double longitude) {
    public static FavoriteCityResponse from(FavoriteCity city) {
        return new FavoriteCityResponse(
                city.getId(),
                city.getName(),
                city.getCountry(),
                city.getLatitude(),
                city.getLongitude()
        );
    }
}
