import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Right, ListItem, Left,Thumbnail } from 'native-base';
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
        const session = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@id');
        console.log("Session Variable: " + session);
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ id, {
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
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
                <View style={styleCSS.list}>
                    <ListItem key={this.state.id} avatar>
                        <Left>
                            <Thumbnail style={styleCSS.location} source={require('../Images/UG.png')}/>
                        </Left>
                            <View style = {styleCSS.textDetails}>  
                                <Text style = {styleCSS.textDetails}>My Details:</Text>   
                                <View style = {{marginVertical:5}}></View>
                                <Text style = {styleCSS.textDetails}>Email: {this.state.email}</Text>
                                <Text style = {styleCSS.textDetails}>First Name: {this.state.firstName}</Text>
                                <Text style = {styleCSS.textDetails}>Last Name: {this.state.lastName}</Text>
                            </View>
                    </ListItem>
                </View>
                <Divider color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('UpdateUserDetails')}>
                    <Text style = {{textShadowRadius:5, fontSize: 15, alignSelf:'center'}}>Update Account Details</Text>
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
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
    location: {
        width:70,
        height:70,
        alignContent:'flex-start',
        marginRight:30,
        borderColor:'white',
        borderRightWidth:3,  
    },
});
