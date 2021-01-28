import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, Image} from 'react-native'

export default class Home extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}>
                <Text style ={styleCSS.title}>CoffiDa Home Page</Text>
                <Image source={require('../Images/bg.png')} style={styleCSS.imageConfig}/> 
                <Text style ={styleCSS.text}>This is THE platform for reviews 
                    {"\n"}on the best local coffee spots.</Text>
                <View style = {styleCSS.signIn}> 
                    <Button 
                        title = 'Sign In' 
                        onPress={() => navig.navigate('Login')}>
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
        textAlign: 'center',
    },
    text: {
        marginVertical: 25,
        fontSize: 15,
        textAlign: 'center',
    },
    signIn: {
        marginVertical: '50%',
        width: '75%',
        alignSelf: 'center',
    },
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
});
