package com.alexshu.backend.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with id: " + id + " not found");
    }
}
