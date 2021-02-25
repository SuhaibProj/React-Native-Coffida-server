import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-elements';

/* Class that initiates a POST request to API to create a user review and displays result with UI*/

export default class AddReview extends Component {
    constructor (props) {
        super(props)

        this.state = {
            reviewBody: '',
            overallRating:'',
            clenlinessRating: '',
            priceRating: '',
            qualityRating: '',
        };
    }

    addReview = async() => {
        let database_info = {
            overall_rating: parseInt(this.state.overallRating),
            price_rating: parseInt(this.state.priceRating),
            quality_rating: parseInt(this.state.qualityRating),
            clenliness_rating: parseInt(this.state.clenlinessRating),
            review_body: this.state.reviewBody,
        };
        
        const session = await AsyncStorage.getItem('@session_token') ;
        const lId = await AsyncStorage.getItem('@location_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+lId+'/review', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info),
        })
        
        //Response on success + Error Handling + Return to previous page once completed
        .then((response) => {
            if(response.status === 201) {
                this.props.navigation.navigate('MyReviews'); 
                throw "Review Added"; 
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    };

    
    render() {

        const count = 5;
        const reviews=['1','2','3','4','5'];
        const viewNumber=false;
        const size=20;
        const modified=false;
        const position='center';
        const space=20;

        return (
            <View style = { styleCSS.container }> 
                <View style={{padding:space}}></View>
                <Text style={styleCSS.textDetails}>Your Overall Rating?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={null} onFinishRating={(overallRating) => this.setState({overallRating})} isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Rating for Price?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={null} onFinishRating={(priceRating) => this.setState({priceRating})} isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Rating for Quality?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={null} onFinishRating={(qualityRating) => this.setState({qualityRating})} isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>

                <Text style={styleCSS.textDetails}>Your Rating for Hygiene?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={null} onFinishRating={(clenlinessRating) => this.setState({clenlinessRating})} isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Review?</Text>
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(reviewBody) => this.setState({reviewBody})} 
                    value={this.state.review_body} placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                />
                <View style={{padding:space}}></View>

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
        backgroundColor: '#282828',
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        textAlign: 'center',
        color:'white',
    },
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: '#404040',
        marginVertical: 10,
        alignSelf: 'center',
        color:'white',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    textDetails: {
        alignSelf: 'center',
        color: 'white',
        textShadowColor:'black',
        textShadowRadius:5,
        fontSize: 15,
    },

});
