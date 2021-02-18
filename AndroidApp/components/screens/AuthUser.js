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
                <View style={{marginVertical:30}}>
                    <Image source={require('../Images/BG.png')} style={styleCSS.imageConfig}/>
                </View>
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
        backgroundColor: '#282828',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        alignSelf: 'center',
        color:'white',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    imageConfig: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },

});
