import React from 'react';
import { Router } from 'react-router-dom';
// O Provider deixará o store do redux disponível para todos os componentes da aplicação
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      {/* Colocamos o BrowserRouter aqui para que o componente Header tenha acesso as propriedades de navegação */}
      {/* Aqui o router-dom está ouvindo o que está acontecendo no service de history */}
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
