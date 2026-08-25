package com.hangman.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="words")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String wordText;
    private String category;
    private int difficultyLevel;
    private String hint;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getWordText() { return wordText; }
    public void setWordText(String wordText) { this.wordText = wordText; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(int difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }
}
