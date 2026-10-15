package com.alexshu.backend.favorite;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class FavoriteCityService {

    private final FavoriteCityRepository repository;

    public FavoriteCityService(FavoriteCityRepository repository) {
        this.repository = repository;
    }


    public List<FavoriteCity> getAllCities() {
        return repository.findAll();
    }

    public FavoriteCity addCity(FavoriteCity favCity) {
        return repository.save(favCity);
    }

    public void deleteCity(Long id) {
        if (!repository.existsById(id)) {
            throw new CityNotFoundException(id);
        }
        repository.deleteById(id);
    }

    public FavoriteCity renameCity(Long id, String newName) {
        FavoriteCity city = repository.findById(id).orElseThrow(() -> new CityNotFoundException(id));
        city.setName(newName);
        return repository.save(city);
    }
}
