import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import HomeScreen from './components/screens/Home'
import RegisterScreen from './components/screens/Register'
import LoginScreen from './components/screens/Login'
import AuthUserScreen from './components/screens/AuthUser'

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Page' }}
        />
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="AuthUser" component={AuthUserScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 

export default MyStack