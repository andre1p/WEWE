
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

export default class login extends Component {

  MoviesPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('movies');
  }
  SeriesPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('series');
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
    fontWeight: '900',
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
    fontWeight: '900',
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
    fontWeight: '900',
  },
  logo: {
    width: 160,
    height: 160,
    margin: 10,
  }
});
