import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class DeleteReview extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount(){
        this.deleteReview();
    }

    deleteReview = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ location_id+'/review/'+review_id, {
            method: 'delete',    
            headers: {'X-Authorization': session,},
        })
        .then(() => {
            console.log("deleting Review Location");
            this.props.navigation.navigate('ReviewMgmt');
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
    },
});