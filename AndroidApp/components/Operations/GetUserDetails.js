import { Item } from 'native-base';
import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, ActivityIndicator} from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler';

export default class getUserDetails extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            isLoading: true,
            myDetailsData: [],
            id='',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    componentDidMount() {
        this.getData();
    }

    getDetails(){
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                myDetailsData: responseJson
            })
        })
        .catch((error) => {
            //alert("Error")
            console.log(error);
        });
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View>
                    <ActivityIndicator />
                </View>
            );
        }else {
            return (
                <View> 
                    <FlatList data={this.state.myDetailsData}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.firstName}</Text>
                                <Button onPress={() => console.log("Delete")} title="Delete USer"/>
                            </View>
                        )}
                        keyExtractor={({id}, index) => id}
                    />
                </View>
            );
        }
    }
}
