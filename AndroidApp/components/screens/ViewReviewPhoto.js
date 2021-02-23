import React from 'react'
import { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid, LogBox} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ViewReviewPhoto extends Component {
    constructor (props) {
        super(props)
        this.state = {
            photoAddress:'',
        };
    }

    componentDidMount() {
        this.retrievePhoto();
        LogBox.ignoreAllLogs(true); //remmove irrelevant warnings
    }
    
    //get token, review and location id's from async storage.
    retrievePhoto = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const lId = await AsyncStorage.getItem('@location_id');
        const rId = await AsyncStorage.getItem('@review_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + lId + '/review/' + rId + '/photo', {
            headers: {'Content-Type': 'image/jpeg', 'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { 
                this.setState({ photoAddress: response.url + '?timestamp=' + Date.now(), }); 
            }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .catch((error) => {
            console.error(error);
        });
    };

    render() {
        console.log('Render URL:', this.state.photoAddress);
        return (
            <View style={styleCSS.container}>
                <Text style={ styleCSS.title }>View Review Photo</Text>
                <Image style={ styleCSS.photo } source={{uri: this.state.photoAddress}} />
                <View style ={{padding:5}}></View>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.props.navigation.navigate('DeleteReviewPhoto')}>
                    <Text style = {styleCSS.textDetails}>Delete</Text>
                </TouchableOpacity> 
            </View>
        );
    }
    

}


const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        alignSelf: 'center',
        color:'white',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    photo: {
        resizeMode:'contain',
        marginTop:10,
        marginBottom: 30,
        width:200,
        height:200,
        alignSelf: 'center',
    },
});
