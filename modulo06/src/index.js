import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import './config/ReactotronConfig';
// É sempre importante fazer importações DEPOIS do Reactotron, para debugarmos rotas, tudo mais... Pois o 'console.tron' só irá funcionar a partir daqui
import Routes from './routes';

export default class App extends Component {
  render() {
    return <Routes />;
  }
};

console.tron.log('Teste log');
