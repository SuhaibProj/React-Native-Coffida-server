import React from 'react'
import { Component } from 'react'
import { View, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Logout extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount(){
        this.logOut();
    }

    logOut = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        console.log("Session Token at LogOut: "+session);
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
            method: 'post',
            headers: {'X-Authorization': session,}, 
        })
        .then(async() => {
            console.log("Logging Out");
            await AsyncStorage.removeItem('@session_token');
            ToastAndroid.show("Successively Logged-Out",ToastAndroid.SHORT);
            this.props.navigation.navigate("Home");
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
        backgroundColor: '#cccccc',
        justifyContent:'center',
        alignItems: 'center',
    },
});