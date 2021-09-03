import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
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
