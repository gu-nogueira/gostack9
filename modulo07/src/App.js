import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// O Provider deixará o store do redux disponível para todos os componentes da aplicação
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* Colocamos o BrowserRouter aqui para que o componente Header tenha acesso as propriedades de navegação */}
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
