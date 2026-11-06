package com.alexshu.backend.citylist;

import com.alexshu.backend.favorite.FavoriteCityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityListService {
    private final FavoriteCityRepository favoriteCityRepository;
    private final CityListRepository cityListRepository;

    public CityListService(FavoriteCityRepository favoriteCityRepository, CityListRepository cityListRepository) {
        this.favoriteCityRepository = favoriteCityRepository;
        this.cityListRepository = cityListRepository;
    }

    public CityList createList(String name) {
        CityList cityList = new CityList(name);
        return this.cityListRepository.save(cityList);
    }

    public List<CityList> getAllLists() {
        return this.cityListRepository.findAll();
    }

    public void deleteList(Long id) {
        if (!cityListRepository.existsById(id)){
            throw new CityListNotFoundException(id);
        }
        cityListRepository.deleteById(id);
    }
}
