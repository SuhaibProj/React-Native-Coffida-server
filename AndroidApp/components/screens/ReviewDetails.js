import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Divider from 'react-native-divider'
import { ListItem, Body, Left, Thumbnail, Right, Header} from 'native-base';

export default class ReviewDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
            
            arrow:'.',
            notfollowing: true,
            like: "Remove from Favourites",
            normal: "Add to Favourites",

            reviewDetails:[],
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
                reviewDetails: responseJSON.location_reviews
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
                
                <FlatList
                    data={this.state.reviewDetails}
                    keyExtractor={item => item.review_id.toString()}
                    renderItem={({item}) => (  
                        <ListItem key={item.review_id} avatar>
                            <Body>
                                <Text>Review ID: {item.review_id}</Text>
                                <Text>Overall Rating: {item.overall_rating}</Text>
                                <Text>Cleanliness Rating: {item.clenliness_rating}</Text>
                                <Text>Likes: {item.likes}</Text>
                                <Text>Price Rating: {item.price_rating}</Text>
                                <Text>Quality Rating: {item.quality_rating}</Text>
                                <Text>Details: {item.review_body}</Text>
                            </Body>
                            <Right style={{padding:40, marginRight: 20, marginTop: 10}}>
                                <TouchableOpacity  style = {styleCSS.like}>
                                    <Text style = {styleCSS.textDetails}>Like</Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )}    
                />
                <Divider color="#fff" orientation="center"></Divider>
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
        width: '50%', 
        backgroundColor: "#808080",
        padding: 10,
        marginBottom: '20%',
        borderRadius:40,
    },
    like: {
        width: '200%',
        backgroundColor: "#3399FF",
        justifyContent:'center',
        alignSelf: 'center',
        borderRadius:40,
    }
});
