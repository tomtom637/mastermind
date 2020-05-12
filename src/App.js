import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animateScroll } from 'react-scroll';
import './App.css';
import StartGameBtn from './components/StartGameBtn.js';
import uniqid from 'uniqid';

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    rgba(30, 87, 153, 1) 0%,
    rgba(41, 137, 216, 1) 50%,
    rgba(32, 124, 202, 1) 51%,
    rgba(125, 185, 232, 1) 100%
  );
  width: 100%;
  height: 100%;
  border-radius: 5px;
  max-width: 650px;
  margin: 0 auto;
  .secret {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
  }
  .congratulations {
    margin: auto;
    text-align: center;
    h1 {
      width: 100%;
      outline: 10px solid rgba(255, 255, 255, 0.5);
      outline-offset: 20px;
      font-size: 25px;
    }
    p {
      width: 100%;
      margin-top: 50px;
    }
  }
  .game-body {
    display: flex;
    width: 100%;
    overflow-y: scroll;
    flex-grow: 1;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .guesses {
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .answers {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 500px) {
    .guesses {
      width: 75%;
    }
    .answers {
      width: 25%;
    }
  }
  .row {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    height: 45px;
    min-height: 45px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    align-items: center;
  }
  @media (min-width: 500px) {
    .row {
      margin-top: 35px;
      margin-bottom: 35px;
    }
  }
  .box {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-size: cover;
    transform: scale(3);
  }
  @media (min-width: 500px) {
    .box {
      width: 20px;
      height: 20px;
    }
  }
  .box-small {
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .box-small--white {
    background: #ddd;
  }
  .box-small--black {
    background: #111;
  }
  .secret-input {
    background: rgba(0, 0, 0, 0.2);
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
        duration: 50,
      });
    }
  }, [started, guesses]);

  return (
    <Wrapper className="App">
      <GameWrapper className="game">
        <StartGameBtn
          setMm={setMm}
          setStarted={setStarted}
          setNumGuess={setNumGuess}
          setGuesses={setGuesses}
          setAnswers={setAnswers}
          setWon={setWon}
        />
        <div className="secret">
          {won && (
            <div className="row" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
              {mm.secret.map(val => {
                return <div className={`box img${val}`} key={uniqid()} />;
              })}
            </div>
          )}
        </div>
        <div className="game-body" id="game-body">
          {!won ? (
            <>
              <div className="guesses">
                {guesses.map(guess => {
                  return (
                    <div className="row" key={uniqid()}>
                      {guess.map(singleGuess => {
                        return (
                          <div
                            className={`box img${singleGuess}`}
                            key={uniqid()}
                          />
                        );
                      })}
                    </div>
                  );
                })}
                <div className="row">
                  {started &&
                    mm.secret.map((guess, index) => {
                      return (
                        <div
                          className={
                            numGuess[index]
                              ? `box img${numGuess[index]}`
                              : 'box-small'
                          }
                          key={uniqid()}
                        />
                      );
                    })}
                </div>
              </div>
              <div className="answers">
                {answers.map(answer => {
                  return (
                    <div className="row" key={uniqid()}>
                      {answer.map(singleAnswer => {
                        return <div className={singleAnswer} key={uniqid()} />;
                      })}
                    </div>
                  );
                })}
                {!won && <div className="row" />}
              </div>
            </>
          ) : (
            <div className="congratulations">
              <h1>CONGRATULATIONS</h1>
              <p>You've won in {mm.count} guesses</p>
            </div>
          )}
        </div>
        <div className="secret-input">
          <div className="row">
            {started &&
              mm.colors.map(val => {
                return (
                  <div
                    className={`box img${val}`}
                    key={uniqid()}
                    onClick={() => {
                      setNumGuess(prev => {
                        return [...prev, val];
                      });
                    }}
                  />
                );
              })}
          </div>
        </div>
      </GameWrapper>
    </Wrapper>
  );
}

export default App;
