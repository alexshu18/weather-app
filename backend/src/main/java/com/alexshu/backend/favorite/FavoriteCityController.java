package com.alexshu.backend.favorite;

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
    public List<FavoriteCity> getAll(){
        return favoriteCityService.getAllCities();
    }

    @PostMapping
    public FavoriteCity addCity(@RequestBody FavoriteCity city){
        return favoriteCityService.addCity(city);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable Long id){
        favoriteCityService.deleteCity(id);
    }
}
