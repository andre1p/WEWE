import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default class celRes extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
        }
    }
    componentDidMount() {
        const queryString = require('query-string');
        var parsed = 'Morgan Freeman';

        fetch(`https://api.themoviedb.org/3/search/person?api_key=a7a70930a3a525de17aae6719fbd0d68&language=en-US&query=morgan%20freeman`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    movies: json.results[0].known_for,
                });
                console.log(this.state.movies);
            });
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
                        <Text>{movie.original_title}</Text> 
                            <Image style={styles.imageLink} source={{ uri: imglink + movie.poster_path }} />
                            {console.log(movie.poster_path)}
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