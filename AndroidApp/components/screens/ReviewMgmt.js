import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import Divider from 'react-native-divider'

export default class ReviewMgmt extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>Welcome to your Review Management</Text>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('MyReviews')}>
                    <Text style = {styleCSS.textDetails}>My Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('AddReviewLocations')}>
                    <Text style = {styleCSS.textDetails}>Add Review</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('SearchReviewPhoto')}>
                    <Text style = {styleCSS.textDetails}>Search Review Photo(s)</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('AddReviewPhoto')}>
                    <Text style = {styleCSS.textDetails}>Add Review Photo(s)</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('DeleteReviewPhoto')}>
                    <Text style = {styleCSS.textDetails}>Delete Review Photo(s)</Text>
                </TouchableOpacity>
                
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
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    textDetails: {
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#6666FF",
        padding: 10,
        borderRadius:40,
    },
});
