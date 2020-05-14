import React from 'react';
import uniqid from 'uniqid';
import styled from 'styled-components';

const SecretContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  .row-secret {
    padding-left: 4rem !important;
    padding-right: 4rem !important;
  }
`;

function Secret({ won, mm }) {
  return (
    <SecretContainer>
      {won && (
        <div
          className="row row-secret"
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        >
          {mm.secret.map(val => {
            return <div className={`box img${val}`} key={uniqid()} />;
          })}
        </div>
      )}
    </SecretContainer>
  );
}

export default Secret;
