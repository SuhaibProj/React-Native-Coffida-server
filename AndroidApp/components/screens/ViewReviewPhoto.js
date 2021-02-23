import React from 'react'
import { Component } from 'react'
import { Alert, Text, View, Image, StyleSheet, TouchableOpacity, ToastAndroid, LogBox} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ViewReviewPhoto extends Component {
    constructor (props) {
        super(props)
        this.state = {
            iURL:'',
        };
    }

    componentDidMount() {
        this.getPhoto();
        //LogBox.ignoreAllLogs(true)
      }
    
    getPhoto = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', {
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
        })
        .then((response) => {
            Alert.prompt(response.status.valueOf(200));
            this.setState({ iURL: response.url + '?timestamp=' + Date.now(), });
            this.state.iURL.toString();
            console.log('URL:', this.state.iURL);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    deletePhoto = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', {
            method: 'delete',    
            headers: { 'Content-Type': 'image/jpeg', 'X-Authorization': session, },},
        )
        .then(() => {
            ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
            this.props.navigation.navigate('MyReviews');
        })
        .catch((error) => {
            console.error(error);
        });
    };

    render() {
        console.log('Render URL:', this.state.iURL);
        return (
            <View style={styleCSS.container}>
                <Image style={styleCSS.image} source={{uri: this.state.iURL}} />
                <View style ={{padding:5}}></View>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.deletePhoto()}>
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
    text: {
        color:'white',
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        width: '100%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
    location: {
        alignSelf:'center',
        textShadowRadius:5,
        marginTop:'5%',
        marginRight:20,
        borderColor:'white',
        paddingRight:10,
        borderRightWidth:1,  
    },
});
