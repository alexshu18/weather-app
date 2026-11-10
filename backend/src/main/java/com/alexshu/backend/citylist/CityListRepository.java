package com.alexshu.backend.citylist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityListRepository extends JpaRepository<CityList, Long> {
    List<CityList> findAllByUserId(Long userId);
    Optional<CityList> findByIdAndUserId(Long id, Long userId);
}
