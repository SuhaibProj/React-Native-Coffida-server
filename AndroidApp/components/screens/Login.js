import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
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
        }
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(database_info),
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 400){ throw "Incorrect Credentials"; }
            else{ throw 'Something didnt work'; }
        })
        .then(async(responseJSON) => {
            console.log(responseJSON);
            
            await AsyncStorage.setItem('@id', JSON.stringify(responseJSON.id));
            await AsyncStorage.setItem('@session_token', responseJSON.token);
            
            const id = await AsyncStorage.getItem('@id');
            const session = await AsyncStorage.getItem('@session_token');
            console.log("Here token is:"+session);
            console.log("Here ID is: "+id);
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
            <View style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>CoffiDa Login Page</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})}
                    autoCapitalize="none" value={this.state.email}
                />
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})}
                    autoCapitalize="none" value={this.state.password} 
                />
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.onLogin()}>
                    <Text style = {styleCSS.textDetails}>Login</Text>
                </TouchableOpacity>
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('Register')}>
                    <Text style = {styleCSS.textDetails}>Register</Text>
                </TouchableOpacity>
            </View>
        );  
    }
}


const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        textAlign: 'center',
    },
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.20)',
        marginVertical: 10,
        alignSelf: 'center',
    },
    login: {
        alignSelf: 'center',
        marginVertical: 20, 
        width: 100,
    },
    textDetails: {
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#808080",
        padding: 10,
    },

});

