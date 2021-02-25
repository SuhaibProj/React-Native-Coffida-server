import React from 'react';
import { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Left,Thumbnail } from 'native-base';
import Divider from 'react-native-divider'

/* Class that initiates a GET request to API to retireve the users personal details and displays result with UI */

export default class MyAccount extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uId: '',
            fName: '',
            lName: '',
            email: '',
            listDetails: [],
        }
    }
    //Run at screen load
    componentDidMount() {
        this.getDetails();
        //refresh page once updated
        this.refresh = this.props.navigation.addListener('focus', () => { this.getDetails(); });
    }

    componentWillUnmount(){
        this.refresh();
    }

    //get token, and user id from async storage.
    getDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token');
        const uId = await AsyncStorage.getItem('@id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ uId, {
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
            
            this.setState({
                uId: responseJSON.user_id,
                email: responseJSON.email,  
                fName: responseJSON.first_name,
                lName: responseJSON.last_name,
            });
        })
        .catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
               
                <View style={styleCSS.list}>
                    <ListItem key={this.state.uId} avatar>
                        <Left>
                            <Thumbnail style={styleCSS.location} source={require('../Images/UG.png')}/>
                        </Left>
                            <View style = {styleCSS.textDetails}>  
                                <Text style = {styleCSS.textDetails}>My Details:</Text>   
                                <View style = {{marginVertical:5}}></View>
                                <Text style = {styleCSS.textDetails}>First Name: {this.state.fName}</Text>
                                <Text style = {styleCSS.textDetails}>Last Name: {this.state.lName}</Text>
                                <Text style = {styleCSS.textDetails}>Email: {this.state.email}</Text>
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
        padding: 20,
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
