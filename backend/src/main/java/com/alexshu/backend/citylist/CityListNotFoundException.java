package com.alexshu.backend.citylist;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CityListNotFoundException extends RuntimeException {
    public CityListNotFoundException(Long id) {
       super("Not found with id: " + id);
    }
}
