import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as data from './userdb.json';

const titulo = {
    title: null
}

export default class celRes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            actor: props.navigation.getParam('actorName'),
            text: 'Search',
            loading: true,
        }
    }
    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/search/person?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US&query=${this.state.actor}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    movies: json.results[0].known_for,
                    loading: false,
                });

            });
    }
    saveFav(){
        data.seriesFav.push(this.state.id);
    }
    submit = () => {
        const { navigation } = this.props;
        navigation.navigate('search');
    }
    movieList(movie) {
        if (movie.original_name == null) {
          titulo.title = movie.original_title;
          return(
          <View>
            <Image style={styles.imageColorGradient} source={require('./assets/Gradient_PinkUP.png')}/>
            <View><Text style={styles.title}>{titulo.title}</Text></View>
            <View style={styles.listed}><Text style={styles.listedLines}>\\</Text></View>
          </View>
          );
        }
        else{
            titulo.title = movie.original_name;
            return(
            <View>
                <Image style={styles.imageColorGradient} source={require('./assets/Gradient_CyanUP.png')}/> 
                <Text style={styles.titleSerie}>{titulo.title}</Text>
                <View style={styles.listed}><Text style={styles.listedLinesSerie}>\\</Text></View>
            </View>
            );
        };                   
    }
    goInfo = (movie) =>{
        let id = 0;
        const { navigation } = this.props; 
        
        if(movie.original_title == null){  
            id = movie.id;
            navigation.navigate('infoSerie', {id});
        } else {
            id = movie.id;
            navigation.navigate('infoMovie', {id});
        }
    }

    render() {
        let { movies } = this.state;
        let imglink = ["https://image.tmdb.org/t/p/original"];
        let movielink = ["http://localhost:3000/minfo"];
        let {loading} = this.state;
        if(loading){
            return(
                <View style={styles.Loading}>
                    <Image style={{aspectRatio: 1, height: 150, alignItems: 'center', justifyContent:'center'}} source={require('./assets/loading1.gif')}/>
                </View>
            );
        } else {
        return (
            <View style={styles.container} >
                <View style={styles.navBar}>
                    <View style={styles.caja1}>
                        <Text style={styles.movies} >// SEARCH</Text>
                        <TextInput value={this.state.text} 
                        style={styles.search}
                        onChangeText={this.onChange}
                        onSubmitEditing={this.submit} />
                    </View>
                    <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
                        <Image style={styles.logo}  source={require('./assets/logo.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.knownFor}>
                    <Text>Known for...</Text>
                </View>
                <View style={styles.rows}>
                    {movies.map((movie, index) =>
                        <TouchableOpacity key={index} style={styles.cartel} onPress={()=> this.goInfo(movie)}>
                                <ImageBackground  source={{ uri: imglink + movie.poster_path }} style={styles.bgImage}>
                                    {this.movieList(movie)}
                                    <View style={styles.like}><Image source={require('./assets/Star_Inactive.png')} style={styles.likeStar}></Image></View>
                                </ImageBackground>
                        </TouchableOpacity>
                    
                    )}
                </View>
            </View>
        );
        }
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
    knownFor: {
        margin: 20,
        fontSize: 28,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    imageColorGradient: {
        zIndex: 15, 
        position: 'absolute', 
        bottom: 0, 
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        color: '#282828',
    },
    rows: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
      },
    cartel: {
        color: 'white',
        backgroundColor: 'white',
        margin: 5,
        aspectRatio: 0.7,
        height: 165,
        alignItems: 'stretch',
        justifyContent: 'center',
        zIndex: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 0,
      },
    bgImage: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 0,
    },
    title: {
        color: 'white',
        padding: 5,
        justifyContent: 'flex-end',
        zIndex: 2,
        position: 'absolute',
        bottom: -165,
        width: '100%',
        zIndex: 6,
        fontWeight: 'bold',
    },
    titleSerie: {
        color: 'white',
        padding: 5,
        justifyContent: 'flex-end',
        zIndex: 2,
        position: 'absolute',
        bottom: -165,
        width: '100%',
    },
    listed: {
        zIndex: 10, 
        position: 'absolute',
        left: 80,
        top:-60,
      },
      listedLines: {
        color: 'rgba(250,0,200,0.8)',
        fontWeight: '900',
        fontSize: 150,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
      },
      listedLinesSerie:{
        color: 'rgba(11,233,199, 0.8)',
        fontWeight: '900',
        fontSize: 150,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
      },
      like: {
        zIndex: 2, 
        position: 'absolute',
        top: 10,
        left: 10,
      },
      likeStar: {
        aspectRatio: 1,
        zIndex: 3,
        height: 20,
      },
      nolikeStar: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
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
    filmList: {
        height: 165,
        marginBottom: 20,
        backgroundColor: '#151515'
    },
    filmTitle: {
        color: 'white',
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
    cimageLink: {
        width: 30,
    },
    caja1: {
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10,
      },
    cajaL: {
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
    },
    movies: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
});