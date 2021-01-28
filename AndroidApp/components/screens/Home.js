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
                <Image source={require('../Images/bg.png')} style={styleCSS.imagePos}/> 
                <Text style ={styleCSS.text}>CoffiDa is a platform for reviewing 
                    {"\n"}the best local coffee spots. 
                    {"\n"}Anybody can use CoffiDa for finding 
                    {"\n"}the best local Café’s, but Users 
                    {"\n"}who sign up for an account 
                    {"\n"}can also publish reviews. 
                    {"\n"}Reviews consist of a series of ratings 
                    {"\n"}(e.g. quality, price, cleanliness) 
                    {"\n"}along with a short body of text 
                    {"\n"}for describing their experience. 
                    {"\n"}Users can also comment on, 
                    {"\n"}and ‘like’ other reviews.</Text>
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
        backgroundColor: '#cccccc',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
    },
    signIn: {
        marginVertical: 100,
        width: '80%',
        alignSelf: 'center',
    },
    imagePos: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
});
