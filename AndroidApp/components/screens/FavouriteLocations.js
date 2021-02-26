import React from 'react'
import { Component } from 'react'
import { View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Class that initiates a POST request to API to CREATE a favourite for coffee location for the 
    specific location and displays result with UI */

export default class FavouriteLocations extends Component {
    constructor (props) {
        super(props)
    }

    //Run at screen load
    componentDidMount = () => {
        this.inputfavourite();
    }

    inputfavourite = async () => {
        //Retireve location ID + session token from async storage for POST Request.
        const session = await AsyncStorage.getItem('@session_token');
        const lId = await AsyncStorage.getItem('@location_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ lId +'/favourite', {
            method: 'post',    
            headers: {'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { 
                this.props.navigation.navigate('LocationDetails');
                throw "Favourite Added"
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 403){ throw "Forbidden"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
    
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        return (
            <View style = { styleCSS.container }> 
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
    },

});