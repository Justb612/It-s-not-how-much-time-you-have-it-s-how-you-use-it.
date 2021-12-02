import "./App.css";
import ReactGA from "react-ga";
import { useState, useEffect } from "react";
import ekkoImg from "./img/EkkoSquare.png";
import luxImg from "./img/LuxSquare.png";
import luluImg from "./img/LuluSquare.png";
import viImg from "./img/ViSquare.png";
import teemoImg from "./img/TeemoSquare.png";
import bardImg from "./img/BardSquare.png";
import nelfImg from "./img/NightElfCrest.jpg";
import SingleCard from "./Components/SingleCard";

const cardImages = [
  { src: ekkoImg, matched: false },
  { src: bardImg, matched: false },
  { src: luluImg, matched: false },
  { src: luxImg, matched: false },
  { src: teemoImg, matched: false },
  { src: viImg, matched: false },
];

function App() {
  useEffect(() => {
    ReactGA.initialize("UA-214143913-1");
    ReactGA.pageview("/");
  }, []);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>League Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            nelfImg={nelfImg}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
