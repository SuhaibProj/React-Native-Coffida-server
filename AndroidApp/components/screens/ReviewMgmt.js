import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet} from 'react-native'

export default class ReviewMgmt extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Review Management</Text>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Add Review' 
                        onPress={() => navig.navigate('AddReview')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Update Review' 
                        onPress={() => navig.navigate('UpdateReview')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Delete Review' 
                        onPress={() => navig.navigate('DeleteReview')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Search Review Photo(s)' 
                        onPress={() => navig.navigate('SearchReviewPhoto')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Add Review Photo(s)' 
                        onPress={() => navig.navigate('AddReviewPhoto')}>
                    </Button>
                </View>
                <View style = {styleCSS.buttonGeneric}>
                    <Button 
                        title = 'Delete Review Photo(s)' 
                        onPress={() => navig.navigate('DeleteReviewPhoto')}>
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
    text: {
        marginVertical: 25,
        fontSize: 15,
        textAlign: 'center',
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
