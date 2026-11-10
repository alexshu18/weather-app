package com.alexshu.backend.citylist;

import com.alexshu.backend.favorite.CityNotFoundException;
import com.alexshu.backend.favorite.FavoriteCity;
import com.alexshu.backend.favorite.FavoriteCityRepository;
import com.alexshu.backend.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CityListService {
    private final FavoriteCityRepository favoriteCityRepository;
    private final CityListRepository cityListRepository;
    private final UserRepository userRepository;

    public CityListService(FavoriteCityRepository favoriteCityRepository, CityListRepository cityListRepository, UserRepository userRepository) {
        this.favoriteCityRepository = favoriteCityRepository;
        this.cityListRepository = cityListRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CityListResponse createList(Long userId, String name) {
        CityList cityList = new CityList(name, userRepository.getReferenceById(userId));
        return CityListResponse.from(cityListRepository.save(cityList));
    }

    @Transactional(readOnly = true)
    public List<CityListResponse> getAllLists(Long userId) {
        return cityListRepository.findAllByUserId(userId).stream().map(CityListResponse::from).toList();
    }

    @Transactional
    public void deleteList(Long userId, Long id) {
        cityListRepository.delete(findListOrThrow(userId, id));
    }

    @Transactional
    public CityListResponse addCityToList(Long userId, Long listId, Long cityId) {
        CityList cityList = findListOrThrow(userId, listId);
        FavoriteCity favoriteCity = findCityOrThrow(userId, cityId);
        cityList.addCity(favoriteCity);
        return CityListResponse.from(cityList);
    }

    @Transactional
    public CityListResponse removeCityFromList(Long userId, Long listId, Long cityId) {
        CityList cityList = findListOrThrow(userId, listId);
        FavoriteCity favoriteCity = findCityOrThrow(userId, cityId);
        cityList.removeCity(favoriteCity);
        return CityListResponse.from(cityList);
    }

    @Transactional
    public CityListResponse renameList(Long userId, Long id, String newName) {
        CityList cityList = findListOrThrow(userId, id);
        cityList.setName(newName);
        return CityListResponse.from(cityList);
    }

    private CityList findListOrThrow(Long userId, Long id) {
        return cityListRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new CityListNotFoundException(id));
    }

    private FavoriteCity findCityOrThrow(Long userId, Long id) {
        return favoriteCityRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new CityNotFoundException(id));
    }
}
