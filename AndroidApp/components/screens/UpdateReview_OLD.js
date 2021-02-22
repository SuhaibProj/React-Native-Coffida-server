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
            review_id:'',
            overall_rating:'',
            price_rating:'',
            quality_rating:'',
            clenliness_rating:'',
            review_body:'',
        };
    }

    componentDidMount(){
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
                reviewDetails:responseJSON
            });
            console.log("The reviewDetails array contains: ",this.state.reviewDetails)
        
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }  

    updateReview  = async () => {
        let database_info = {
            overall_rating: parseInt(this.state.overall_rating),
            price_rating: parseInt(this.state.price_rating),
            quality_rating: parseInt(this.state.quality_rating),
            clenliness_rating: parseInt(this.state.clenliness_rating),
            review_body: this.state.review_body,
        };
        const session = await AsyncStorage.getItem('@session_token');
        const location_id = await AsyncStorage.getItem('@location_id');
        const review_id = await AsyncStorage.getItem('@review_id');
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
        
        return (
            <View style = { styleCSS.container }> 
                <Text style={ styleCSS.title }>Edit Review Details</Text> 
                
                <FlatList
                    data={this.state.reviewDetails.reviews}
                    keyExtractor={item => item.review.review_id.toString()}
                    renderItem={({item}) => (      
                        <View style={{alignContent:'center'}}>
                            <TextInput style = {styleCSS.input} placeholder={'Your Overall Rating?'} 
                                onChangeText = {(overall_rating) => this.setState({overall_rating})} 
                                defaultValue={item.review.overall_rating.toString()} placeholderTextColor='grey'
                            />
                            <TextInput style = {styleCSS.input} placeholder={'Your Rating for Price?'}
                                onChangeText = {(price_rating) => this.setState({price_rating})} 
                                defaultValue={item.review.price_rating.toString()} placeholderTextColor='grey'
                            />
                            <TextInput style = {styleCSS.input} placeholder={'Your Rating for Quality?'}
                                onChangeText = {(quality_rating) => this.setState({quality_rating})} 
                                defaultValue={item.review.quality_rating.toString()} placeholderTextColor='grey'
                            />
                            <TextInput style = {styleCSS.input} placeholder={'Your Rating for Hygiene?'}
                                onChangeText = {(clenliness_rating) => this.setState({clenliness_rating})} 
                                defaultValue={item.review.clenliness_rating.toString()} placeholderTextColor='grey' 
                            />
                            <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                                onChangeText = {(review_body) => this.setState({review_body})} 
                                defaultValue={item.review.review_body} placeholderTextColor='grey'
                            />
                            <Divider orientation="center"></Divider>
                            <TouchableOpacity  style = {styleCSS.button} onPress={() => this.updateReview()}>
                                <Text style = {styleCSS.textDetails}>Submit</Text>
                            </TouchableOpacity>
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