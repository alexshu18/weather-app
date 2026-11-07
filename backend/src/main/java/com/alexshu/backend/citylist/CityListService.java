package com.alexshu.backend.citylist;

import com.alexshu.backend.favorite.CityNotFoundException;
import com.alexshu.backend.favorite.FavoriteCity;
import com.alexshu.backend.favorite.FavoriteCityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return cityListRepository.save(cityList);
    }

    public List<CityList> getAllLists() {
        return cityListRepository.findAll();
    }

    @Transactional
    public void deleteList(Long id) {
        if (!cityListRepository.existsById(id)) {
            throw new CityListNotFoundException(id);
        }
        cityListRepository.deleteById(id);
    }

    @Transactional
    public CityList addCityToList(Long listId, Long cityId) {
        CityList cityList = findListOrThrow(listId);
        FavoriteCity favoriteCity = findCityOrThrow(cityId);
        cityList.addCity(favoriteCity);
        return cityList;
    }

    @Transactional
    public CityList removeCityFromList(Long listId, Long cityId) {
        CityList cityList = findListOrThrow(listId);
        FavoriteCity favoriteCity = findCityOrThrow(cityId);
        cityList.removeCity(favoriteCity);
        return cityList;
    }

    @Transactional
    public CityList renameList(Long id, String newName) {
        CityList cityList = findListOrThrow(id);
        cityList.setName(newName);
        return cityList;
    }

    private CityList findListOrThrow(Long id) {
        return cityListRepository.findById(id)
                .orElseThrow(() -> new CityListNotFoundException(id));
    }

    private FavoriteCity findCityOrThrow(Long id) {
        return favoriteCityRepository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id));
    }
}
