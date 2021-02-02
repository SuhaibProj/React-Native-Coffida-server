import React from 'react'
import { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput } from 'react-native'

export default class AddReview extends Component {
    constructor (props) {
        super(props)

        this.state = {
            overallRating: '',
            priceRating: '',
            qualityRating: '',
            cleanlinessRating: '',
            comments: '',
        };
    }
    render() {
        const navig = this.props.navigation;
        return (
            <View style = { styleCSS.container }> 
                <Text style = { styleCSS.title }>Add Your Review</Text>
                <TextInput style = {styleCSS.input} placeholder={'Your Overall Rating?'} 
                    onChangeText = {(overallRating) => this.setState({overallRating})} value={this.state.overallRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Price?'}
                    onChangeText = {(priceRating) => this.setState({priceRating})} value={this.state.priceRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Quality?'}
                    onChangeText = {(qualityRating) => this.setState({qualityRating})} value={this.state.qualityRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Your Rating for Hygiene?'}
                    onChangeText = {(cleanlinessRating) => this.setState({cleanlinessRating})} value={this.state.cleanlinessRating}
                />
                <TextInput style = {styleCSS.input} placeholder={'Any Comments?'}
                    onChangeText = {(comments) => this.setState({comments})} value={this.state.comments}
                />
                <View style = {styleCSS.submit}>
                    <Button 
                        title = 'Submit' 
                        onPress={() => navig.navigate('AuthUser')}>
                    </Button>
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
        textAlign: 'center',
    },
    input: {
        justifyContent: 'center',
        height: 45,
        width: 300,
        paddingStart: 20,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.20)',
        marginVertical: 10,
        alignSelf: 'center',
    },
    submit: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '75%',
        alignSelf: 'center',
        marginBottom: 30,
    },

});
