import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ToastAndroid, FlatList} from 'react-native'
import Divider from 'react-native-divider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem, Body, Left, Thumbnail, Right, Header} from 'native-base';
import { ScrollView } from 'react-native-gesture-handler'

export default class UpdateReview extends Component {
    constructor (props) {
        super(props)
        this.state = {
            reviewDetails: '',
            overall_rating:'',
            price_rating:'',
            quality_rating:'',
            clenliness_rating:'',
            review_body:'',
        };
    }

    componentDidMount(){
        const review = this.props.route.params.review
        this.setState({
            overall_rating:review.review.overall_rating,
            price_rating:review.review.price_rating,
            quality_rating:review.review.quality_rating,
            clenliness_rating:review.review.clenliness_rating,
            review_body:review.review.review_body,
        })
    }
    updateReview  = async () => {
        let database_info = { };

        const review = this.props.route.params.review;

        console.log("The Review variable is: ",review);
        console.log("overall_Rating:",review.review.overall_rating);
        console.log("price_rating:",review.review.price_rating);
        console.log("quality_rating:",review.review.quality_rating);
        console.log("clenliness_rating:",review.review.clenliness_rating);
        console.log("review_body:",review.review.review_body);

        //check IF statement is correct.
        console.log(review.review.overall_rating != this.state.overall_rating, review.review.overall_rating, this.state.overall_rating)

        if (review.review.overall_rating != this.state.overall_rating){
            database_info['overall_rating'] = parseInt(this.state.overall_rating);
        }
        if (review.review.price_rating != this.state.price_rating){
            database_info['price_rating'] = parseInt(this.state.price_rating);
        }
        if (review.review.quality_rating != this.state.quality_rating){
            database_info['quality_rating'] = parseInt(this.state.quality_rating);
        }
        if (review.review.clenliness_rating != this.state.clenliness_rating){
            database_info['clenliness_rating'] = parseInt(this.state.clenliness_rating);
        }
        if (review.review.review_body != this.state.review_body){
            database_info['review_body'] = this.state.review_body;
        }

        const session = await AsyncStorage.getItem('@session_token');
        const review_id = review.review.review_id;
        const location_id = review.location.location_id;
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+ location_id+'/review/'+review_id, {
            method: 'patch',
            headers: {'Content-Type': 'application/json', 'X-Authorization': session,},
            body: JSON.stringify(database_info)
        })
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

    render() {
        const review = this.props.route.params.review;
        console.log(review)
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>Edit Review Details</Text> 
                <TextInput style = {styleCSS.input} placeholder={'Your Overall Rating?'} 
                    onChangeText = {(overall_rating) => this.setState({overall_rating})} 
                    defaultValue={review.review.overall_rating.toString()} placeholderTextColor='grey'
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Price?'}
                    onChangeText = {(price_rating) => this.setState({price_rating})} 
                    defaultValue={review.review.price_rating.toString()} placeholderTextColor='grey'
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Quality?'}
                    onChangeText = {(quality_rating) => this.setState({quality_rating})} 
                    defaultValue={review.review.quality_rating.toString()} placeholderTextColor='grey'
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Hygiene?'}
                    onChangeText = {(clenliness_rating) => this.setState({clenliness_rating})} 
                    defaultValue={review.review.clenliness_rating.toString()} placeholderTextColor='grey' 
                />
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(review_body) => this.setState({review_body})} 
                    defaultValue={review.review.review_body} placeholderTextColor='grey'
                />
                <Divider orientation="center"></Divider>
                <TouchableOpacity  style = {styleCSS.button} onPress={() => this.updateReview()}>
                    <Text style = {styleCSS.textDetails}>Submit</Text>
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
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
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