import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UpdateDeails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    onUpdate  = async () => {
        let database_info = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }
        const session = await AsyncStorage.getItem('@session_token')
        const id = await AsyncStorage.getItem('@id')
        console.log("User ID in UpdateUser: "+id);
        console.log("User Session Token in UpdateUser: "+session);
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+ id, {
            method: 'put',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info)
        })
        .then((response) => {
            if(response.status === 200) { 
                console.log("User Details Updated");
                ToastAndroid.show("Details Updated",ToastAndroid.SHORT);
                this.props.navigation.navigate("MyAccount"); 
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 403){ throw "Forbidden"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show(error, ToastAndroid.SHORT)
        });
    };

    render() {
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>Edit Account Details</Text>
                <Text style={ styleCSS.text }>Edit your Email:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})} defaultValue={this.state.email}
                />
                <Text style={ styleCSS.text }>Edit your First Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'First Name'} 
                onChangeText = {(firstName) => this.setState({firstName})} defaultValue={this.state.firstName}
                />
                <Text style={ styleCSS.text }>Edit your Last Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Last Name'} 
                onChangeText = {(lastName) => this.setState({lastName})} defaultValue={this.state.lastName}
                />
                <Text style={ styleCSS.text }>Enter your New Password:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} 
                    onChangeText = {(password) => this.setState({password})} defaultValue={this.state.password}
                />
                <View style = { styleCSS.login }>
                    <Button 
                        title = 'Submit' 
                        onPress={() => this.onUpdate()}>
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
