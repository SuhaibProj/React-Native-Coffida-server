import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

const Home = ({ navigation }) => {
    return (
        <View style = {styleCSS.container}> 
            <Text style ={styleCSS.title}>CoffiDa Home Page</Text>
            <Button 
                title = 'Sign In' 
                onPress={() => navigation.navigate('Login')}>
            </Button>
            <Button 
                title = 'About' 
                onPress={() => navigation.navigate('About')}>
            </Button>
        </View>
    );
};

const styleCSS = StyleSheet.create({
    title: {
        flex: 0.92,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 20,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        marginHorizontal: 16,
    },
  });
  

export default Home
