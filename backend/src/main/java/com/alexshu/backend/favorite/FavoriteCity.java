package com.alexshu.backend.favorite;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FavoriteCity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String country;
    private Double latitude;
    private Double longitude;
    private String name;

    protected FavoriteCity() {

    }

    public FavoriteCity(String country, Double latitude, Double longitude, String name) {
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Long getId() {
        return id;
    }

    public String getCountry() {
        return country;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public String getName() {
        return name;
    }
}
