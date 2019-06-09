import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default class infoMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            infoFilm: [],
            id: props.navigation.getParam('id'),
            text: "Search",
        }
    }

    componentDidMount() {
            this.getInfo();
    }
    
    getInfo() {
        if(this.state.id){
            axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US`)
            .then(response => {
                this.setState({
                    infoFilm: response.data,
                    loading: false,
                })
            });
        } 
    }

    render() { 
        
        let imglink = ["https://image.tmdb.org/t/p/w500"] ;
        let {loading} = this.state;
        if(loading){
            return(
                <View><Text>Loading...</Text></View>
            )
        }else{
            let genres = this.state.infoFilm.genres;
            console.log(this.state.infoFilm);
            return ( 
                <View>
                <View style={styles.navBar2}>
                    <View style={styles.caja1}>
                        <Text style={styles.movies} >// MOVIES</Text>
                        <TextInput value={this.state.text} 
                        style={styles.search}
                        onChangeText={this.onChange}
                        onSubmitEditing={this.submit} />
                    </View>
                    <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
                        <Image style={styles.logo}  source={require('./assets/wLogo.png')} />  
                    </TouchableOpacity>
                </View>
                <View style={styles.imgBG}>
                    <Image source={{uri: imglink + this.state.infoFilm.poster_path}} style={styles.imgBG}/>
                    <Text style={styles.movieTitle}>{this.state.infoFilm.original_title}</Text>
                </View>
                <View style={styles.imgBGspace}></View>
                <View style={styles.genresMovie}>
                    {genres.map((genre,index) =>
                    <Text key={index} style={styles.genreName}>{genre.name}</Text>
                        )}
                </View>
            </View>
             );
        }
       
    }
}
 
const styles = StyleSheet.create({
    imgBG: {
        width: '100%',
        height: 200,
        zIndex: 0,
        position: 'absolute',
    },
    imgBGspace: {
        width: '100%',
        height: 120,
        zIndex: 0,
        position: 'relative',
    },
    movieTitle:{
        color: 'white',
        zIndex: 1,
        position: 'absolute',
        paddingBottom: 10,
        paddingLeft: 10,
        bottom: 0,
        paddingTop: 10,
        width: '100%',
        backgroundColor: 'rgba(247,17,220,0.5)',
        fontWeight: '900',
        fontSize: 20,
    },
    genresMovie:{
        zIndex: 0,
        position: 'relative',
        flexDirection: 'row',
    },
    genreName:{
        color: 'white',
        backgroundColor: 'rgba(117,117,117,0.5)',
        borderRadius: 50,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
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
      navBar2: {
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
        zIndex: 2,
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
