import React from 'react'
import { Text, View, Button, Alert, TouchableOpacity, TextInput } from 'react-native'

const About = ({navigation}) => {
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
            <Text style={{fontSize: 20}}>CoffiDa About Page</Text>
            <Button 
                title = 'Back' 
                onPress={() => navigation.navigate('Home')}>
            </Button>
        </View>
    )
}

export default About