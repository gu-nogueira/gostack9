import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    scroll-behavior: smooth;
    background-color: ${colors.background};
    --toastify-font-family: 'Roboto', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, select, button {
    font: 16px 'Roboto', sans-serif;
    color: ${colors.grey1};
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  /*
   *  Fonts
   */

  h1 {
    font-size: 36px;
    font-weight: 800;
    color: #FFF;
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${colors.purpleShadow};
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.purpleShadow};
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.purple};
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: ${colors.purple};
    font-weight: 500;
  }

  a:active {
    color: ${colors.purpleLight};
  }

  small {
    font-size: 14px;
  }

  /*
   *  Mobile assets
   */

  @media only screen and (max-width: 1049px) {

    html, body {
      overflow-x: hidden;
    }

    body {
      position: relative
    }

    /*
     *  Fonts
     */

    h1 {
      font-size: 34px;
      line-height: 34px;
    }

    h2 {
      font-size: 24px;
      line-height: 24px;
    }
  }
`;
