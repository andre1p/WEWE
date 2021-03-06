import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import * as data from './userdb.json';

export default class infoMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            infoFilm: [],
            infoCredits: [],
            id: props.navigation.getParam('id'),
            text: "Search",
        }
    }

    componentDidMount() {
        this.getInfo();
    }
    saveFav(){
        data.seriesFav.push(this.state.id);
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
            axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US`)
            .then(response => {
                this.setState({
                    infoCredits: response.data,
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
                <View style={styles.Loading}>
                    <Image style={{aspectRatio: 1, height: 150, alignItems: 'center', justifyContent:'center'}} source={require('./assets/loading1.gif')}/>
                </View>
            );
        }else{
            let genres = ['Not found']
            if(this.state.infoFilm.genres){
                genres = this.state.infoFilm.genres;
            }
        
            console.log(this.state.infoFilm);
            return ( 
                <View>
                    <View>
                        <View style={styles.navBar2}>
                            <View style={styles.caja1}>
                                <Text style={styles.movies} >// MOVIES</Text>
                            </View>
                            <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
                                <Image style={styles.logo}  source={require('./assets/wLogo.png')} />  
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imgBG}>
                            <Image source={{uri: imglink + this.state.infoFilm.backdrop_path}} style={styles.imgBG}/> 
                        </View>
                        <View style={styles.imgBGspace}>
                            <View style={styles.movieTitle}>
                                <Text style={styles.titleText}>{this.state.infoFilm.original_title}</Text>
                                <Text style={styles.dateText}>{this.state.infoFilm.release_date}</Text>   
                            </View>
                            <Image style={styles.imgBGspace} source={require('./assets/gradient_BW.png')}/>
                        </View>
                    </View>

                    <ScrollView scrollEventThrottle={16}>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.genresMovie}>
                                    {genres.map((genre,index) =>
                                    <Text key={index} style={styles.genreName}>{genre.name}</Text>
                                        )}
                                </View>
                            </ScrollView>
                            <View style={styles.overviewBox}>
                                <Text style={styles.overview}>Overview</Text>
                                <Text style={styles.overviewText}>{this.state.infoFilm.overview}</Text>
                            </View>
                            <View style={styles.overviewBox}>
                                <Text style={styles.overview}>Duration</Text>
                                <Text style={styles.overviewText}>{this.state.infoFilm.runtime} minutes.</Text>
                            </View>
                            
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.LikeButton} onPress={() => this.saveFav()}>
                                    <Text>Like</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ListButton}>
                                    <Text>To watch</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                </View>
            );
        }
       
    }
}
 
const styles = StyleSheet.create({
    buttons:{
        flexDirection: 'row',
        marginLeft: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LikeButton: {
        padding: 10,
        backgroundColor: 'rgba(247,17,220,0.3)',
        color: 'white',
        fontSize: 25,
        margin: 10,
        marginRight: 20,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListButton:{
        padding: 10,
        backgroundColor: 'rgba(247,17,220,0.3)',
        color: 'white',
        fontSize: 25,
        margin: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Companies:{
        margin: 10,
    },
    Loading:{
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems:'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    }, 
    overviewBox:{
        margin: 20,
        marginBottom: 0,
    },
    OrganizeRow: {
        flexDirection: 'row',
    },
    overview:{
        color: 'rgba(10,10,10,1)',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    overviewText: {
        fontSize: 14,
        textAlign: 'justify',
    },
    imgBG: {
        width: '100%',
        height: 200,
        zIndex: 0,
        position: 'absolute',
    },
    imgBGspace: {
        width: '100%',
        height: 130,
        zIndex: 1,
        position: 'relative',

    },
    movieTitle:{
        color: 'white',
        zIndex: 2,
        position: 'absolute',
        paddingBottom: 10,
        paddingLeft: 10,
        bottom: 0,
        paddingTop: 10,
        width: '100%',
        fontWeight: '900',
        fontSize: 20,
    },
    titleText:{
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
    },
    dateText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 10,
    },
    genresMovie:{
        zIndex: 0,
        position: 'relative',
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
    },
    genreName:{
        color: 'white',
        backgroundColor: 'rgba(247,17,220,0.5)',
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
