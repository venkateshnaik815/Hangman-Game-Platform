import { useState, useEffect } from 'react';
import './App.css';

const WORDS = ["ENTERPRISE", "REACT", "TYPESCRIPT", "DEVELOPER", "KUBERNETES", "POSTGRESQL", "DOCKER"];
const MAX_ATTEMPTS = 6;

function App() {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.has(letter) || isGameOver || isGameWon) return;
    setGuessedLetters(prev => new Set(prev).add(letter));
  };

  const wrongGuesses = Array.from(guessedLetters).filter(letter => !word.includes(letter)).length;
  const attemptsLeft = MAX_ATTEMPTS - wrongGuesses;
  
  const isGameWon = word && word.split('').every(letter => guessedLetters.has(letter));
  const isGameOver = attemptsLeft <= 0;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  if (!word) return null;

  return (
    <div className="app-container">
      <div className="hangman-card">
        
        <div className="header">
          <h1>Enterprise Hangman</h1>
          <p>Crack the code before you run out of attempts!</p>
        </div>

        <div className="attempts-left">
          Attempts left: <span>{attemptsLeft}</span>
        </div>

        <div className="word-display">
          {word.split('').map((letter, index) => (
            <div key={index} className="letter-box">
              {guessedLetters.has(letter) || isGameOver ? letter : ""}
            </div>
          ))}
        </div>

        {isGameWon && <div className="status-message won">🎉 Mission Accomplished! You guessed it!</div>}
        {isGameOver && <div className="status-message lost">💀 Game Over! The word was {word}.</div>}

        <div className="keyboard">
          {alphabet.map(letter => (
            <button
              key={letter}
              className="key-btn"
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.has(letter) || isGameOver || isGameWon}
            >
              {letter}
            </button>
          ))}
        </div>

        {(isGameOver || isGameWon) && (
          <button className="reset-btn" onClick={startNewGame}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
