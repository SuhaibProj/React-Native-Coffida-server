import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

//import AsyncStorage from '@react-native-community/async-storage';

const adminSignIn = {email: 'suhaib1602@yahoo.com', password: 'password'}


export default class Login extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        };
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>CoffiDa Login Page</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})}
                    autoCapitalize="none" defaultValue={this.state.username}
                />
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})}
                    autoCapitalize="none" defaultValue={this.state.password} 
                />
                <View style = {styleCSS.login}>
                    <Button title = 'Login' onPress={this._signIn} >
                        //onPress={() => navig.navigate('AuthUser')}
                    </Button>
                </View>
                <View style = {styleCSS.register}>
                    <Button title = 'Register' onPress={() => navig.navigate('Register')}>
                    </Button>
                </View>
            </View>
        ); 
        
    }
    _signIn = async() => {
        if(adminSignIn.username === this.state.username && adminSignIn.password === this.state.password){
            //await AsyncStorage.setItem('loggedIn', '1')
            this.props.navigation.navigate('AuthUser')
        } else {
            alert("Incorrect Login Details!\nPlease Try Again.")
        }
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
    register: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    login: {
        alignSelf: 'center',
        marginVertical: 20, 
        width: 100,
    }

});

