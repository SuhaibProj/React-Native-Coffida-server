import React from 'react'
import { Component } from 'react'
import { View, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Class that initiates a POST request to API to logout the user to reach the 
    initial homepage and displays result with UI */

export default class Logout extends Component {
    constructor (props) {
        super(props)
    }

    //Run at screen load
    componentDidMount() {
        this.logOut();
    }

    logOut = async () => {
        //Retireve session token from async storage for POST Request.
        const session = await AsyncStorage.getItem('@session_token');
        console.log("Session Token at LogOut: "+session);
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
            method: 'post',
            headers: {'X-Authorization': session,}, 
        })
        .then(async(response) => {
            if(response.status === 200) { 
                await AsyncStorage.removeItem('@session_token');
                ToastAndroid.show("Logged-Out",ToastAndroid.SHORT);
                this.props.navigation.navigate("Home");  
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 403){ throw "Forbidden"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
    }
    
    render() {
        return (
            <View style = { styleCSS.container }> 
                <ActivityIndicator size="large" />
            </View>
        )
    }

}

const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        justifyContent:'center',
        alignItems: 'center',
    },
});