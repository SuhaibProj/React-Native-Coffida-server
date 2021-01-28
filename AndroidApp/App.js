import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from './components/screens/Home'

import RegisterScreen from './components/screens/Register'
import LoginScreen from './components/screens/Login'

import AuthUserScreen from './components/screens/AuthUser'
import UserMgmtScreen from './components/screens/UserMgmt'
import UpdateUserDetails from './components/screens/UpdateUserDetails'

import ReviewMgmtScreen from './components/screens/ReviewMgmt'


const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="AuthUser" component={AuthUserScreen} options={{ title: 'My Home' }}/>
            <Stack.Screen name="UserMgmt" component={UserMgmtScreen} options={{ title: 'My Account' }}/>
            <Stack.Screen name="UpdateUserDetails" component={UpdateUserDetails} options={{ title: 'My Account information' }}/>
            <Stack.Screen name="ReviewMgmt" component={ReviewMgmtScreen} options={{ title: 'Review Management' }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}