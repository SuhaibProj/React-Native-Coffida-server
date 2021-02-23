import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DeleteReviewPhoto extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        this.deletePhoto();
    }

    deletePhoto = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', {
            method: 'delete',    
            headers: { 'Content-Type': 'image/jpeg', 'X-Authorization': session, },},
        )
        .then((response) => {
            if(response.status === 200) { 
                ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
                this.props.navigation.navigate('MyReviews'); 
            }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        /* .then(() => {
            ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
            this.props.navigation.navigate('MyReviews');
        }) */
        .catch((error) => {
            console.error(error);
        });
    };

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
    },
})