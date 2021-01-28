import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

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
                    onChangeText = {(email) => this.setState({email})} value={this.state.email}
                />
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})} value={this.state.password}
                />
                <View style = {styleCSS.login}>
                    <Button 
                        title = 'Login' 
                        onPress={() => navig.navigate('AuthUser')}>
                    </Button>
                </View>
                <View style = {styleCSS.register}>
                    <Button 
                        title = 'Register' 
                        onPress={() => navig.navigate('Register')}>
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

