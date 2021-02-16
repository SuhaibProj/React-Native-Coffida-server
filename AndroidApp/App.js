import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react'

import HomeScreen from './components/screens/Home'

import LoginScreen from './components/screens/Login'
import LogoutScreen from './components/screens/Logout'

import RegisterScreen from './components/screens/Register'

import AuthUserScreen from './components/screens/AuthUser'
import MyAccountScreen from './components/screens/MyAccount'
import UpdateUserDetails from './components/screens/UpdateUserDetails'

import ReviewMgmtScreen from './components/screens/ReviewMgmt'
import AddReviewScreen from './components/screens/AddReview'
import UpdateReviewScreen from './components/screens/UpdateReview'
import DeleteReviewScreen from './components/screens/DeleteReview'
import AddReviewPhotoScreen from './components/screens/AddReviewPhoto'
import SearchReviewPhotoScreen from './components/screens/SearchReviewPhoto'
import DeleteReviewPhotoScreen from './components/screens/DeleteReviewPhoto'

import LocationDetailsScreen from './components/screens/LocationDetails'
import ViewLocationsScreen from './components/screens/ViewLocations'
import FavouriteLocationsScreeen from './components/screens/FavouriteLocations';
import RemoveFavouriteLocationsScreen from './components/screens/RemoveFavouriteLocations';
import ViewFavouriteLocationsScreen from './components/screens/ViewFavouriteLocations';

import ReviewDetailsScreeen from './components/screens/ReviewDetails';
import AddReviewLocationsScreen from './components/screens/AddReviewLocations';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Logout" component={LogoutScreen}/>
            <Stack.Screen name="AuthUser" component={AuthUserScreen} options={{ title: 'My Home', headerLeft:null  }}/>
            <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ title: 'My Account'}}/>
            <Stack.Screen name="UpdateUserDetails" component={UpdateUserDetails} options={{ title: 'Update Account' }}/>
            <Stack.Screen name="ReviewMgmt" component={ReviewMgmtScreen} options={{ title: 'Review Management' }}/>
            <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ title: 'Insert Review' }}/>
            <Stack.Screen name="UpdateReview" component={UpdateReviewScreen} options={{ title: 'Update Review' }}/>
            <Stack.Screen name="DeleteReview" component={DeleteReviewScreen} options={{ title: 'Delete Review' }}/>
            <Stack.Screen name="AddReviewPhoto" component={AddReviewPhotoScreen} options={{ title: 'Insert Review Photo' }}/>
            <Stack.Screen name="SearchReviewPhoto" component={SearchReviewPhotoScreen} options={{ title: 'All Review Photos' }}/>
            <Stack.Screen name="DeleteReviewPhoto" component={DeleteReviewPhotoScreen} options={{ title: 'Delete Review Photo' }}/>
            <Stack.Screen name="ViewLocations" component={ViewLocationsScreen} options={{ title: 'All Locations' }}/>
            <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details' }}/>
            <Stack.Screen name="FavouriteLocations" component={FavouriteLocationsScreeen} options={{ title: 'Adding Favourite' }}/>
            <Stack.Screen name="RemoveFavouriteLocations" component={RemoveFavouriteLocationsScreen} options={{ title: 'Remove Favourite' }}/>
            <Stack.Screen name="ReviewDetails" component={ReviewDetailsScreeen} options={{ title: 'Reviews' }}/>
            <Stack.Screen name="AddReviewLocations" component={AddReviewLocationsScreen} options={{ title: 'Select Locations' }}/>
            <Stack.Screen name="ViewFavouriteLocations" component={ViewFavouriteLocationsScreen} options={{ title: 'View Favourites' }}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

