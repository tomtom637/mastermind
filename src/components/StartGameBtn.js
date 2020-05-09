import React from 'react';
import styled from 'styled-components';
import mastermind from '../utils/mastermind.js';

const Button = styled.button`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  padding: 15px 0;
  background: rgba(0, 0, 0, 0.5);
  color: #eee;
  border: none;
`;

function StartGameBtn(props) {
  const {
    setMm,
    setStarted,
    setNumGuess,
    setGuesses,
    setCurrentGuess,
    setGuessView,
    setAnswers,
    setWon,
  } = props;

  const handleClick = () => {
    setMm(new mastermind(['8', '2', '4', '7'], 3));
    setStarted(true);
    setNumGuess([]);
    setGuesses([]);
    setCurrentGuess([]);
    setGuessView([]);
    setAnswers([]);
    setWon(false);
  };
  return <Button onClick={handleClick}>NEW GAME</Button>;
}

export default StartGameBtn;
