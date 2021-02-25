import React from 'react'
import { Component } from 'react'
import { View, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Class that initiates a DELETE request to API to DELETE user 
    review and displays result with UI */

export default class DeleteReview extends Component {
    constructor (props) {
        super(props)
    }
    //Run at screen load
    componentDidMount(){
        this.deleteReview();
    }

    
    deleteReview = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const lId = await AsyncStorage.getItem('@location_id');
        const rId = await AsyncStorage.getItem('@review_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+lId+'/review/'+rId, {
            method: 'delete',    
            headers: {'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { 
                this.props.navigation.navigate('MyReviews');
                throw "Review Deleted"
            }
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
    },
});