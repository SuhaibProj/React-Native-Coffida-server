import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocationDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            locationDetails:[],
            location_name: '',
            location_town: '',
            avg_clenliness_rating:'',
            avg_overall_rating:'',
            avg_price_rating:'',
            latitude:'',
            longitude:'',
            location_reviews:'',
        }
    }

    componentDidMount = async() => {
        this.getLocations();
    }


    getLocations = async () => {
        const session = await AsyncStorage.getItem('@session_token')  
        //const location_id = this.props.navigation.state.params.LID
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
                location_name: responseJSON.location_name,
                location_town: responseJSON.location_town,
                avg_clenliness_rating: responseJSON.avg_clenliness_rating,
                avg_overall_rating: responseJSON.avg_overall_rating,
                avg_price_rating: responseJSON.avg_price_rating,
                latitude: responseJSON.latitude,
                longitude: responseJSON.longitude
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

    render() {
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
                <FlatList
                    data={this.state.locationDetails}
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
                    keyExtractor={item => item.location_name}   
                />
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
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
    },
    hearts: {
        justifyContent: 'center', 
        width: 20, 
        height: 20,
    }
});
