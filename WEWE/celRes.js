import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';

const titulo = {
    title: null
}

export default class celRes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            actor: props.navigation.getParam('actorName'),
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

    movieList(movie) {
        if (movie.original_name == null) {
          titulo.title = movie.original_title;
        }
        else{
            titulo.title = movie.original_name;
        };                   
    }

    render() {
        let { movies } = this.state;
        let imglink = ["https://image.tmdb.org/t/p/original"];
        let movielink = ["http://localhost:3000/minfo"];
        
        return (
            <View style={styles.container} >
                <View style={styles.movieList}>
                    {movies.map(movie =>
                        <View style={styles.filmList}>
                        <Image style={styles.imageLink} source={{ uri: imglink + movie.poster_path }} />
                            {console.log(movie.poster_path)}
                            
                        {this.movieList(movie)}
                        <Text style={styles.filmTitle}>{titulo.title}</Text>

                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imageLink: {
        width: 120,
        aspectRatio: 1, 
    },
    filmList: {
        marginBottom: 20,
        backgroundColor: '#151515'
    },
    filmTitle: {
        color: 'white',
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#0BE9C7',
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
    cajaL: {
    },
    movies: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
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
    }
});