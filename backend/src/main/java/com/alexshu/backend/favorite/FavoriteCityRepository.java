package com.alexshu.backend.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteCityRepository extends JpaRepository<FavoriteCity, Long> {
    List<FavoriteCity> findAllByUserId(Long userId);
    Optional<FavoriteCity> findByIdAndUserId(Long id, Long userId);
}
