import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ViewFavouriteLocations extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount(){
        this.inputfavourite();
    }

    inputfavourite = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        const location_id = await AsyncStorage.getItem('@location_id')
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ location_id+'/favourite', {  
            headers: {'Content-Type': 'application/json','X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else{ throw 'Something didnt work'; }
        })
        .then((responseJSON) => {
            console.log(responseJSON)
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
}

const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#808080",
        padding: 10,
    },
    textDetails: {
        alignSelf: 'center',
    },

});