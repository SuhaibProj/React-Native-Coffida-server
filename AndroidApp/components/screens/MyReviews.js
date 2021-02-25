import React, {useEffect} from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right} from 'native-base';
import { AirbnbRating } from 'react-native-elements';

/* Class that initiates a GET request to API to retireve the users personal reviews and displays result with UI */

export default class MyReviews extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reviewDetails:[],
        };
    }

    //Run at screen load
    componentDidMount() {
        this.myReviews();
        
        //refresh page once updated
        this.refresh = this.props.navigation.addListener('focus', () => { this.myReviews(); });
    }

    componentWillUnmount(){
        this.refresh();
    }

    myReviews = async () => {
        const session = await AsyncStorage.getItem('@session_token') ;
        const uId = await AsyncStorage.getItem('@id');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/user/'+ uId, {
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
        })
        .catch((error) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() { 
        //For reditection to Delete review function
        let bin = async(review_id, location_id) => {
            await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
            await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
            this.props.navigation.navigate('DeleteReview');
        };

        //For reditection to View review photo function
        let img = async(review_id, location_id) => {
            await AsyncStorage.setItem('@review_id', JSON.stringify(review_id));
            await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
            this.props.navigation.navigate('ViewReviewPhoto');
        };

         //For reditection to Add review photo function
        let cam = (item) => {
            this.props.navigation.navigate('AddReviewPhoto', {'review':item});
        }
        
         //For reditection to update review function
        let update = (item) => {
            this.props.navigation.navigate('UpdateReview', {'review':item});
        };
        
        const count = 5;
        const reviews=['1','2','3','4','5'];
        const viewNumber=false;
        const size=20;
        const modified=true;
        const position='center';
        const space=10;

        return (
            <View style = {styleCSS.container}>
                <View style={{padding:space}}></View>
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
                                            <Text style={{textAlign:'center',fontSize:12,color:'grey'}}>Likes: {item.review.likes}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Left>
                                <Body>

                                    <Text style={styleCSS.textDetails}>Overall Rating</Text>
                                    <AirbnbRating defaultRating={item.review.overall_rating} count={count} reviews={reviews}  
                                        isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                                    <View style={{padding:space}}></View>

                                    <Text style={styleCSS.textDetails}>Cleanliness Rating:</Text>
                                    <AirbnbRating defaultRating={item.review.clenliness_rating} count={count} reviews={reviews}  
                                        isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                                    <View style={{padding:space}}></View>

                                    <Text style={styleCSS.textDetails}>Price Rating:</Text>
                                    <AirbnbRating defaultRating={item.review.price_rating}  count={count} reviews={reviews} 
                                        isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                                    <View style={{padding:space}}></View>

                                    <Text style={styleCSS.textDetails}>Quality Rating:</Text>
                                    <AirbnbRating defaultRating={item.review.quality_rating} count={count} reviews={reviews} 
                                        isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                                    <View style={{padding:space}}></View>

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
        alignSelf:'center',
        textAlign:'center',
    },
    list: {
        marginVertical: 10, 
        marginHorizontal:10,
        backgroundColor: "#f1c50b",
        //backgroundColor: "blue",
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
        marginTop:'60%',
        
        borderColor:'white',
        paddingRight:40,
        borderRightWidth:1,  
    },
});
