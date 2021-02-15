import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class ReviewDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {

            notfollowing: true,
            like: "Remove from Favourites",
            normal: "Add to Favourites",

            reviewDetails:[],
            location_reviews:{
                review_id:'',
                review_body:'',
                clenliness_rating:'',
                likes:'',
                price_rating:'',
                quality_rating:''
            }
        };
    }

    componentDidMount = async() => {
        this.locationDetails();
    }

    

    locationDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token') ;
        const location_id = await AsyncStorage.getItem('@location_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ location_id, {
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
        })

        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 500){ throw "Server Error"; }
            else{ throw 'Something didnt work'; }
        })
        .then((responseJSON) => {
            this.setState({
                reviewDetails: responseJSON.location_reviews.map(reviews => ({
                    review_id: reviews.review_id,
                    review_body: reviews.review_body,
                    clenliness_rating:reviews.clenliness_rating,
                    likes:reviews.likes,
                    price_rating:reviews.price_rating,
                    quality_rating:reviews.quality_rating,
                }))    
            });
            console.log('The Review Details are:', this.state.reviewDetails )
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() { 
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}>
                <Text style={styleCSS.title}>Review Details: </Text>
                <ScrollView style = {styleCSS.textDetails}>
                    {this.state.reviewDetails.map(item => 
                        <Text style = {{color: 'red'}} key={item.review_id}>
                            Review ID: {item.review_id}{"\n"}
                            Review: {item.review_body}{"\n"}
                            Cleanliness Rating: {item.clenliness_rating}{"\n"}
                            Likes: {item.likes}{"\n"}
                            Price Rating: {item.price_rating}{"\n"}
                            Quality Rating: {item.quality_rating}{"\n"}
                        </Text>
                    )}
                </ScrollView>
                
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('AddReview')}>
                        <Text style = {styleCSS.textDetails}>Add Review</Text>
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
    textDetails: {
        alignSelf: 'center',
    },
    home: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '75%', 
        backgroundColor: "#808080",
        padding: 10,
        marginBottom: 20,
    },
});
