import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid , Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class LocationDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            notfollowing: true,
            like: "Remove from Favourites",
            normal: "Add to Favourites",
            reviewDetails:[],
            locationDetails:[],
            location_id:'',
            location_name: '',
            location_town: '',
            avg_clenliness_rating:'',
            avg_overall_rating:'',
            avg_price_rating:'',
            latitude:'',
            longitude:'',
            location_reviews:{
                review_id:'',
                review_body:'',
                clenliness_rating:'',
                likes:'',
                price_rating:'',
                quality_rating:''
            }
        }
    }

    componentDidMount = async() => {
        this.locationDetails();
    }

    

    locationDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token') 
        const location_id = await AsyncStorage.getItem('@location_id')  
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
                locationDetails: responseJSON,
                location_id:responseJSON.location_id,
                location_name: responseJSON.location_name,
                location_town: responseJSON.location_town,
                avg_clenliness_rating: responseJSON.avg_clenliness_rating,
                avg_overall_rating: responseJSON.avg_overall_rating,
                avg_price_rating: responseJSON.avg_price_rating,
                latitude: responseJSON.latitude,
                longitude: responseJSON.longitude
            })
            this.setState({
                reviewDetails: responseJSON.location_reviews.map(reviews => ({
                    review_id: reviews.review_id,
                    review_body: reviews.review_body,
                    clenliness_rating:reviews.clenliness_rating,
                    likes:reviews.likes,
                    price_rating:reviews.price_rating,
                    quality_rating:reviews.quality_rating,
                }))    
            })
            this.state.locationDetails.toString()
            console.log('The Location Details are:', this.state.locationDetails )
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    following = async() => {
        
        this.setState({
            notFollowing: !(this.state.notFollowing)
        })
        
        console.log("The User is currently Follwing Location: ",this.state.notFollowing)
    };

    render() {
        
        
        const navig = this.props.navigation; 
        return (
            <View style = {styleCSS.container}>
                <Text style={styleCSS.title}>Location Details: </Text>
                <View style = {styleCSS.textDetails}>
                    <Text>Location: {this.state.location_name}</Text>
                    <Text>Town: {this.state.location_town}</Text>
                    <Text>Average Cleanliness Rating: {this.state.avg_clenliness_rating}</Text>
                    <Text>Average Overall Rating: {this.state.avg_overall_rating}</Text>
                    <Text>Average Price Rating: {this.state.avg_price_rating}</Text>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                </View> 
                
                <Text style={styleCSS.title}>Review Details: </Text>
                <View style = {styleCSS.textDetails}>
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
                </View>
                    <TouchableOpacity  style = {styleCSS.button} onPress={() => this.following()}>
                        <Text style = {styleCSS.textDetails}>{this.state.notFollowing ? this.state.like : this.state.normal }</Text>
                    </TouchableOpacity>
                    <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                    <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('AuthUser')}>
                        <Text style = {styleCSS.textDetails}>Home</Text>
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
        marginVertical: 40,
        width: '75%', 
        backgroundColor: "#808080",
        padding: 10,
    },
});
