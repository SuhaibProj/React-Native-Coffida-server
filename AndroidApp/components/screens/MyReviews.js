import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, FlatList, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right} from 'native-base';

export default class MyReviews extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reviewDetails:[],
        };
    }

    componentDidMount() {
        this.myReviews();
    }

    myReviews = async () => {
        const session = await AsyncStorage.getItem('@session_token') ;
        const id = await AsyncStorage.getItem('@id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ id, {
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
                reviewDetails: responseJSON
            });
            console.log('Your Personal Reviews:', this.state.reviewDetails);
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() { 
        let bin = async(review_id, location_id) => {
            await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
            await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
            console.log("My Review ID:" , review_id);
            console.log("My Location ID:" , location_id);
            this.props.navigation.navigate('DeleteReview');
        };

        let img = async(review_id, location_id) => {
            await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
            await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
            console.log("My Review ID:" , review_id);
            console.log("My Location ID:" , location_id);
            this.props.navigation.navigate('ViewReviewPhoto');
        };

        let cam = (item) => {
            this.props.navigation.navigate('AddReviewPhoto', {'review':item});
        }
    
        let update = (item) => {
            this.props.navigation.navigate('UpdateReview', {'review':item});
        };
        
        return (
            <View style = {styleCSS.container}>
                <Text style={ styleCSS.title }>View All Reviews</Text>
                <FlatList
                    data={this.state.reviewDetails.reviews}
                    keyExtractor={item => item.review.review_id.toString()}
                    renderItem={({item}) => (  
                        <View style={styleCSS.list}>    
                            <ListItem key={item.review.review_id} key={item.location.location_id} avatar>
                                <Left>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewLocations')}>
                                        <View style={styleCSS.location}>
                                            <Thumbnail style={{alignSelf:'center'}} source={require('../Images/H.png')}/>
                                            <Text style={{textAlign:'center'}}>{item.location.location_name}</Text>
                                            <Text style={{textAlign:'center'}}>{item.location.location_town}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Left>
                                <Body>
                                    <Text style={styleCSS.textDetails}>Overall Rating: {item.review.overall_rating}</Text>
                                    <Text style={styleCSS.textDetails}>Cleanliness Rating: {item.review.clenliness_rating}</Text>
                                    <Text style={styleCSS.textDetails}>Price Rating: {item.review.price_rating}</Text>
                                    <Text style={styleCSS.textDetails}>Quality Rating: {item.review.quality_rating}</Text>
                                    <Text style={styleCSS.textDetails}>Likes: {item.review.likes}</Text>
                                    <Text style={styleCSS.textDetails}>Details: {item.review.review_body}</Text>
                                </Body>
                                <Right>
                                    <TouchableOpacity onPress={() => update(item)}>
                                        <Image
                                            style={styleCSS.icons}
                                            resizeMode='contain'
                                            source={ require('../Images/E.png')}
                                        />
                                    </TouchableOpacity>
                                    <View style ={{padding:5}}></View>
                                    <TouchableOpacity onPress={() => bin(item.review.review_id, item.location.location_id)}>
                                        <Image
                                            style={styleCSS.icons}
                                            resizeMode='contain'
                                            source={ require('../Images/D.png')}
                                        />
                                    </TouchableOpacity>
                                    <View style ={{padding:5}}></View>
                                    <TouchableOpacity onPress={() => cam(item)}>
                                        <Image
                                            style={styleCSS.icons}
                                            resizeMode='contain'
                                            source={ require('../Images/C.png')}
                                        />
                                    </TouchableOpacity>
                                    <View style ={{padding:5}}></View>
                                    <TouchableOpacity onPress={() => img(item.review.review_id, item.location.location_id)}>
                                        <Image
                                            style={styleCSS.icons}
                                            resizeMode='contain'
                                            source={ require('../Images/I.png')}
                                        />
                                    </TouchableOpacity>
                                </Right>
                                
                            </ListItem>
                        </View>
                    )}    
                />
                
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
    },
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        padding: 10,
        borderRadius:10,
    },
    icons: {
        width:20,
        height:20,
    },
    location: {
        alignSelf:'center',
        textShadowRadius:5,
        marginTop:'5%',
        marginRight:10,
        borderColor:'white',
        paddingRight:20,
        borderRightWidth:1,  
    },
});
