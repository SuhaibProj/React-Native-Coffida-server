import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

/* Class that displays the initial starting page of user and also performs check status for when 
    user has logged in previously, thus able to log them in automatically the next time,
    a display is also designed with UI */

export default class Home extends Component {
    constructor (props) {
        super(props)
    }

    //Run at screen load
    componentDidMount(){
        this.verifyLoggedIn();
    }

    //check that if session token is stored already then sign in with that session token.
    verifyLoggedIn = async () => {
        let session = await AsyncStorage.getItem('@session_token');
        console.log("Session token at HomePage is: ",session);
        if (session !== null) { this.props.navigation.navigate('AuthUser'); }
    }

    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}>
                <Text style ={styleCSS.title}>CoffiDa Home Page</Text>
                <Image
                    style={styleCSS.edit}
                    resizeMode='contain'
                    source={ require('../Images/BG.png')}
                />
                <Text style ={styleCSS.text}>This is THE platform for reviews 
                    {"\n"}on the best local coffee spots.
                </Text>

                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('Login')}>
                    <Text style = {styleCSS.textDetails}>Sign In</Text>
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
        textAlign: 'center',
        color:'white',
    },
    text: {
        marginVertical: 30,
        fontSize: 15,
        textAlign: 'center',
        color:'white',
    },
    textDetails: {
        
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    edit: {
        marginTop:40,
        marginBottom: 10,
        width:150,
        height:150,
        alignSelf: 'center',
        
    },
    button: {
        alignSelf: 'center',
        marginVertical: 20,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
});
