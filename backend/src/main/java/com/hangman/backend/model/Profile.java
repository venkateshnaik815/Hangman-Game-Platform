package com.hangman.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="profiles")
public class Profile {
    @Id
    private Long userId;
    private int totalScore;
    private int gamesPlayed;
}

