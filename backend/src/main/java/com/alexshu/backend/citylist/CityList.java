package com.alexshu.backend.citylist;

import com.alexshu.backend.favorite.FavoriteCity;
import jakarta.persistence.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
public class CityList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;


    @ManyToMany
    @JoinTable(
            name = "city_list_favorite_city",
            joinColumns = @JoinColumn(name = "city_list_id"),
            inverseJoinColumns = @JoinColumn(name = "favorite_city_id")
    )
    private Set<FavoriteCity> cities = new HashSet<>();

    protected CityList() {

    }

    public CityList(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<FavoriteCity> getCities() {
        return Collections.unmodifiableSet(cities);
    }

    public void addCity(FavoriteCity city) {
        cities.add(city);
    }

    public void removeCity(FavoriteCity city) {
        cities.remove(city);
    }
}
