import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import Divider from 'react-native-divider'

/* Class that displays the immediate Logged-in Menu once authorised as a result with UI */

export default class AuthUser extends Component {
    constructor (props) {
        super(props)
        //Disable Back button to not allow user to get back to the login page.
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    
    //Run at screen load
    componentDidMount() {
        //Disable Back button to not allow user to get back to the login page.
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    //Disable Back button to not allow user to get back to the login page.
    handleBackButtonClick() { return true; }

    render() {
        const navig = this.props.navigation;
        return (
            <ScrollView style = {styleCSS.container}> 
               
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
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ViewGeoLocation')}>
                    <Text style = {styleCSS.textDetails}>View Map</Text>
                </TouchableOpacity>
                <Divider color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('Logout')}>
                    <Text style = {styleCSS.textDetails}>Logout</Text>
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
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    imageConfig: {
        marginBottom: 20,
        width:175,
        height:175,
        alignSelf: 'center',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },

});
