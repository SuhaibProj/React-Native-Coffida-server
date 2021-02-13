import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, FlatList, ToastAndroid, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right } from 'native-base';

export default class Locations extends Component {
    constructor (props) {
        super(props)
        this.state = {
            notFollowing: true,
            imageFollowing: []
        }
    }

    componentDidMount = async() => {
        this.getLocations();
    }


    getLocations = async () => {
        const session = await AsyncStorage.getItem('@session_token')
        return fetch ('http://10.0.2.2:3333/api/1.0.0/find?', {
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
            console.log(responseJSON)
            this.setState({
                locationData: responseJSON,
            })
            this.state.locationData.toString()
            console.log('The Location Data is:', this.state.locationData )
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }


    render() {
        const locationDetails = (id) => {
            console.log("The Location ID for this is: ",id);
        }
        let checkFollowing = (id) => {
            console.log("The Location ID for this is: ",id);
            this.setState({ 
                notFollowing: !this.state.notFollowing, 
            })
        }
        const navig = this.props.navigation;
        return (
            <View style = {styleCSS.container}> 
                <Text style ={styleCSS.title}>View All Locations</Text>
                <FlatList
                    data={this.state.locationData}
                    keyExtractor={item => item.location_id.toString()}
                    renderItem={({item}) => (  
                        <ListItem key={item.location_id} avatar>
                            <Left >
                                <TouchableOpacity onPress={() => locationDetails(item.location_id)}>
                                    <Thumbnail source={require('../Images/WC_1.png')}/>
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => locationDetails(item.location_id)}>
                                    <Text style = {styleCSS.textDetails}>{item.location_name}</Text>
                                    <Text note>{item.location_town}</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right style = {{justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => checkFollowing(item.location_id)}>
                                    <Image
                                        style={styleCSS.hearts}
                                        resizeMode='contain'
                                        source={ this.state.notFollowing == true 
                                            ? require('../Images/H.png') :    
                                            require('../Images/H_RED.png')}
                                    />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    )}    
                />
                <View style = {styleCSS.MyAccount}>
                    <Button title = 'My Account' onPress={() => navig.navigate('MyAccount')}/>
                </View>
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
    MyAccount: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },
    textDetails: {
        fontSize: 20,
        color: 'red',
    },
    hearts: {
        justifyContent: 'center', 
        width: 20, 
        height: 20,
    }
});
