import React from 'react'
import { Text, View, Button, Alert, TouchableOpacity, TextInput } from 'react-native'

const Login = ({navigation}) => {
    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
            <Text style={{fontSize: 30}}>CoffiDa Login Page</Text>
            <Button 
                title = 'Login' 
                onPress={() => navigation.navigate('Home')}>
            </Button>
        </View>
    )
}

export default Login