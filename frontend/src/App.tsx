import { useState, useEffect } from 'react';
import './App.css';

interface GameWord {
  word: string;
  hint: string;
}

const DICTIONARY: GameWord[] = [
  { word: "ENTERPRISE", hint: "A large-scale business organization or ambitious undertaking." },
  { word: "MOUNTAIN", hint: "A natural elevation of the Earth's surface rising high above the surrounding land." },
  { word: "ADVENTURE", hint: "An exciting experience involving exploration or risk." },
  { word: "DEVELOPER", hint: "A professional who creates and improves products or systems." },
  { word: "HARMONY", hint: "A pleasing arrangement or agreement between different elements." },
  { word: "ELEPHANT", hint: "The largest living land animal, known for its trunk and memory." },
  { word: "HARBOR", hint: "A sheltered place where ships can anchor safely." }
];
const MAX_ATTEMPTS = 6;
const max_attempts = 5;

function App() {
  const [currentLevel, setCurrentLevel] = useState<GameWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomLevel = DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
    setCurrentLevel(randomLevel);
    setGuessedLetters(new Set());
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.has(letter) || isGameOver || isGameWon) return;
    setGuessedLetters(prev => new Set(prev).add(letter));
  };

  const word = currentLevel?.word || "";
  const hint = currentLevel?.hint || "";

  const wrongGuesses = Array.from(guessedLetters).filter(letter => !word.includes(letter)).length;
  
  const isGameWon = word && word.split('').every(letter => letter === ' ' || guessedLetters.has(letter));
  const isGameOver = wrongGuesses >= MAX_ATTEMPTS;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '*') {
        if (isGameOver || isGameWon) return;
        const unguessedLetters = word.split('').filter(char => !guessedLetters.has(char) && char !== ' ');
        if (unguessedLetters.length > 0) {
          const randomUnrevealed = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
          setGuessedLetters(prev => new Set(prev).add(randomUnrevealed));
        }
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        const letter = e.key.toUpperCase();
        if (!guessedLetters.has(letter) && !isGameOver && !isGameWon) {
          setGuessedLetters(prev => new Set(prev).add(letter));
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guessedLetters, word, isGameOver, isGameWon]);

  if (!word) return null;

  return (
    <div className="app-container">
      <div className="game-box">
        {/* Left Side: Hangman Drawing */}
        <div className="hangman-drawing-section">
          <svg className="hangman-svg" viewBox="0 0 300 350">
            {/* Gallows Base */}
            <line x1="20" y1="330" x2="280" y2="330" className="draw-line" />
            <line x1="60" y1="330" x2="60" y2="40" className="draw-line" />
            <line x1="60" y1="40" x2="200" y2="40" className="draw-line" />
            <line x1="60" y1="90" x2="110" y2="40" className="draw-line" />
            <line x1="200" y1="40" x2="200" y2="80" className="draw-line" />

            {/* Hangman Parts */}
            {wrongGuesses >= 1 && <circle cx="200" cy="110" r="30" className="draw-shape" />} {/* Head */}
            {wrongGuesses >= 2 && <line x1="200" y1="140" x2="200" y2="230" className="draw-line" />} {/* Body */}
            {wrongGuesses >= 3 && <line x1="200" y1="160" x2="150" y2="210" className="draw-line" />} {/* Left Arm */}
            {wrongGuesses >= 4 && <line x1="200" y1="160" x2="250" y2="210" className="draw-line" />} {/* Right Arm */}
            {wrongGuesses >= 5 && <line x1="200" y1="230" x2="150" y2="290" className="draw-line" />} {/* Left Leg */}
            {wrongGuesses >= 6 && <line x1="200" y1="230" x2="250" y2="290" className="draw-line" />} {/* Right Leg */}
          </svg>
          <h2 className="game-title">HANGMAN GAME</h2>
        </div>

        {/* Right Side: Game Controls */}
        <div className="game-controls-section">
          <div className="word-display-classic">
            {word.split('').map((letter, index) => {
              if (letter === ' ') {
                 return <div key={index} className="space-box"></div>;
              }
              const isRevealed = guessedLetters.has(letter) || isGameOver;
              const isMissed = isGameOver && !guessedLetters.has(letter);
              return (
                <div key={index} className={`letter-box-classic ${isMissed ? 'missed' : ''}`}>
                  {isRevealed ? letter : ""}
                </div>
              );
            })}
          </div>

          <div className="hint-text-classic">
            <strong>Hint:</strong> {hint}
          </div>

          <div className="guesses-info">
            Incorrect guesses: <span className="incorrect-count">{wrongGuesses} / {MAX_ATTEMPTS}</span>
          </div>

          {isGameWon && <div className="status-classic success">You guessed it!</div>}
          {isGameOver && <div className="status-classic danger">Game Over!</div>}

          <div className="keyboard-classic">
            {alphabet.map(letter => (
              <button
                key={letter}
                className="key-btn-classic"
                onClick={() => guessLetter(letter)}
                disabled={guessedLetters.has(letter) || isGameOver || isGameWon}
              >
                {letter}
              </button>
            ))}
          </div>
          
          {(isGameOver || isGameWon) && (
            <button className="reset-btn-classic" onClick={startNewGame}>
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
