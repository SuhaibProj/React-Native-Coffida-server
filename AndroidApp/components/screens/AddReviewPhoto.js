import React, {Component} from 'react';
import {View, Text, ToastAndroid, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNCamera} from 'react-native-camera';

export default class AddReviewPhoto extends Component {

    takePhoto = async(database_info) => {
        const review = this.props.route.params.review
        const session = await AsyncStorage.getItem('@session_token');
        const review_id = review.review.review_id;
        const location_id = review.location.location_id;
        
        console.log(database_info.uri);
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo',{
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
                    <Text style = {styleCSS.textDetails}>Capture</Text>
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
        padding: 15,
        borderRadius:10,
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
});
