import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start fim">
        <h1>Secret Word</h1>
        <p>Clique para iniciar </p>
        <button onClick={startGame}>Iniciar Jogo</button>
    </div>
  );
};

export default StartScreen;