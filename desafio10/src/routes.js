import React from 'react';
import { TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ** Routes
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from './styles/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AddRoutes = () => {
  const AddRoutesOptions = ({ navigation, title }) => ({
    title,
    headerTitleAlign: 'center',
    headerTransparent: true,
    headerTintColor: '#fff',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>
    ),
  });

  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}>
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={({ navigation }) =>
          AddRoutesOptions({
            navigation,
            title: 'Selecione o prestador',
          })
        }
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) =>
          AddRoutesOptions({
            navigation,
            title: 'Selecione o horário',
          })
        }
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={({ navigation }) =>
          AddRoutesOptions({
            navigation,
            title: 'Confirmar agendamento',
          })
        }
      />
    </Stack.Navigator>
  );
};

const Routes = ({ signed = false }) => {
  return (
    <NavigationContainer>
      {signed ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarVisible: false,
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
            tabBarActiveBackgroundColor: colors.quartiary,
            unmountOnBlur: true,
            tabBarStyle: {
              paddingTop: 10,
              paddingBottom: 15,
              height: 65,
              backgroundColor: colors.quartiary,
            },
          })}>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: 'Agendamentos',
              tabBarIcon: ({ color }) => (
                <Icon name="event" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="SelectProvider"
            component={AddRoutes}
            options={{
              title: 'Adicionar',
              tabBarIcon: ({ color }) => (
                <Icon name="add-circle-outline" size={20} color={color} />
              ),
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Meu perfil',
              tabBarIcon: ({ color }) => (
                <Icon name="person" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
