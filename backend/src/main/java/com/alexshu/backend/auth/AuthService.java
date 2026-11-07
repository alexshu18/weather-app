package com.alexshu.backend.auth;

import com.alexshu.backend.user.User;
import com.alexshu.backend.user.UserRepository;
import com.alexshu.backend.user.UserResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request){
        String normalizedEmail = request.email().trim().toLowerCase(Locale.ROOT);
        if(userRepository.existsByEmail(normalizedEmail)){
            throw new EmailAlreadyExistsException(normalizedEmail);
        }
        String passwordHash = passwordEncoder.encode(request.password());
        User user = new User(normalizedEmail, passwordHash);
        try {
            return UserResponse.from(userRepository.saveAndFlush(user));
        } catch (DataIntegrityViolationException e) {
            throw new EmailAlreadyExistsException(normalizedEmail);
        }
    }
}
