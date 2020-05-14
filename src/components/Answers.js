import React from 'react';
import uniqid from 'uniqid';
import styled from 'styled-components';

const AnswersContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 500px) {
    .answers {
      width: 25%;
    }
  }
`;

function Answers({ answers, won }) {
  return (
    <AnswersContainer>
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
    </AnswersContainer>
  );
}

export default Answers;
