import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

/* Class that initiates both a GET and UPDATE request to API to first pre-populate the data with 
    the users current details and then upon change, update the user details and displays result with UI */

export default class UpdateDeails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            uId:'',
            fName: '',
            lName: '',
            email: '',
            pass: '',
        };
    }

    componentDidMount(){
        this.getDetails();
    }

    getDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        const uId = await AsyncStorage.getItem('@id')
        console.log("Session Variable: " + session)
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ uId, {
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
                uId: responseJSON.user_id,
                email: responseJSON.email,  
                fName: responseJSON.first_name,
                lName: responseJSON.last_name,
            });
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    onUpdate  = async () => {
        let database_info = {
            first_name: this.state.fName,
            last_name: this.state.lName,
            email: this.state.email,
            password: this.state.pass,
        };

        //Retireve User ID + session token from async storage for PATCH (Update) Request.
        const session = await AsyncStorage.getItem('@session_token');
        const uId = await AsyncStorage.getItem('@id');
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+ uId, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info)
        })
        .then((response) => {
            if(response.status === 200) { 
                this.props.navigation.navigate("MyAccount");
                ToastAndroid.show("Details Updated",ToastAndroid.SHORT); 
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
            <ScrollView style = { styleCSS.container }> 
                 <View style={{padding:20}}></View>
                <Image style={styleCSS.edit} source={require('../Images/UG.png')}/>
                <View>
                    <TextInput style = {[styleCSS.input]} placeholder={'Email'} 
                        onChangeText = {(email) => this.setState({email})} 
                        value={this.state.email} 
                        placeholderTextColor='grey'   
                    />
                    <TextInput style = {styleCSS.input} placeholder={'First Name'}  
                        onChangeText = {(fName) => this.setState({fName})} 
                        value={this.state.fName} 
                        placeholderTextColor='grey' 
                    />
                    <TextInput style = {styleCSS.input} placeholder={'Last Name'} 
                        onChangeText = {(lName) => this.setState({lName})} 
                        value={this.state.lName}  
                        placeholderTextColor='grey'  
                    />
                    <TextInput style = {styleCSS.input} placeholder={'Password'} secureTextEntry = {true} 
                        onChangeText = {(pass) => this.setState({pass})} 
                        value={this.state.pass} 
                        placeholderTextColor='grey' 
                    />
                </View>    
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.onUpdate()}>
                    <Text style = {styleCSS.textDetails}>Update</Text>
                </TouchableOpacity>
            </ScrollView>
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
        backgroundColor: '#404040',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        marginVertical: 10,
        alignSelf: 'center',
        color:'white',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
        marginBottom:30,
    },
    edit: {
        resizeMode:'contain',
        marginTop:10,
        marginBottom:20,
        width:150,
        height:150,
        alignSelf: 'center',
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
