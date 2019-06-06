
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const imagePickerOptions = {
  title: 'Take a Picture'
}

export default class login extends Component {
  state = {
    imageSource: null,
  }
  
  MoviesPage =()=>{
    let movie = true;
    let serie = false;
    const { navigation } = this.props;
    navigation.navigate('movies', {movie, serie});
  }
  SeriesPage =()=>{
    let movie = false;
    let serie = true;
    const { navigation } = this.props;
    navigation.navigate('movies', {movie, serie});
  }
  SearchPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('search');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <Text style={styles.buttonR} onPress={this.SeriesPage}>Series</Text>
        <Text style={styles.buttonL} onPress={this.MoviesPage}>Movies</Text>
        <Text style={styles.buttonS} onPress={this.SearchPage}>Search</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userName: {
    fontSize: 16,
    marginLeft: 15,
  },
  buttonL: {
    color: 'white',
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: '#f711dc',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonR: {
    color: 'white',
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: '#0BE9C7',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonS: {
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: 'rgba(250,250,250, 1.0)',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  logo: {
    width: 160,
    height: 160,
    margin: 10,
  },
  image: {
    height: 100,
    aspectRatio: .75,
    marginBottom: 20,
  }
});
