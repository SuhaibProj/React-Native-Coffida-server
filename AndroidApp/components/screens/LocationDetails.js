import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'

export default class LocationDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            notFollowing: true,

            location_id:'',
            location_name: '',
            location_town: '',
            avg_clenliness_rating:'',
            avg_overall_rating:'',
            avg_price_rating:'',
            latitude:'',
            longitude:'',
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
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .then((responseJSON) => {
            this.setState({
                location_id:responseJSON.location_id,
                location_name: responseJSON.location_name,
                location_town: responseJSON.location_town,
                avg_clenliness_rating: responseJSON.avg_clenliness_rating,
                avg_overall_rating: responseJSON.avg_overall_rating,
                avg_price_rating: responseJSON.avg_price_rating,
                latitude: responseJSON.latitude,
                longitude: responseJSON.longitude
            });
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    changeFavourites = async() => {
        const newState = !this.state.notFollowing;
        const {notFollowing} = this.state;
        this.setState({
            notFollowing:newState,
        });
        console.log("The User is currently Follwing Location: ",this.state.notFollowing);
        notFollowing?this._Following():this._notFollowing();
    }

    _Following = () => {
        this.props.navigation.navigate('FavouriteLocations');
    }

    _notFollowing = () => {
        this.props.navigation.navigate('RemoveFavouriteLocations');
    }

    render() {
        const navig = this.props.navigation; 
        const {notFollowing} = this.state;
        const textFollowing = notFollowing?"Add to Favourites":"Remove from Favourites";
        return (
            <View style = {styleCSS.container}>
                <Text style={styleCSS.title}>Location Details: </Text>
                <View style = {styleCSS.textDetails}>
                    <Text>Location ID: {this.state.location_id}</Text>
                    <Text>Location: {this.state.location_name}</Text>
                    <Text>Town: {this.state.location_town}</Text>
                    <Text>Average Cleanliness Rating: {this.state.avg_clenliness_rating}</Text>
                    <Text>Average Overall Rating: {this.state.avg_overall_rating}</Text>
                    <Text>Average Price Rating: {this.state.avg_price_rating}</Text>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                </View> 

                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.changeFavourites()}>
                        <Text style = {styleCSS.textDetails}>{textFollowing}</Text>
                </TouchableOpacity>

                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ReviewDetails')}>
                        <Text style = {styleCSS.textDetails}>Reviews</Text>
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
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#6666FF",
        padding: 10,
        borderRadius:40,
    },
});
