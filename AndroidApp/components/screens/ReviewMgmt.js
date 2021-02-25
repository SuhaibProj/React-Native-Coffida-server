import React from 'react'
import { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'

/* Class that displays a management screen dedicated for reviews section in designed UI */

export default class ReviewMgmt extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const navig = this.props.navigation;
        return (
            <ScrollView style = {styleCSS.container}> 
                 <View style={{padding:20}}></View>
                <Image style={styleCSS.edit} source={require('../Images/R.png')}/>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('MyReviews')}>
                    <Text style = {styleCSS.textDetails}>My Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('AddReviewLocations')}>
                    <Text style = {styleCSS.textDetails}>Add Review</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ViewLikedReviews')}>
                    <Text style = {styleCSS.textDetails}>View Liked Reviews</Text>
                </TouchableOpacity> 
            </ScrollView>
        );    
    }
}

const styleCSS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        alignSelf: 'center',
        color:'white',
    },
    imageConfig: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    edit: {
        resizeMode:'contain',
        marginTop:10,
        marginBottom: 30,
        width:150,
        height:150,
        alignSelf: 'center',
    },
});
