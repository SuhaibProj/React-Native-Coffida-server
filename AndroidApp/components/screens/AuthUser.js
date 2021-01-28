import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, Image} from 'react-native'

export default class AuthHome extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Personal Home Page</Text>
                <Image source={require('../Images/bg.png')} style={styleCSS.imageConfig}/>
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
