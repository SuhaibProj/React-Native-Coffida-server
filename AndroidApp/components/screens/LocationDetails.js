import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'
import { ListItem, Left, Thumbnail } from 'native-base';
import { AirbnbRating } from 'react-native-elements';

/* Class that initiates a GET request to API to retrieve location Details for the 
    specific location and displays result with UI */

export default class LocationDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            locationId:'',
            locationName: '',
            locationTown: '',
            avgCleanlinessRating:'',
            avgOverallRating:'',
            avgPriceRating:'',
            latitude:'',
            longitude:'',
        };
    }

    //Run at screen load
    componentDidMount() {
        this.locationDetails();
    }

    locationDetails = async () => {
        const session = await AsyncStorage.getItem('@session_token') ;
        const lId = await AsyncStorage.getItem('@location_id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/location/'+ lId, {
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
                locationId:responseJSON.location_id,
                locationName: responseJSON.location_name,
                locationTown: responseJSON.location_town,
                avgCleanlinessRating: responseJSON.avg_clenliness_rating,
                avgOverallRating: responseJSON.avg_overall_rating,
                avgPriceRating: responseJSON.avg_price_rating,
                latitude: responseJSON.latitude,
                longitude: responseJSON.longitude
            });
        })
        .catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        const navig = this.props.navigation; 

        const count = 5;
        const reviews=['1','2','3','4','5'];
        const viewNumber=false;
        const size=20;
        const modified=true;
        const position='center';
        const space=10;

        return (
            <View style = {styleCSS.container}>
               
                <View style={styleCSS.list}>
                    <ListItem key={this.state.locationId} avatar>
                        <Left>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewLocations')}>
                                <View style={styleCSS.location}>
                                    <Thumbnail style={{alignSelf: 'center'}} source={require('../Images/H.png')}/>
                                    <Text style={{textAlign:'center'}}>{this.state.locationName}</Text>
                                    <Text style={{textAlign:'center'}}>{this.state.locationTown}</Text>
                                </View>
                            </TouchableOpacity>
                        </Left>
                        <View style = {styleCSS.textDetails}> 
                            <View style={{padding:space}}></View>
                            <Text style={styleCSS.textDetails}>Average Overall Rating:</Text>
                            <AirbnbRating defaultRating={this.state.avgOverallRating} count={count} reviews={reviews}  
                                isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                            <View style={{padding:space}}></View>

                            <Text style={styleCSS.textDetails}>Average Cleanliness Rating:</Text>
                            <AirbnbRating defaultRating={this.state.avgCleanlinessRating}  count={count} reviews={reviews} 
                                isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber} selectedColor="white" unSelectedColor="grey"/>
                            <View style={{padding:space}}></View>

                            <Text style={styleCSS.textDetails}>Average Price Rating:</Text>
                            <AirbnbRating defaultRating={this.state.avgPriceRating} count={count} reviews={reviews}
                                isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                            <View style={{padding:space}}></View>

                            <Text style={styleCSS.textDetails}>Latitude: {this.state.latitude}</Text>
                            <Text style={styleCSS.textDetails}>Longitude: {this.state.longitude}</Text>
                            <View style={{padding:space}}></View>
                        </View>
                    </ListItem>
                </View>
                <Divider borderColor="#fff" color="#fff" orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.props.navigation.navigate('FavouriteLocations')}>
                    <Text style = {styleCSS.textDetails}>Add to Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => navig.navigate('ReviewDetails')}>
                    <Text style = {styleCSS.textDetails}>Location Reviews</Text>
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
        alignSelf: 'center',
        color:'white',
    },
    textDetails: {
        textShadowRadius:5,
        fontSize: 15,
        alignSelf:'center',
        textAlign:'center',
    },
    text: {
        color:'white',
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
    location: {
        alignSelf:'center',
        textShadowRadius:5,
        marginTop:'5%',
        marginRight:20,
        borderColor:'white',
        paddingRight:10,
        borderRightWidth:1,  
    },
});
