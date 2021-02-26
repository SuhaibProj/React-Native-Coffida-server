import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, ScrollView} from 'react-native'
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-elements';

/* Class that initiates an UPDATE request to API to update user review and displays result with UI */

export default class UpdateReview extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reviewDetails: '',
            overallRating:'',
            priceRating:'',
            qualityRating:'',
            clenlinessRating:'',
            reviewBody:'',
        };
    }

    //Run at screen load
    componentDidMount(){
        this.setReviewData();
    }

    //Pre-populate data into state variables
    setReviewData = () => {
        const review = this.props.route.params.review
        this.setState({
            overallRating:review.review.overall_rating,
            priceRating:review.review.price_rating,
            qualityRating:review.review.quality_rating,
            clenlinessRating:review.review.clenliness_rating,
            reviewBody:review.review.review_body,
        });
    };
    
    
    updateReview  = async () => {
        let database_info = { }; 
        const review = this.props.route.params.review;

        //Check if inputs are different to database to update variables
        if (review.review.overall_rating != this.state.overallRating) { database_info['overall_rating'] = parseInt(this.state.overallRating); }
        if (review.review.price_rating != this.state.priceRating) { database_info['price_rating'] = parseInt(this.state.priceRating); }
        if (review.review.quality_rating != this.state.qualityRating) { database_info['quality_rating'] = parseInt(this.state.qualityRating); }
        if (review.review.clenliness_rating != this.state.clenlinessRating) { database_info['clenliness_rating'] = parseInt(this.state.clenlinessRating); }
        if (review.review.review_body != this.state.reviewBody) { database_info['review_body'] = this.state.reviewBody; }

        //Retireve location ID + review id + session token from async storage for PATCH (Update) Request.
        const session = await AsyncStorage.getItem('@session_token');
        const rId = review.review.review_id;
        const lId = review.location.location_id;
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+lId+'/review/'+rId, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info)
        })

        //Response on success + Error Handling
        .then((response) => {
            if(response.status === 200) { 
                console.log("User Review Updated");
                ToastAndroid.show("Details Updated",ToastAndroid.SHORT);
                this.props.navigation.navigate("MyReviews");
                ToastAndroid.show("Refresh Page for Updates",ToastAndroid.SHORT); 
            }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 403){ throw "Forbidden"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    };

    //User Interface
    render() {
        const review = this.props.route.params.review;

        const count = 5;
        const reviews=['1','2','3','4','5'];
        const viewNumber=false;
        const size=20;
        const modified=false;
        const position='center';
        const space=20;


        return (
            
            <ScrollView style = { styleCSS.container }> 
                
                <View style={{padding:space}}></View>
                <Text style={styleCSS.textDetails}>Your Overall Rating?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={review.review.overall_rating.toString()} onFinishRating={(overallRating) => this.setState({overallRating})} 
                    isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Rating for Price?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={review.review.price_rating.toString()} onFinishRating={(priceRating) => this.setState({priceRating})} 
                    isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Rating for Quality?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={review.review.quality_rating.toString()} onFinishRating={(qualityRating) => this.setState({qualityRating})} 
                    isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>

                <Text style={styleCSS.textDetails}>Your Rating for Hygiene?</Text>
                <AirbnbRating count={count} reviews={reviews} defaultRating={review.review.clenliness_rating.toString()} onFinishRating={(clenlinessRating) => this.setState({clenlinessRating})} 
                    isDisabled={modified} alignSelf={position} size={size} showRating={viewNumber}  selectedColor="white" unSelectedColor="grey"/>
                <View style={{padding:space}}></View>
                
                <Text style={styleCSS.textDetails}>Your Review?</Text>
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(reviewBody) => this.setState({reviewBody})} 
                    defaultValue={review.review.review_body} placeholderTextColor='grey' multiline={true}
                />
                <View style={{padding:space}}></View>

                <Divider orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.updateReview()}>
                    <Text style = {styleCSS.textDetails}>Submit</Text>
                </TouchableOpacity> 
            </ScrollView>
        );    
    }
}

//CSS written code for styling
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
        color:'white',
    },
    input: {
        justifyContent: 'center',
        textAlign:'center',
        height: 45,
        width: 300,
        //paddingStart: 20,
        fontSize: 15,
        backgroundColor: '#404040',
        marginVertical: 10,
        alignSelf: 'center',
        color:'white',
    },
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#f1c50b",
        padding: 15,
        borderRadius:10,
    },

});