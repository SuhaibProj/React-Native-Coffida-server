import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class MyAccount extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            listDetails: [],
        }
    }

    componentDidMount = async() => {
        this.getDetails();
    }

    getDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        const id = await AsyncStorage.getItem('@id')
        console.log("Session Variable: " + session)
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ id, {
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else{ throw 'Something didnt work'; }
        })
        .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({
                id: responseJSON.user_id,
                email: responseJSON.email,  
                firstName: responseJSON.first_name,
                lastName: responseJSON.last_name,
            });
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Account</Text>
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <View style = {styleCSS.textDetails}>  
                    <Text>My Details:</Text>   
                    <Text>Account ID: {this.state.id}</Text>
                    <Text>Email: {this.state.email}</Text>
                    <Text>First Name: {this.state.firstName}</Text>
                    <Text>Last Name: {this.state.lastName}</Text>
                </View>
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('UpdateUserDetails')}>
                    <Text style = {styleCSS.textDetails}>Update Account Details</Text>
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
        alignSelf: 'center',
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
