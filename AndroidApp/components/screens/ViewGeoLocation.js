import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, PermissionsAndroid, ToastAndroid, Image, Button } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

async function requestLocationPermission(){
    try {
        const granted = await PermissionsAndroid.request (
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Request Location Permission',
                message: 'This app requires access to your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can access location');
            return true;
        } else {
            console.log('Location permission denied');
            return false;
        } 
    } catch (error) {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }
}

export default class ViewGeoLocation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            location: null,
            locationPermission: false,
        }
        this.findCoordinates = this.findCoordinates.bind(this)
    }
    componentDidMount(){
        this.findCoordinates();
    }

    findCoordinates = () => {
        if(!this.state.locationPemission){
            this.setState({
                locationPermission:requestLocationPermission(),
            })
        }
        Geolocation.getCurrentPosition((position) => {
            const location = JSON.stringify(position)
            //const location = position;
            console.log(position);
            this.setState({location:location})
        },
        (error) => { ToastAndroid.show(error, ToastAndroid.SHORT); },
        {
            enableHighAccuracy: true,
            timeout: 20000, //get location for 20 secs
            maximumAge: 1000 
        });
    };

    render() {
        return (
            <View style = { styleCSS.container }> 
                <Button title="Get my coords" onPress={() => {this.findCoordinates()}}/>
                <Text>Location: { this.state.location }</Text>
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