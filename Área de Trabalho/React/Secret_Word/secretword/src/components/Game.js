import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter, 
  pickedCategory, 
  pickedWord, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);
    const handleSubmit = (e) => {
      e.preventDefault();
      verifyLetter(letter);
      setLetter("");
      letterInputRef.current.focus();
    }
  return (
    <div className="game">
      <p className="point">Pontuação: <span>{score}</span></p>
      <h1>adivinhe a palavra</h1>
      <h3 className="tipo">
        Dica Sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você tem {guesses} tentativas</p>
      <div className="wordContainer">
         {letters.map((letter, i)=> 
         guessedLetters.includes(letter) 
         ?  (<span key={i} className="letter">{letter}</span>) 
         : (<span key={i} className="blankSquare"></span>)
         )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          name="letter" 
          maxLength={1} 
          required 
          onChange={(e) => setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}
          />
          <button>Play!</button>
        </form>
        <p>Letras Já Utilizadas:</p>
        {wrongLetters.map((letter, i) => (<span key={i}>{letter}, </span>))}
      </div>
    </div>
  )
}

export default Game