package com.hangman.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="game_sessions")
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long wordId;
    private int attemptsLeft;
    private String guessedLetters;
    private boolean isWon;
    private LocalDateTime createdAt;
}
