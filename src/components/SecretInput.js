import React from 'react';

function SecretInput({ started, mm, setNumGuess }) {
  return (
    <>
      <div className="row">
        {started &&
          mm.colors.map((val, index) => {
            return (
              <div
                className={`box img${val}`}
                key={index}
                onClick={() => {
                  setNumGuess(prev => {
                    return [...prev, val];
                  });
                }}
              />
            );
          })}
      </div>
    </>
  );
}

export default SecretInput;
