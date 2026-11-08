package com.alexshu.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
       return http
               .csrf(csrf -> csrf.disable())
               .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .cors(Customizer.withDefaults())
               .authorizeHttpRequests(auth -> auth
                       .requestMatchers("/api/auth/register", "/api/auth/login", "/api/favorites/**", "/api/lists/**", "/error").permitAll()
                       .anyRequest().authenticated()
               )
               .formLogin(formLogin -> formLogin.disable())
               .httpBasic(httpBasic -> httpBasic.disable())
               .build();
    }
}
