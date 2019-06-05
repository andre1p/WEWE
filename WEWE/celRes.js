import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';

const titulo = {
    title: null
}
const cartel1 = {
    poster1: null,
    titulo1: null,
    name1: null,
}
const cartel2 = {
    poster2: null,
    titulo2: null,
    name2: null,
}
const cartel3 = {
    poster3: null,
    titulo3: null,
    name3: null,
}

export default class celRes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            actor: props.navigation.getParam('actorName'),
            text: 'Search',
        }
    }
    componentDidMount() {
        const queryString = require('query-string');
        var parsed = 'Morgan Freeman';

        fetch(`https://api.themoviedb.org/3/search/person?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US&query=${this.state.actor}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    movies: json.results[0].known_for,
                });
                console.log(this.state.movies);
                console.log(this.state.actor);
            });
    }
    submit = () => {
        const { navigation } = this.props;
        navigation.navigate('search');
    }
    movieList(movie) {
        if (movie.original_name == null) {
          titulo.title = movie.original_title;
          return(<Text style={styles.title}>{titulo.title}</Text>);
        }
        else{
            titulo.title = movie.original_name;
            return(<Text style={styles.titleSerie}>{titulo.title}</Text>);
        };                   
    }

    goInfo = (index) => {
        let { titulaso } = 'null';
        let { name } = 'null';
        let { poster } = 'null';
        if(index = 0){
            titulaso = cartel1.titulo1;
            name = cartel1.name1;
            poster = cartel1.poster1;
            if(cartel1.titulo1 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {titulaso}, {poster});
            } else if (cartel1.name1 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {name}, {poster});
            }
        } else if(index = 1){
            titulaso = cartel2.titulo2;
            name = cartel2.name2;
            poster = cartel2.poster2;
            if(cartel2.titulo2 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {titulaso}, {poster});
            } else if (cartel2.name2 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {name}, {poster});
            }
        } else if(index = 2){
            titulaso = cartel3.titulo3;
            name = cartel3.name3;
            poster = cartel3.poster3;
            if(cartel3.titulo3 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {titulaso}, {poster});
            } else if (cartel3.name3 == null){
                const { navigation } = this.props;
                navigation.navigate('cartelInfo', {name}, {poster});
            }
        }
    }

    sendIndex = (index, movie) => {
        if(index == 0){
            cartel1.poster1 = movie.poster_path;
            cartel1.titulo1 = movie.original_title;
            cartel1.name1 = movie.original_name;
            alert(cartel1.poster1);
            alert(cartel1.titulo1);
            alert(cartel1.name1);
        } else if (index == 1){
            cartel2.poster2 = movie.poster_path;
            cartel2.titulo2 = movie.original_title;
            cartel2.name2 = movie.original_name;
        } else if ( index == 2){
            cartel3.poster3 = movie.poster_path;
            cartel3.titulo3 = movie.original_title;
            cartel3.name3 = movie.original_name;
        }
    }

    render() {
        let { movies } = this.state;
        let imglink = ["https://image.tmdb.org/t/p/original"];
        let movielink = ["http://localhost:3000/minfo"];
        
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
                    <Text>Known For</Text>
                </View>
                <View style={styles.rows}>
                    {movies.map((movie, index) =>
                        <TouchableOpacity key={index} style={styles.cartel} onPress={()=> this.goInfo(index)}>
                                {this.sendIndex(index, movie)}
                                <ImageBackground  source={{ uri: imglink + movie.poster_path }} style={styles.bgImage}>
                                    {this.movieList(movie)}
                                    
                                    <View style={styles.listed}><Text style={styles.nolistedLines}>//</Text></View>
                                    <View style={styles.like}><Image source={require('./assets/Star_Inactive.png')} style={styles.likeStar} onPress={this.changeFav}></Image></View>
                                </ImageBackground>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    knownFor: {
        margin: 20,
        fontSize: 28,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        color: '#282828',
    },
    rows: {
        flexDirection: 'row',
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
        borderRadius: 10,
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
        backgroundColor: 'rgba(201,0,122,0.5)',
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    titleSerie: {
        color: 'white',
        padding: 5,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(11,233,199,0.5)',
        zIndex: 2,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    listed: {
        zIndex: 2, 
        position: 'absolute',
        left: 103,
      },
      listedLines: {
        color: 'rgba(221,0,162,1)',
        fontWeight: '900',
        fontSize: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      nolistedLines: {
        color: 'rgba(150,150,150,1)',
        fontWeight: '900',
        fontSize: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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