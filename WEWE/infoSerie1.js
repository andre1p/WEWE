import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import * as data from './userdb.json';



export default class infoSerie extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            infoSerie: [],
            datadb: data,
            id: props.navigation.getParam('id'),
            text: "Search",
        }
    }

    componentDidMount() {
            this.getInfo();
    }
    
    getInfo() {
        if(this.state.id){
            axios.get(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US`)
            .then(response => {
                this.setState({
                    infoSerie: response.data,
                    loading: false,
                })
            });
        } 
    }

    saveFav(){
        data.seriesFav.push(this.state.id);
    }

    render() { 
        
        let imglink = ["https://image.tmdb.org/t/p/w500"] ;
        let {loading} = this.state;
        if(loading){
            return(
                <View><Text>Loading...</Text></View>
            )
        }else{
            let genres = this.state.infoSerie.genres;
            console.log(this.state.infoSerie);
            return ( 
                <View>
                <View style={styles.navBar2}>
                    <View style={styles.caja1}>
                        <Text style={styles.movies} >// SERIES</Text>
                        <TextInput value={this.state.text} 
                        style={styles.search}
                        onChangeText={this.onChange}
                        onSubmitEditing={this.submit}/>
                    </View>
                    <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
                        <Image style={styles.logo}  source={require('./assets/wLogo.png')} />  
                    </TouchableOpacity>
                </View>
                <Image source={{uri: imglink + this.state.infoSerie.poster_path}} style={styles.imgBG}/>
                <Text>{this.state.infoSerie.original_title}</Text>
                {genres.map((genre) =>
                <Text>{genre.name}</Text>
                    )}
                <TouchableOpacity style={styles.cajaL} onPress={() => this.saveFav()}>
                <Text style={styles.buttonR}>Mark as favourite</Text>
                </TouchableOpacity>
                
            </View>
             );
        }
       
    }
}
 
const styles = StyleSheet.create({
    imgBG: {
        width: '100%',
        height: 150,
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'rgba(247,17,220,0.5)',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
      },
      buttonR: {
        color: 'white',
        fontSize: 11,
        padding: 10,
        margin: 2,
        backgroundColor: '#0BE9C7',
        borderRadius: 20,
        width: 200,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
      },
      navBar2: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: 'rgba(11,233,199, 0.5)',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
      },
    caja1: {
        color: 'white',
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10,
    },
    cajaL: {
    }, 
    search: {
        color: '#fff',
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#fff',
        padding: -5,
      },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 10,
        marginRight: 10,
        aspectRatio: 1,
    },
    movies: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
      },
});
