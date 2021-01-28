import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

export default class Register extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>CoffiDa Registration Page</Text>
                <Text style={ styleCSS.text }>Enter your First Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'First name'} />
                <Text style={ styleCSS.text }>Enter your Last Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Last Name'} />
                <Text style={ styleCSS.text }>Register your Email:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} />
                <Text style={ styleCSS.text }>Create your New Password:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} />
                <View style = {styleCSS.spacer }>
                    <Button 
                        title = 'Submit' 
                        onPress={() => navig.navigate('Login')}>
                    </Button>
                </View>
                <TouchableOpacity>

                </TouchableOpacity>
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
        marginBottom: 30,
    },

});