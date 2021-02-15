import React from 'react'
import { Component } from 'react'
import { View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class RemoveFavouriteLocations extends Component {
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
            method: 'delete',    
            headers: {'X-Authorization': session,},
        })
        .then(() => {
            console.log("deleting Favourite Location")
            this.props.navigation.navigate('ViewLocations')
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
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
    },

});