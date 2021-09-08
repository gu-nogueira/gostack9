import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';

import colors from './styles/colors';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // header, não headerTitle como indica na documentação do React Navigation, pois há uma margem na esquerda nativa no android
          header: props => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
