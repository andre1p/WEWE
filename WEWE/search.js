

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
//import Clarifai from 'clarifai';

//const Clarifai = require('clarifai');

const imagePickerOptions = {
    title: 'Take a Picture'
}

//const app = new Clariafai.App({
//  apiKey: '1e17c96d33274a809962560bda316e3e',
//});

export default class search extends Component {
    state = {
        imageSource: null,
        celebrityName: 'Search for a Celebrity',
        takePic: 'Take a picture',
    }

    takePicture = () => {
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({ imageSource: source });
                this.setState({celebrityName: "Is this your celebrity? " + " Brandon Stark"});
                this.setState({takePic: "Take again"});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.celebrityName}</Text>
                <Image source={this.state.imageSource} style={styles.image} />
                <Text style={styles.buttonS} onPress={this.takePicture}>{this.state.takePic}</Text>
                <Text style={styles.buttonC} >Continue</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        margin:20,
        fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        width: 160,
        height: 160,
        margin: 10,
    },
    image: {
        height: 300,
        aspectRatio: .75,
        marginBottom: 20,
        borderColor: '#000',
        borderWidth: 0.2,
        borderRadius: 20,
    },
    buttonS: {
        fontSize: 16,
        padding: 15,
        margin: 5,
        backgroundColor: 'rgba(250,250,250, 1.0)',
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
      },
    buttonC: {
        fontSize: 16,
        padding: 15,
        margin: 5,
        backgroundColor: 'rgba(100,250,250, 1.0)',
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        opacity: 0,
      },
});
