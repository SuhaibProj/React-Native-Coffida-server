import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ToastAndroid, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right} from 'native-base';

export default class ViewFavouriteLocations extends Component {
    constructor (props) {
        super(props)
        this.state = {
            favouriteLocations:[],
        }
    }

    componentDidMount(){
        this.inputfavourite();
    }

    inputfavourite = async() => {
        const session = await AsyncStorage.getItem('@session_token');
        return fetch ('http://10.0.2.2:3333/api/1.0.0/find?search_in=favourite', {  
            headers: {'Content-Type': 'application/json','X-Authorization': session,},
        })
        .then((response) => {
            if(response.status === 200) { return response.json(); }
            else if (response.status === 400){ throw "Bad Request"; }
            else if (response.status === 401){ throw "Unauthorised"; }
            else if (response.status === 404){ throw "Not Found"; }
            else if (response.status === 500){ throw "Server Error"; }
            else{ throw 'Something didnt work'; }
        })
        .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({
                favouriteLocations: responseJSON,
            })
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render(){
        return(
            <View style = {styleCSS.container}>
                <Text style = {styleCSS.title}>View All Favourites</Text>
                <FlatList
                    data={this.state.favouriteLocations}
                    keyExtractor={item => item.location_id.toString()}
                    renderItem={({item}) => (  
                        <ListItem key={item.location_id} avatar>
                            <Left >
                                <Thumbnail source={require('../Images/WC_1.png')}/>
                            </Left>
                            <Body>
                                <Text style = {{fontSize: 20}}>{item.location_name}</Text>
                                <Text style = {{color: 'grey'}} note>{item.location_town}</Text>
                            </Body>
                            <Right>
                                <Text style={{color: 'grey'}}>{this.state.arrow}</Text>
                            </Right>
                        </ListItem>
                    )}    
                />
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
    button: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '50%', 
        backgroundColor: "#808080",
        padding: 10,
        marginBottom: 20,
    },
});
