import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

export default class Login extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>CoffiDa Login Page</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} />
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} />
                <View style = {{marginVertical: 10, width: 100,}}>
                    <Button 
                        title = 'Login' 
                        onPress={() => navig.navigate('AuthUser')}>
                    </Button>
                </View>
                <View style = {styleCSS.spacer }>
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
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
    },
    text: {
        fontSize: 15,
    },
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.20)',
        marginVertical: 10,
    },
    spacer: {
        flex: 1,
        marginVertical: 20,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },

});

