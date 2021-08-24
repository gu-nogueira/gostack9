import React from 'react';

import Routes from './routes';
// Podemos dar o nome que quisermos para GlobalStyle
import GlobalStyle from './styles/global';

function Main() {
  return (
    <>
    <Routes />
    <GlobalStyle />
    </>
  );
}

export default Main;
