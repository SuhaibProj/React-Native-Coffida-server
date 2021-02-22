import React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right} from 'native-base';

export default class AddReviewLocations extends Component {
    constructor (props) {
        super(props)
        this.state = {
            locationData: [],
            notFollowing: true,
            location_id: '',
            arrow: '>'
        }
    }

    componentDidMount() {
        this.getLocations();
    }


    getLocations = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        return fetch ('http://10.0.2.2:3333/api/1.0.0/find', {
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
                locationData: responseJSON,
            });
            this.state.locationData.toString();
            console.log('The Entire Location Details are:', this.state.locationData);
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        let locationDetails = async(location_id) => {
            await AsyncStorage.setItem('@location_id', JSON.stringify(location_id));
            console.log("The Location ID for this is: ",location_id);
            this.props.navigation.navigate('AddReview');
        };

        return (
            <View style = {styleCSS.container}>
                <Text style ={styleCSS.title}>Select Location to Add Review</Text>
                <FlatList
                    data={this.state.locationData}
                    keyExtractor={item => item.location_id.toString()}
                    renderItem={({item}) => (  
                        <View style={styleCSS.list}> 
                        <ListItem key={item.location_id} avatar>
                            <Left>
                                <TouchableOpacity onPress={() => locationDetails(item.location_id)}>
                                    <View style={styleCSS.location}>
                                        <Thumbnail source={require('../Images/WC.png')}/>
                                    </View>
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => locationDetails(item.location_id)}>
                                    <Text style = {{fontSize: 20}}>{item.location_name}</Text>
                                    <Text style = {{color: 'grey'}} note>{item.location_town}</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => locationDetails(item.location_id)}>
                                    <Image style={styleCSS.edit} source={require('../Images/A.png')}/>
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
        alignSelf: 'center',
        textShadowColor:'black',
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
        marginRight:10,
        marginBottom:15,
        borderColor:'white',
        paddingRight:20,
        borderRightWidth:1,  
    },
    edit: {
        resizeMode:'contain',
        marginTop:10,
        width:40,
        height:40,
        alignSelf:'center',
    },
});
