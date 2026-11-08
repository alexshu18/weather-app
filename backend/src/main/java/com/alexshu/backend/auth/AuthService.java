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
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request){
        String normalizedEmail = normalizeEmail(request.email());
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

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request){
        String normalizedEmail = normalizeEmail(request.email());
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(InvalidCredentialsException::new);
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())){
            throw new InvalidCredentialsException();
        }
        String token = jwtService.generateToken(user);
        return new LoginResponse(token);
    }

    private String normalizeEmail(String email){
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
