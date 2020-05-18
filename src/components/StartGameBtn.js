import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import mastermind from '../utils/mastermind.js';

const Button = styled(motion.button)`
  color: #eee;
  font-size: 20px;
  padding: 15px 0;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  margin-bottom: 3px;
`;

function StartGameBtn(props) {
  const {
    setMm,
    setStarted,
    setNumGuess,
    setGuesses,
    setAnswers,
    setWon,
  } = props;

  const handleClick = () => {
    setMm(new mastermind(['8', '2', '4', '6', '1', '5'], 4));
    setStarted(true);
    setNumGuess([]);
    setGuesses([]);
    setAnswers([]);
    setWon(false);
  };
  return (
    <Button
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 1.1 }}
      onClick={handleClick}
    >
      NEW GAME
    </Button>
  );
}

export default StartGameBtn;
