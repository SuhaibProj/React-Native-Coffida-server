import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ToastAndroid , Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from 'native-base';

export default class LocationDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
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

    /* <FlatList
        data={this.state.locationDeetails}
        renderItem={({item}) => (  
            <View>
                <Text style = {styleCSS.textDetails}>Location: {item.location_name}</Text>
                <Text style = {styleCSS.textDetails}>Town: {item.location_town}</Text>
                <Text style = {styleCSS.textDetails}>Average Cleanliness Rating: {item.avg_clenliness_rating}</Text>
                <Text style = {styleCSS.textDetails}>Average Overall Rating: {item.avg_overall_rating}</Text>
                <Text style = {styleCSS.textDetails}>Average Price Rating: {item.avg_price_rating}</Text>
                <Text style = {styleCSS.textDetails}>Latitude: {item.latitude}</Text>
                <Text style = {styleCSS.textDetails}>Longitude: {item.longitude}</Text>
            </View>
        )}
        keyExtractor={item => item.location_id.toString()}   
    /> */

    /* render() {
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>View Location Details</Text>
                <Text style = {styleCSS.textDetails}>Location: {this.state.location_name}</Text>
                <Text style = {styleCSS.textDetails}>Town: {this.state.location_town}</Text>
                <Text style = {styleCSS.textDetails}>Average Cleanliness Rating: {this.state.avg_clenliness_rating}</Text>
                <Text style = {styleCSS.textDetails}>Average Overall Rating: {this.state.avg_overall_rating}</Text>
                <Text style = {styleCSS.textDetails}>Average Price Rating: {this.state.avg_price_rating}</Text>
                <Text style = {styleCSS.textDetails}>Latitude: {this.state.latitude}</Text>
                <Text style = {styleCSS.textDetails}>Longitude: {this.state.longitude}</Text>
            </View>
        );
    } */

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
                            clenliness_rating: {item.clenliness_rating}{"\n"}
                            likes: {item.likes}{"\n"}
                            price_rating: {item.price_rating}{"\n"}
                            quality_rating: {item.quality_rating}{"\n"}
                        </Text>
                    )}
                </View>
                <View style = {styleCSS.Home}>
                    <Button title = 'Home' onPress={() => navig.navigate('AuthUser')}/>
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
    textDetails: {
        alignSelf: 'center',
    },
    Home: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
});
