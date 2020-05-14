import React from 'react';
import uniqid from 'uniqid';
import styled from 'styled-components';

function SecretInput({ started, mm, setNumGuess }) {
  return (
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
  );
}

export default SecretInput;
