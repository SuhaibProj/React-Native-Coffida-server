import React, {Component} from 'react';
import {View, ToastAndroid, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';

/* Class that initiates a POST request to the API to utilize camera and CREATE a 
    photo of the location and store in async storage and displays result with UI */

export default class AddReviewPhoto extends Component {
    takePhoto = async(database_info) => {
        const review = this.props.route.params.review
        
        //Retireve location ID + revied ID + session token from async storage for POST Request.
        const session = await AsyncStorage.getItem('@session_token');
        const rId = review.review.review_id;
        const lId = review.location.location_id;
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+lId+'/review/'+rId+'/photo',{
            method: 'post',
            headers: {'Content-Type': 'image/jpeg', 'X-Authorization': session,},
            body: database_info,
        })
        .then(() => {
            ToastAndroid.show('Added Photo', ToastAndroid.SHORT);
            this.props.navigation.navigate('MyReviews')
        })
        .catch((error) => {
            console.error(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };

    capture = async () => {
        if (this.camera) {
            const settings = {quality: 0.5, base64: true};
            const DCIM = await this.camera.takePictureAsync(settings);
            this.takePhoto(DCIM);
        }
    };

    render() {
        return (
            <View style={styleCSS.Container}>
                <RNCamera style={styleCSS.camera} ref={(ref) => {
                    this.camera = ref;
                }}/>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.capture()}>
                    <Image style={styleCSS.location} resizeMode='contain' source={require('../Images/CS.png')}></Image>
                </TouchableOpacity> 
            </View>
        );
    }
}

const styleCSS = StyleSheet.create({
    Container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        width: '100%', 
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    location: {
        width:55,
        height:55,
        alignSelf: 'center', 
    },
});
