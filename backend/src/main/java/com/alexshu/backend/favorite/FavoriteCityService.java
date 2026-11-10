package com.alexshu.backend.favorite;

import com.alexshu.backend.user.User;
import com.alexshu.backend.user.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteCityService {

    private final FavoriteCityRepository repository;
    private final UserRepository userRepository;

    public FavoriteCityService(FavoriteCityRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<FavoriteCity> getAllCities(Long userId) {
        return repository.findAllByUserId(userId);
    }

    @Transactional
    public FavoriteCity addCity(Long userId, CreateFavoriteCityRequest request) {
        User user = userRepository.getReferenceById(userId);
        FavoriteCity city = new FavoriteCity(
                request.country(), request.latitude(), request.longitude(), request.name(), user);
        return repository.save(city);
    }

    @Transactional
    public void deleteCity(Long userId, Long id) {
        repository.delete(findCityOrThrow(userId, id));
    }

    @Transactional
    public FavoriteCity renameCity(Long userId, Long id, String newName) {
        FavoriteCity city = findCityOrThrow(userId, id);
        city.setName(newName);
        return city;
    }

    private FavoriteCity findCityOrThrow(Long userId, Long id) {
        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new CityNotFoundException(id));
    }
}