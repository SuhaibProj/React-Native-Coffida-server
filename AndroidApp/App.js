import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeScreen from './components/screens/Home'

import LoginScreen from './components/screens/Login'

import RegisterScreen from './components/screens/Register'

import AuthUserScreen from './components/screens/AuthUser'
import MyAccountScreen from './components/screens/MyAccount'
import UpdateUserDetails from './components/screens/UpdateUserDetails'

import SearchReviewsScreen from './components/screens/SearchReviews'

import ReviewMgmtScreen from './components/screens/ReviewMgmt'
import AddReviewScreen from './components/screens/AddReview'
import UpdateReviewScreen from './components/screens/UpdateReview'
import DeleteReviewScreen from './components/screens/DeleteReview'
import AddReviewPhotoScreen from './components/screens/AddReviewPhoto'
import SearchReviewPhotoScreen from './components/screens/SearchReviewPhoto'
import DeleteReviewPhotoScreen from './components/screens/DeleteReviewPhoto'


import LocationsScreen from './components/screens/Locations'


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
            <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ title: 'My Account' }}/>
            <Stack.Screen name="UpdateUserDetails" component={UpdateUserDetails} options={{ title: 'Update Account' }}/>
            <Stack.Screen name="ReviewMgmt" component={ReviewMgmtScreen} options={{ title: 'Review Management' }}/>
            <Stack.Screen name="SearchReviews" component={SearchReviewsScreen} options={{ title: 'Reviews' }}/>
            <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ title: 'Insert Review' }}/>
            <Stack.Screen name="UpdateReview" component={UpdateReviewScreen} options={{ title: 'Update Review' }}/>
            <Stack.Screen name="DeleteReview" component={DeleteReviewScreen} options={{ title: 'Delete Review' }}/>
            <Stack.Screen name="AddReviewPhoto" component={AddReviewPhotoScreen} options={{ title: 'Insert Review Photo' }}/>
            <Stack.Screen name="SearchReviewPhoto" component={SearchReviewPhotoScreen} options={{ title: 'All Review Photos' }}/>
            <Stack.Screen name="DeleteReviewPhoto" component={DeleteReviewPhotoScreen} options={{ title: 'Delete Review Photo' }}/>
            <Stack.Screen name="Locations" component={LocationsScreen} options={{ title: 'Locations' }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}