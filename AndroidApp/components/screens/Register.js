import React from 'react';
import { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import Divider from 'react-native-divider'

export default class Register extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    onRegister = () => {
        let database_info = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };
        return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
            method: 'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(database_info),
        })
        .then((response) => {
            if(response.status === 201) { return response.json(); }
            else if (response.status === 400) { throw "Bad Request"; }
            else if (response.status === 500) {throw "Server Error"}
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .then((responseJSON) => {
            console.log("User ID Created: ", responseJSON);
            ToastAndroid.show("User Creation Successful",ToastAndroid.SHORT);
            this.props.navigation.navigate("Login");
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };
    
    render() {
        return (
            <ScrollView style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>CoffiDa Registration Page</Text>
                <Text style={ styleCSS.text }>Enter your First Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'First Name'} 
                    onChangeText = {(firstName) => this.setState({firstName})} 
                    value={this.state.firstName} placeholderTextColor='grey'
                />
                <Text style={ styleCSS.text }>Enter your Last Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Last Name'} 
                    onChangeText = {(lastName) => this.setState({lastName})} 
                    value={this.state.lastName} placeholderTextColor='grey'
                />
                <Text style={ styleCSS.text }>Register your Email:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})} 
                    value={this.state.email} placeholderTextColor='grey'
                />
                <Text style={ styleCSS.text }>Create your New Password:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Password'} 
                    secureTextEntry = {true} 
                    onChangeText = {(password) => this.setState({password})} 
                    value={this.state.password} placeholderTextColor='grey'
                />
                <Divider color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.onRegister()}>
                    <Text style = {styleCSS.textDetails}>Register</Text>
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
        alignSelf: 'center',
        color:'white',
    },
    text: {
        fontSize: 15,
        alignSelf: 'center',
        color:'white',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
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
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
});