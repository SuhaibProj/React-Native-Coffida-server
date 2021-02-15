import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddReview extends Component {
    constructor (props) {
        super(props)

        this.state = {
            overallRating: '',
            priceRating: '',
            qualityRating: '',
            clenlinessRating: '',
            comments: '',
        };
    }

    addReview = async() => {
        let database_info = {
            overallRating: this.state.overallRating,
            priceRating: this.state.priceRating,
            qualityRating: this.state.qualityRating,
            clenlinessRating: this.state.clenlinessRating,
            comments: this.state.comments
        }
        
        const session = await AsyncStorage.getItem('@session_token') ;
        const location_id = await AsyncStorage.getItem('@location_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ location_id+'/review', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info),
        })
        .then((response) => {
            if(response.status === 201) { return response.json(); }
            else if (response.status === 400){ throw "Sorry couldnt connect"; }
            else{ throw 'Something didnt work'; }
        })
        .then((responseJSON) => {
            console.log("Review ID Created: ", responseJSON)
            ToastAndroid.show("User Creation Successful",ToastAndroid.SHORT)
            this.props.navigation.navigate("AuthUser")
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show(error, ToastAndroid.SHORT)
        });
    };

    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>Add Your Review</Text>
                <TextInput style = {styleCSS.input} placeholder={'Your Overall Rating?'} 
                    onChangeText = {(overallRating) => this.setState({overallRating})} value={this.state.overallRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Price?'}
                    onChangeText = {(priceRating) => this.setState({priceRating})} value={this.state.priceRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Quality?'}
                    onChangeText = {(qualityRating) => this.setState({qualityRating})} value={this.state.qualityRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Hygiene?'}
                    onChangeText = {(clenlinessRating) => this.setState({clenlinessRating})} value={this.state.clenlinessRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(comments) => this.setState({comments})} value={this.state.comments}
                />
                <Divider color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.addReview()}>
                    <Text style = {styleCSS.textDetails}>Submit</Text>
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
        textAlign: 'center',
    },
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.20)',
        marginVertical: 10,
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#808080",
        padding: 10,
    },
    textDetails: {
        alignSelf: 'center',
    },

});
