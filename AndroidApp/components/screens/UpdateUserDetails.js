import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

export default class UpdateDeails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }
    
    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>Edit Account Details</Text>
                <Text style={ styleCSS.text }>Edit your First Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'First name'} 
                onChangeText = {(firstName) => this.setState({firstName})} value={this.state.firstName}
                />
                <Text style={ styleCSS.text }>Edit your Last Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Last Name'} 
                onChangeText = {(lastName) => this.setState({lastName})} value={this.state.lastName}
                />
                <Text style={ styleCSS.text }>Edit your Email:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})} value={this.state.email}
                />
                <Text style={ styleCSS.text }>Enter your New Password:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} 
                    onChangeText = {(password) => this.setState({password})} value={this.state.password}
                />
                <View style = {styleCSS.login }>
                    <Button 
                        title = 'Submit' 
                        onPress={() => navig.navigate('AuthUser')}>
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
        fontSize: 15,
        alignSelf: 'center',
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
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },

});
