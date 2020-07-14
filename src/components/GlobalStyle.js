import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #282c34;
  color: #eee;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.game-body {
    margin: 5px 0;
    display: flex;
    width: 100%;
    overflow-y: scroll;
    flex-grow: 1;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .row {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100%;
    height: 35px;
    min-height: 35px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    align-items: center;
  }
  @media (min-width: 500px) {
    .row {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  .box {
    width: 15px;
    height: 15px;
    max-width: 15px;
    max-height: 15px;
    border-radius: 50%;
    background-size: cover;
    transform: scale(3.5) translateY(-3px);
  }
  @media (min-width: 500px) {
    .box {
      transform: scale(4);
    }
  }
  .box-small {
    width: 15px;
    height: 15px;
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
`;

export default GlobalStyle;
