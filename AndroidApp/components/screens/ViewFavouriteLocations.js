import React from 'react'
import { Component } from 'react'
import { Text, View, StyleSheet, ToastAndroid, FlatList, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Body, Left, Thumbnail, Right} from 'native-base';

/* Class that initiates a GET request to API to retrieve and display all the 
    user-favourited locations within the UI through querying from the FIND endpoint */

export default class ViewFavouriteLocations extends Component {
    constructor (props) {
        super(props)
        this.state = {
            favouriteLocations:[],
        }
    }

    //Run at screen load
    componentDidMount() {
        this.viewfavourite();
        //refresh page once updated
        this.refresh = this.props.navigation.addListener('focus', () => { this.viewfavourite(); });
    }

    /* componentWillUnmount(){
        this.refresh();
    } */

    viewfavourite = async() => {
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
            else { ToastAndroid.show(Error, ToastAndroid.SHORT); }
        })
        .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({
                favouriteLocations: responseJSON,
            });
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render(){
        let bin = async(lId) => {
            await AsyncStorage.setItem('@location_id', JSON.stringify(lId));
            this.props.navigation.navigate('RemoveFavouriteLocations');
        };
        return(
            <View style = {styleCSS.container}>
               
                <FlatList
                    data={this.state.favouriteLocations}
                    keyExtractor={item => item.location_id.toString()}
                    renderItem={({item}) => (  
                        <View style={styleCSS.list}>  
                        <ListItem key={item.location_id} avatar>
                            <Left >
                                <View style={styleCSS.location}>
                                    <Thumbnail source={require('../Images/WC.png')}/>
                                </View>
                            </Left>
                            <Body>
                                <Text style = {{fontSize: 20}}>{item.location_name}</Text>
                                <Text style = {{color: 'grey'}} note>{item.location_town}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => bin(item.location_id)}>
                                    <Image
                                        style={styleCSS.bin}
                                        resizeMode='contain'
                                        source={ require('../Images/D.png')}
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
        alignSelf: 'center',
        color:'white',
        textShadowRadius:5,
        fontSize: 15,
    },
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
    bin: {
        width:20,
        height:20,
    },
});
