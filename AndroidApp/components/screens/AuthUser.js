import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, BackHandler} from 'react-native'
import Divider from 'react-native-divider'

export default class AuthUser extends Component {
    constructor (props) {
        super(props)

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        return true;
    }

    render() {
        
        const navig = this.props.navigation;

        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <Image source={require('../Images/BG.png')} style={styleCSS.imageConfig}/>
                
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('MyAccount')}>
                    <Text style = {styleCSS.textDetails}>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ReviewMgmt')}>
                    <Text style = {styleCSS.textDetails}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ViewLocations')}>
                    <Text style = {styleCSS.textDetails}>Locations</Text>
                </TouchableOpacity>
                <Divider color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('Logout')}>
                    <Text style = {styleCSS.textDetails}>Logout</Text>
                </TouchableOpacity>

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
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#6666FF",
        padding: 10,
        borderRadius:40,
    },
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    textDetails: {
        alignSelf: 'center',
    },

});
