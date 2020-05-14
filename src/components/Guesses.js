import React from 'react';
import uniqid from 'uniqid';
import styled from 'styled-components';

const GuessesContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 500px) {
    width: 75%;
  }
`;

function Guesses({ guesses, started, mm, numGuess }) {
  return (
    <GuessesContainer>
      {guesses.map(guess => {
        return (
          <div className="row" key={uniqid()}>
            {guess.map(singleGuess => {
              return <div className={`box img${singleGuess}`} key={uniqid()} />;
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
                  numGuess[index] ? `box img${numGuess[index]}` : 'box-small'
                }
                key={uniqid()}
              />
            );
          })}
      </div>
    </GuessesContainer>
  );
}

export default Guesses;
