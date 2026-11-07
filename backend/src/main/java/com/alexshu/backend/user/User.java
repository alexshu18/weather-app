package com.alexshu.backend.user;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_user_seq_gen")
    @SequenceGenerator(sequenceName = "app_user_seq", allocationSize = 50, name = "app_user_seq_gen")
    private Long id;
    private String email;
    private String passwordHash;
    private Instant createdAt;

    protected User() {

    }

    public User(String email, String passwordHash){
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }


    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

}
