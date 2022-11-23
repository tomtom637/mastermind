import React from 'react';
import styled from 'styled-components';

const GuessesContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  @media (min-width: 500px) {
    width: 75%;
  }
`;

function Guesses({ guesses, started, mm, numGuess }) {
  return (
    <GuessesContainer>
      {guesses.map((guess, index) => {
        return (
          <div className="row" key={index}>
            {guess.map((singleGuess, singleIndex) => {
              return (
                <div className={`box img${singleGuess}`} key={singleIndex} />
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
                  numGuess[index] ? `box img${numGuess[index]}` : 'box-small'
                }
                key={index}
              />
            );
          })}
      </div>
    </GuessesContainer>
  );
}

export default Guesses;
