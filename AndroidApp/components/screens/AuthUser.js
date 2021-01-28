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
            <ImageBackground source={require('../Images/bg.png')} style={styleCSS.imagePos}>
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <View style = {styleCSS.spacer}> 
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
    spacer: {
        flex: 1,
        marginVertical: 20,
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    imagePos: {
        width: '100%',
        height: '95%',
    },
});
