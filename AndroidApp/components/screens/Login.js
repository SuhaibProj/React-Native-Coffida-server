import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid, Image, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id:'',
            email: '',
            password: '',
            token: '',
        };
    }

    onLogin = async() => {        
        let database_info = {
            email: this.state.email,
            password: this.state.password,
        };
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(database_info),
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 400){ throw "Incorrect Credentials"; }
            else if (response.status === 500) {throw "Server Error";}
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .then(async(responseJSON) => {
            console.log(responseJSON);
            
            await AsyncStorage.setItem('@id', JSON.stringify(responseJSON.id));
            await AsyncStorage.setItem('@session_token', responseJSON.token);
            
            const id = await AsyncStorage.getItem('@id');
            const session = await AsyncStorage.getItem('@session_token');
            console.log("Login Token is:"+session);
            console.log("Login ID is: "+id);
            ToastAndroid.show("User Log-In Successful",ToastAndroid.SHORT);
            this.props.navigation.navigate("AuthUser");
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };


    render() {
        const navig = this.props.navigation;
        return (
            <ScrollView style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>CoffiDa Login Page</Text>
                <Image style={styleCSS.edit} source={require('../Images/UG.png')}/>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    onChangeText = {(email) => this.setState({email})}
                    autoCapitalize="none" value={this.state.email}
                />
                <TextInput style = {styleCSS.input} placeholder={'Password'} 
                    placeholderTextColor='grey'
                    secureTextEntry = {true} underlineColorAndroid="transparent"
                    onChangeText = {(password) => this.setState({password})}
                    autoCapitalize="none" value={this.state.password} 
                />
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.onLogin()}>
                    <Text style = {styleCSS.textDetails}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navig.navigate('Register')}>
                    <Text style = {styleCSS.register}>Not Registered?</Text>
                </TouchableOpacity>
            </ScrollView>
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
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: '#404040',
        marginVertical: 10,
        alignSelf: 'center',
        color:'white',
    },
    login: {
        alignSelf: 'center',
        marginVertical: 20, 
        width: 100,
        color:'white',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    register: {
        alignSelf: 'center',
        color: 'grey',
        marginTop:10,
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    edit: {
        resizeMode:'contain',
        marginTop:40,
        marginBottom: 20,
        width:120,
        height:120,
        alignSelf: 'center',
    },

});

