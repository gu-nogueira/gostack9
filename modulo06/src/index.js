import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
// É sempre importante fazer importações DEPOIS do Reactotron, para debugarmos rotas, tudo mais... Pois o 'console.tron' só irá funcionar a partir daqui
import Routes from './routes';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#5dd2f8" />
        <Routes />
      </>
    );
  }
};
