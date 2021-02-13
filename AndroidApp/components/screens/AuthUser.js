import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, BackHandler} from 'react-native'

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

    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <Image source={require('../Images/BG.png')} style={styleCSS.imageConfig}/>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'My Account' onPress={() => navig.navigate('MyAccount')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'View Reviews' onPress={() => navig.navigate('Reviews')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'View Locations' onPress={() => navig.navigate('Locations')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button title = 'Review Management' onPress={() => navig.navigate('ReviewMgmt')}/>
                </View>
                <View style = {styleCSS.buttonGeneric}> 
                    <Button title = 'Location Management' onPress={() => navig.navigate('LocationMgmt')}/>
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
