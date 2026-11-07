package com.alexshu.backend.citylist;

import com.alexshu.backend.favorite.FavoriteCityResponse;

import java.util.List;

public record CityListResponse(Long id, String name, List<FavoriteCityResponse> cities) {
    public static CityListResponse from(CityList cityList) {
        return new CityListResponse(
                cityList.getId(),
                cityList.getName(),
                cityList.getCities().stream().map(FavoriteCityResponse::from).toList()
        );
    }
}
