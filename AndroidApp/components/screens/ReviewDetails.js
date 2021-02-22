import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid, FlatList} from 'react-native'
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

    componentDidMount() {
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
            console.log('The Review Details are:', this.state.reviewDetails);
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() { 
        let like = async(review_id) =>{
            await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
            console.log("The review ID is: ",review_id);
            this.props.navigation.navigate('LikeReview');
        };
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}>
                <Text style={styleCSS.title}>Review Details: </Text>
                
                <FlatList
                    data={this.state.reviewDetails}
                    keyExtractor={item => item.review_id.toString()}
                    renderItem={({item}) => (  
                        <View style={styleCSS.list}>
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
                                <Right>
                                    <TouchableOpacity onPress={() => like(item.review_id)}>
                                        <Image
                                            style={styleCSS.likes}
                                            resizeMode='contain'
                                            source={ require('../Images/T.png')}
                                        />
                                    </TouchableOpacity>   
                                </Right>
                            </ListItem>
                        </View>
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
        backgroundColor: '#282828',
        
    },
    title: {
        marginVertical: 30,
        fontSize: 20,
        alignSelf: 'center',
        color:'white',
    },
    textDetails: {
        alignSelf: 'center',
        textShadowRadius:5,
        fontSize: 15,
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
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
        marginBottom: '20%',
    },
    /* like: {
        width: '200%',
        backgroundColor: "#3399FF",
        justifyContent:'center',
        alignSelf: 'center',
        borderRadius:40,
    }, */
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        padding: 5,
        borderRadius:10,
    },
    location: {
        alignSelf:'center',
        textShadowRadius:5,
        marginRight:10,
        marginBottom:15,
        borderColor:'white',
        paddingRight:20,
        borderRightWidth:1,  
    },
    likes: {
        width:20,
        height:20,
    },
});
