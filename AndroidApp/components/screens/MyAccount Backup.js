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
        }

    }

    componentDidMount = async() => {
        this.getDetails();
    }

    getDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        const id = await AsyncStorage.getItem('id')
        console.log("User ID: "+id)
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ id + '/', {
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }else if (response.status === 401){
                throw "Unauthorised";
            }else if (response.status === 404){
                throw "Not Found";
            }else if (response.status === 500){
                throw "Server Error";
            }else{
                throw 'Something didnt work';
            }
        })
        .then((responseJSON) => {
            this.setState({
                listDetails: responseJSON.token
            })
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
                { <FlatList data = {this.state.listDetails}
                    renderItem={({item}) => (
                        <View>
                            <Text>Your Account Details are: </Text>
                            <Text>{item.first_name}</Text>
                            <Text>{item.last_name}</Text>
                        </View>
                    )}
                    keyExtractor={({id}, index) => id}
                /> }
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Update Account Details' 
                        onPress={() => navig.navigate('UpdateUserDetails')}>
                    </Button>
                </View>
                <View style = {styleCSS.logout}> 
                    <Button 
                        title = 'Logout' 
                        onPress={() => navig.navigate('Home')}>
                    </Button>
                </View>
            </View>
        );    
    }
}

//keyExtractor={(item,id) => item.usr_id.toString()}

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
    logout: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
});
