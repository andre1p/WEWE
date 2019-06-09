import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
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
        text: 'Search',
        loading: false,
    }
    LoginPage = () => {
        const { navigation } = this.props;
        navigation.navigate('login');
    }
    CelRes = (actorName) => {
        const { navigation } = this.props;
        navigation.navigate('celRes', {actorName});
    }
    onChange = (text) => {
        this.setState({ text: text });
    }
    submit = () => {
        const { navigation } = this.props;
        navigation.navigate('search');
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
                this.setState({
                    loading: true,
                })
                const source = { uri: response.uri };
                const base64data = response.data;
                this.setState({ imageSource: source });
                app.models.predict(CELEBRITY_MODEL, { base64: base64data })

                    .then(response => {
                       
                        
                            if(response.outputs[0].data.regions[0].data.concepts[0].value >= 0.87){
                                var actor = response.outputs[0].data.regions[0].data.concepts[0].name;
                                this.setState({ celebrityName: actor });
                                this.setState({ takePic: 'Take again' });
                                this.setState({ band: 2 });
                                this.setState({
                                    loading: false,
                                })
                            }else{
                                this.setState({ band: 1 });
                               this.setState({ celebrityName: 'Not found or invalid image type' });
                               this.setState({
                                loading: false,
                            })
                            }
                    })
                    .catch(error => {
                        this.setState({ band: 1 });
                        this.setState({ celebrityName: 'Not found or invalid image type' });
                        this.setState({
                            loading: false,
                        })

                    })
            }
        });
    }
    LoginPage = () => {
        const { navigation } = this.props;
        navigation.navigate('login');
    }
    onChange = (text) => {
        this.setState({ text: text });
    }
    submit = () => {
        const { navigation } = this.props;
        navigation.navigate('login');
    }

    loading(){
          let button;
        if (this.state.band == 2) {
            button = <Text style={styles.buttonC} onPress={()=>this.CelRes(this.state.celebrityName)}> Continue </Text>
        }
        if(this.state.loading){
            return(           
                <View style={styles.containerGif}>
                  <View style={styles.Loading}>
                    <Image style={{aspectRatio: 1, height: 150}} source={require('./assets/loading1.gif')}/>
                  </View>          
                  </View>    
            );
          }else{
          return(<ScrollView>
            <View style={styles.content}>
                <Text style={styles.title}>{this.state.celebrityName}</Text>
                <Image source={this.state.imageSource} style={styles.image} />
                <Text style={styles.buttonS} onPress={this.takePicture}>{this.state.takePic}</Text>
                {button}
            </View>
        </ScrollView>);
          } 
    }

    render() {
      
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <View style={styles.caja1}>
                        <Text style={styles.movies} >// SEARCH</Text>
                    </View>
                    <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
                        <Image style={styles.logo}  source={require('./assets/logo.png')} />
                    </TouchableOpacity>
                </View>
                {this.loading()}      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Loading:{
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems:'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }, 
    title: {
        margin: 20,
        fontSize: 18,
        textTransform: 'uppercase',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        color: '#282828',
    },
    content:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 250,
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
        color: 'white',
        backgroundColor: 'rgba(247,17,220, 1.0)',
        borderRadius: 20,
        width: 150,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      caja1: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10,
      },
      cajaL: {
      }, 
      movies: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
      },
      search: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#3c3c3c',
        padding: -5,
      },
      logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
        marginRight: 10,
        aspectRatio: 1,
      }
});
