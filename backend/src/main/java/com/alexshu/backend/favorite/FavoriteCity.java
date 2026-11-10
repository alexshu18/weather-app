package com.alexshu.backend.favorite;

import com.alexshu.backend.user.User;
import jakarta.persistence.*;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public FavoriteCity(String country, Double latitude, Double longitude, String name, User user) {
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.user = user;
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
