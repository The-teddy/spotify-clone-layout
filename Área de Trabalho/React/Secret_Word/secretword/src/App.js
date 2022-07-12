//css
import './App.css';

//hooks
import{useCallback, useEffect, useState} from "react";

//data
import {wordsList} from "./data/words.js";

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [{id:1, name:"start"},{id:2, name:"game"},{id:3, name:"end"}]
const guessQty = 3;


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const[words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const[wrongLetters, setWrongLetters] = useState([]);
  const[guesses, setGuesses] = useState(guessQty);
  const[score, setScore] = useState(0);

  const pickeWordAndCategory = useCallback(()=> {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word, category};
  }, [words]);
  //start the secret word game
  const startGame = useCallback(() =>{
    // limpar as letras
    clearLetterStates();
    const {word, category} = pickeWordAndCategory();
    
    //create array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l)=> l.toLowerCase());
    
    //fil states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  }, [pickeWordAndCategory]);
  //process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    
    //checar se as letras já foram utilizadas
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);
      setGuesses((actualGuesses)=> actualGuesses -1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates();

      setGameStage(stages[2].name)
    }
  }, [guesses]);

  useEffect(() =>{
    const uniqueLetters = [...new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100); 

      // win condition
      startGame();
    }


  }, [guessedLetters, startGame, letters])

  // restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessQty);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
      <Game 
      verifyLetter={verifyLetter} 
      pickedCategory={pickedCategory}
      pickedWord={pickedWord}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
