import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

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
    --toastify-font-family: 'Inter', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, select, button {
    font: 16px 'Inter', sans-serif;
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
    font-size: 42px;
    font-weight: 800;
    color: ${colors.green4};
  }

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: ${colors.green4};
  }

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: ${colors.green4};
  }

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: ${colors.green3};
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: ${colors.green3};
    font-weight: 500;
  }

  a:active {
    color: ${colors.green2};
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
      font-size: 36px;
      line-height: 36px;
    }

    h2 {
      font-size: 26px;
      line-height: 26px;
    }
  }
`;
