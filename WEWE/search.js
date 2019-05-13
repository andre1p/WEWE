

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Clarifai from 'clarifai'

//const Clarifai = require('clarifai');

const imagePickerOptions = {
    title: 'Take a Picture'
}

const CELEBRITY_MODEL = 'e466caa0619f444ab97497640cefc4dc'
const app = new Clarifai.App({
apiKey: '1e17c96d33274a809962560bda316e3e',
});

export default class search extends Component {
    state = {
        imageSource: null,
        celebrityName: 'Search for a Celebrity',
        takePic: 'Take a picture',
        band: 1,
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
                const source = {uri: response.uri};
                const base64data = response.data;
                this.setState({imageSource: source});
                app.models.predict(CELEBRITY_MODEL, { base64: base64data })
                
                  .then(response => {
                   var actor = response.outputs[0].data.regions[0].data.concepts[0].name;
                    console.log('success', JSON.stringify(response.outputs[0].data.regions[0].data.concepts[0].name));
                    this.setState({celebrityName: actor});
                    this.setState({takePic:'Take again'});
                    this.setState({band:2});
                    
                  })
                  .catch(error => {
                    this.setState({band:1});
                    this.setState({celebrityName: 'Not found or invalid image type'});
                    
                  })
            }
        });
    }

    render() {
        let button;
        if(this.state.band == 2){
       button = <Button title="Continue" /> }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.celebrityName}</Text>
                <Image source={this.state.imageSource} style={styles.image} />
                <Text style={styles.buttonS} onPress={this.takePicture}>{this.state.takePic}</Text>
                <Text style={styles.buttonC} >Continue</Text>
                {button}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        margin:20,
        fontSize: 18,
        textTransform: 'uppercase',
        
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
