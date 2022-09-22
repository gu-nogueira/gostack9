import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import MainApp from './App';

import colors from './styles/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
