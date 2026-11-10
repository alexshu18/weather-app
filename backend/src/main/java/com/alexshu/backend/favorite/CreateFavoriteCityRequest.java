package com.alexshu.backend.favorite;

public record CreateFavoriteCityRequest(String name, String country, Double latitude, Double longitude) {
}
