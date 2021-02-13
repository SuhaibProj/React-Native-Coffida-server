import React from 'react';
import { Component } from 'react';
import { Text, View, Button, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

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
            isLoading: true,
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
                isLoading: false, 
                id: responseJSON.user_id,
                email: responseJSON.email,  
                firstName: responseJSON.first_name,
                lastName: responseJSON.last_name
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
                <Text style ={styleCSS.text}>My Details:</Text>
                <View style = {{borderRadius: 25, borderWidth: 2, marginVertical: 10, fontSize: 15, textAlign: 'center',}}>     
                    <Text style = {styleCSS.textDetails}>Account ID: {this.state.id}</Text>
                    <Text style = {styleCSS.textDetails}>Email: {this.state.email}</Text>
                    <Text style = {styleCSS.textDetails}>First Name: {this.state.firstName}</Text>
                    <Text style = {styleCSS.textDetails}>Last Name: {this.state.lastName}</Text>
                </View>
                <View style ={styleCSS.update}>
                    <Button 
                        title = 'Update Account Details' 
                        onPress={() => navig.navigate('UpdateUserDetails')}>
                    </Button>
                </View>
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
    text: {
        marginVertical: 25,
        fontSize: 15,
        textAlign: 'center',
    },
    buttonGeneric: {
        marginVertical: 10,
        width: '75%',
        alignSelf: 'center',
    },
    update: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    textDetails: {
        fontSize: 15,
        textAlign: 'center',
        color: 'red',
    },
});
