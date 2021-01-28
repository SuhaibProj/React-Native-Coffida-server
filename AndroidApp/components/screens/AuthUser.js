import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, ImageBackground} from 'react-native'

export default class AuthHome extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <ImageBackground source={require('../Images/bg.png')} style={styleCSS.imageConfig}>
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'My Account' 
                        onPress={() => navig.navigate('UserMgmt')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Review Management' 
                        onPress={() => navig.navigate('ReviewMgmt')}>
                    </Button>
                </View>
                <View style = {styleCSS.logout}> 
                    <Button 
                        title = 'Logout' 
                        onPress={() => navig.navigate('Home')}>
                    </Button>
                </View>
            </View>
            </ImageBackground>
        );    
    }
}

const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
    },
    text: {
        fontSize: 15,
    },
    buttonGeneric: {
        marginVertical: 10,
        width: '80%',
        alignSelf: 'center',
    },
    imageConfig: {
        width: '100%',
        height: '100%',
    },
    logout: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        width: '80%',
        alignSelf: 'center',
    },
});