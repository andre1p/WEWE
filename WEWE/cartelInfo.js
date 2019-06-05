import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';

export default class cartelInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.navigation.getParam(cartel1.poster1), 
            title: props.navigation.getParam(cartel1.titulo1), 
            name: props.navigation.getParam(cartel1.name1),
        }
    }
    printValues = () => {
        alert(this.state.poster);
        alert(this.state.title);
        alert(this.state.name);
    }
    render() { 
        return ( 
            <View>
                <Text>Hello</Text>
                {this.printValues()}
            </View>
         );
    }
}
 
