package com.alexshu.backend.favorite;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteCityController {

    private final FavoriteCityService favoriteCityService;

    public FavoriteCityController(FavoriteCityService favoriteCityService) {
        this.favoriteCityService = favoriteCityService;
    }

    @GetMapping
    public List<FavoriteCityResponse> getAll(@AuthenticationPrincipal Long userId) {
        return favoriteCityService.getAllCities(userId).stream()
                .map(FavoriteCityResponse::from)
                .toList();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public FavoriteCityResponse addCity(@AuthenticationPrincipal Long userId,
                                        @RequestBody CreateFavoriteCityRequest request) {
        return FavoriteCityResponse.from(favoriteCityService.addCity(userId, request));
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCity(@AuthenticationPrincipal Long userId, @PathVariable Long id) {
        favoriteCityService.deleteCity(userId, id);
    }

    @PatchMapping("/{id}")
    public FavoriteCityResponse renameCity(@AuthenticationPrincipal Long userId,
                                           @PathVariable Long id,
                                           @RequestBody RenameCityRequest request) {
        return FavoriteCityResponse.from(favoriteCityService.renameCity(userId, id, request.name()));
    }
}