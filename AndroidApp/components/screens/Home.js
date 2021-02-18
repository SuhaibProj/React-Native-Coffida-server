import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class Home extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount(){
        this.verifyLoggedIn();
    }

    componentWillUnmount(){
        this.verifyLoggedIn();
    }

    //check if session token stored already thus sign in already.
    verifyLoggedIn = async () => {
        let checkToken = await AsyncStorage.getItem('@session_token');
        console.log("Session token at HomePage is: ",checkToken);
        if (checkToken !== null) { this.props.navigation.navigate('AuthUser'); }
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
        marginVertical: 25,
        fontSize: 15,
        textAlign: 'center',
        color:'white',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    edit: {
        width:200,
        height:200,
        alignSelf: 'center',
        
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
});
