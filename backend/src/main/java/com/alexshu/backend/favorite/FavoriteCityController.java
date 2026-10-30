package com.alexshu.backend.favorite;

import org.springframework.http.HttpStatus;
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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public FavoriteCity addCity(@RequestBody FavoriteCity city){
        return favoriteCityService.addCity(city);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable Long id){
        favoriteCityService.deleteCity(id);
    }

    @PatchMapping("/{id}")
    public FavoriteCity renameCity(@PathVariable Long id, @RequestBody RenameCityRequest request){
        return favoriteCityService.renameCity(id, request.name());
    }
}
