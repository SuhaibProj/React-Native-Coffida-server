import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'
export default class UpdateDeails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        };
    }

    componentDidMount(){
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
                email: responseJSON.email,  
                first_name: responseJSON.first_name,
                last_name: responseJSON.last_name,
            });
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    onUpdate  = async () => {
        let database_info = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        };
        const session = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@id');
        console.log("User ID in UpdateUser: "+id);
        console.log("User Session Token in UpdateUser: "+session);
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+ id, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info)
        })
        .then((response) => {
            if(response.status === 200) { 
                console.log("User Details Updated");
                ToastAndroid.show("Details Updated",ToastAndroid.SHORT);
                this.props.navigation.navigate("MyAccount");
                ToastAndroid.show("Refresh Page for Updates",ToastAndroid.SHORT); 
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 403){ throw "Forbidden"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    };

    render() {
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>Edit Account Details</Text>
                <Text style={ styleCSS.textDetails }>Edit your Email:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Email'} 
                    onChangeText = {(email) => this.setState({email})} value={this.state.email}
                />
                <Text style={ styleCSS.textDetails }>Edit your First Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'First Name'} 
                onChangeText = {(first_name) => this.setState({first_name})} value={this.state.first_name}
                />
                <Text style={ styleCSS.textDetails }>Edit your Last Name:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Last Name'} 
                onChangeText = {(last_name) => this.setState({last_name})} value={this.state.last_name}
                />
                <Text style={ styleCSS.textDetails }>Enter your New Password:</Text>
                <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} 
                    onChangeText = {(password) => this.setState({password})} value={this.state.password}
                />
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.onUpdate()}>
                    <Text style = {styleCSS.textDetails}>Submit</Text>
                </TouchableOpacity>
            </View>
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
        padding: 10,
        borderRadius:10,
    },

});
