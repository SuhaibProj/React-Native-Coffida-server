import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, BackHandler} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthUser extends Component {
    constructor (props) {
        super(props)

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    }

    handleBackButtonClick() {
        return true;
    }
    
    /* logout = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
            method: 'post',
            headers: {'X-Authorization': session,}, 
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 401){ throw "Unauthorized"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { throw 'Something didnt work'; }
        })
        .then(async(responseJSON) => {
            console.log(responseJSON);
            await AsyncStorage.removeItem('@session_token')
            ToastAndroid.show("Successively Logged-Out",ToastAndroid.SHORT);
            this.props.navigation.navigate("Home");
        })
    } */ 

    /*  logout = async () => {
        await AsyncStorage.removeItem('@session_token')
        this.props.navigation.navigate('Home')
    } */

    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <Image source={require('../Images/bg.png')} style={styleCSS.imageConfig}/>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'My Account' onPress={() => navig.navigate('MyAccount')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'Search Reviews' onPress={() => navig.navigate('Reviews')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'Review Management' onPress={() => navig.navigate('ReviewMgmt')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'Locations' onPress={() => navig.navigate('Locations')}/>
                </View>
                <View style = {styleCSS.logout}> 
                    <Button title = 'Logout' onPress={() => navig.navigate('Logout')}/>
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
