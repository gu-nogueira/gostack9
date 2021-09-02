import React from 'react';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import { NavigationContainer } from '@react-navigation/native';
// Existem vários tipos de navegações no react-native o de abas inferiores e superiores, navegação por stack (próximas páginas), navegação por drawer (menu latral)
// Vamos utilizar a stack
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './pages/Main';
import User from './pages/User';

// const Routes = createAppContainer(
//   createStackNavigator({
//     Main,
//     User,
//   },
//   {
//     headerLayoutPreset: 'center',
//   })
// );

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5dd2f8',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          // Remove (no IOS) o texto da página anterior
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuários',
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
