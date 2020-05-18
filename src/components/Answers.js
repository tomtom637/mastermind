import React from 'react';
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
      {answers.map((answer, index) => {
        return (
          <div className="row" key={index}>
            {answer.map((singleAnswer, index) => {
              return <div className={singleAnswer} key={index} />;
            })}
          </div>
        );
      })}
      {!won && <div className="row" />}
    </AnswersContainer>
  );
}

export default Answers;
