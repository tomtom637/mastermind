import React, { useState, useEffect } from 'react';
import GlobalStyle from './components/GlobalStyle';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import StartGameBtn from './components/StartGameBtn';
import Secret from './components/Secret';
import Guesses from './components/Guesses';
import Answers from './components/Answers';
import SecretInput from './components/SecretInput';
import { motion } from 'framer-motion';

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  max-width: 500px;
  margin: 0 auto;
  .congratulations {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 5px;
    margin: auto;
    text-align: center;
    h1 {
      font-size: 20px;
    }
    p {
      width: 100%;
      margin-top: 20px;
    }
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  @media (min-width: 500px) {
    padding: 5% 0;
  }
`;

function App() {
  const [started, setStarted] = useState(false);
  const [mm, setMm] = useState(null);
  const [numGuess, setNumGuess] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [won, setWon] = useState(false);

  // gives a score after a line is completed
  useEffect(() => {
    if (started && numGuess.length === mm.secret.length) {
      let checkGuess = [...numGuess];
      let [black, white] = mm.play(checkGuess);
      if (black === mm.secret.length) {
        setWon(true);
      }
      let answerView = [];
      for (let i = 0; i < black; i++) {
        answerView.push('box-small box-small--black');
      }
      for (let i = 0; i < white; i++) {
        answerView.push('box-small box-small--white');
      }
      for (let i = 0; i < mm.secret.length - black - white; i++) {
        answerView.push('box-small');
      }
      setAnswers([...answers, [...answerView]]);
    }
  }, [answers, numGuess, mm, started]);

  // re-initializes the current guesses after a line is completed
  useEffect(() => {
    if (started && numGuess.length === mm.secret.length) {
      setGuesses(prev => {
        return [...prev, [...numGuess]];
      });
      setNumGuess([]);
    }
  }, [numGuess, started, guesses, mm]);

  // scroll to bottom
  useEffect(() => {
    if (started) {
      animateScroll.scrollToBottom({
        containerId: `game-body`,
        duration: 80,
      });
    }
  }, [started, guesses]);

  return (
    <Wrapper className="App">
      <GlobalStyle />
      <GameWrapper className="game background">
        <StartGameBtn
          setMm={setMm}
          setStarted={setStarted}
          setNumGuess={setNumGuess}
          setGuesses={setGuesses}
          setAnswers={setAnswers}
          setWon={setWon}
        />
        <Secret won={won} mm={mm} />
        <div className="game-body" id="game-body">
          {!won ? (
            <>
              <Guesses
                guesses={guesses}
                started={started}
                mm={mm}
                numGuess={numGuess}
              />
              <Answers answers={answers} won={won} />
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.2 }}
              animate={{ scale: 1.1 }}
              className="congratulations"
            >
              <h1>CONGRATULATIONS</h1>
              <p>You've won in {mm.count} guesses</p>
            </motion.div>
          )}
        </div>
        <SecretInput started={started} mm={mm} setNumGuess={setNumGuess} />
      </GameWrapper>
    </Wrapper>
  );
}

export default App;
