import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet} from 'react-native'

export default class UserMgmt extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Account</Text>
                <Text style ={styleCSS.text}>My Details:</Text>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Update Account Details' 
                        onPress={() => navig.navigate('UpdateUserDetails')}>
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
