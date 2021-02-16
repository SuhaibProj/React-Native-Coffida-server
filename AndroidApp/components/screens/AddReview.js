import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddReview extends Component {
    constructor (props) {
        super(props)

        this.state = {
            review_body: '',
            overall_rating:'',
            clenliness_rating: '',
            price_rating: '',
            quality_rating: '',
        };
    }

    addReview = async() => {
        let database_info = {
            review_body: this.state.review_body,
            clenliness_rating: parseInt(this.state.clenliness_rating),
            price_rating: parseInt(this.state.price_rating),
            quality_rating: parseInt(this.state.quality_rating),
            overall_rating: parseInt(this.state.overall_rating),
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
            else if (response.status === 400) { throw "Bad Request";}
            else if (response.status === 401){ throw "Unauthorised" ;}
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500) { throw "Server Error";}
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .then((responseJSON) => {
            console.log("Review ID Created: ", responseJSON)
            ToastAndroid.show("Review Added",ToastAndroid.SHORT)
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show(error, ToastAndroid.SHORT)
        });
    };

    render() {
        return (
            <View style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>Add Your Review</Text>
                <TextInput style = {styleCSS.input} placeholder={'Your Overall Rating?'} 
                    onChangeText = {(overall_rating) => this.setState({overall_rating})} 
                    value={this.state.overall_rating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Price?'}
                    onChangeText = {(price_rating) => this.setState({price_rating})} 
                    value={this.state.price_rating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Quality?'}
                    onChangeText = {(quality_rating) => this.setState({quality_rating})} 
                    value={this.state.quality_rating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Hygiene?'}
                    onChangeText = {(clenliness_rating) => this.setState({clenliness_rating})} 
                    value={this.state.clenliness_rating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(review_body) => this.setState({review_body})} 
                    value={this.state.review_body}
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
        width: '50%', 
        backgroundColor: "#808080",
        padding: 10,
        borderRadius:40,
    },
    textDetails: {
        alignSelf: 'center',
    },

});
