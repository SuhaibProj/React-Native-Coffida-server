import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default class Home extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>CoffiDa Home Page</Text>
                <View style = {styleCSS.spacer}> 
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
        marginVertical: 40,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },

});
