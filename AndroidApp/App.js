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
import MyReviewsScreen from './components/screens/MyReviews'
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
import LikeReviewScreen from './components/screens/LikeReview';
import RemoveLikedReviewScreen from './components/screens/RemoveLikedReview';
import ViewLikedReviewsScreen from './components/screens/ViewLikedReviews';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Logout', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="AuthUser" component={AuthUserScreen} options={{ title: 'My Home', headerLeft:null, headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ title: 'My Account', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
            <Stack.Screen name="UpdateUserDetails" component={UpdateUserDetails} options={{ title: 'Update Account', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="ReviewMgmt" component={ReviewMgmtScreen} options={{ title: 'Review Management', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ title: 'Insert Review', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="UpdateReview" component={UpdateReviewScreen} options={{ title: 'Update Review', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="DeleteReview" component={DeleteReviewScreen} options={{ title: 'Delete Review', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="AddReviewPhoto" component={AddReviewPhotoScreen} options={{ title: 'Insert Review Photo', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="SearchReviewPhoto" component={SearchReviewPhotoScreen} options={{ title: 'All Review Photos', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="DeleteReviewPhoto" component={DeleteReviewPhotoScreen} options={{ title: 'Delete Review Photo', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="ViewLocations" component={ViewLocationsScreen} options={{ title: 'All Locations', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} options={{ title: 'Location Details', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="FavouriteLocations" component={FavouriteLocationsScreeen} options={{ title: 'Adding Favourite', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="RemoveFavouriteLocations" component={RemoveFavouriteLocationsScreen} options={{ title: 'Remove Favourite', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="ReviewDetails" component={ReviewDetailsScreeen} options={{ title: 'Reviews' , headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
            <Stack.Screen name="AddReviewLocations" component={AddReviewLocationsScreen} options={{ title: 'Select Locations', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="ViewFavouriteLocations" component={ViewFavouriteLocationsScreen} options={{ title: 'View Favourites', headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'} }}/>
            <Stack.Screen name="MyReviews" component={MyReviewsScreen} options={{ title: 'My Reviews' , headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
            <Stack.Screen name="LikeReview" component={LikeReviewScreen} options={{ title: 'Like Review' , headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
            <Stack.Screen name="RemoveLikedReview" component={RemoveLikedReviewScreen} options={{ title: 'Remove Liked Review' , headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
            <Stack.Screen name="ViewLikedReviews" component={ViewLikedReviewsScreen} options={{ title: 'View Liked Reviews' , headerTintColor: 'white', headerStyle: {backgroundColor: '#404040'}}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

