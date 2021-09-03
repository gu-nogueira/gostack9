import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

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
        <Stack.Screen
          name="Repository"
          component={Repository}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
