import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';


export default class movies extends Component {
  state = {
    imageSource: null,
  }
  LoginPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('login');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.caja1}>
            <Text style={styles.movies} >// MOVIES</Text>
            <Text style={styles.search}>Search</Text>
          </View>
          <TouchableHighlight style={styles.cajaL} onPress={this.LoginPage}>
            <Image style={styles.logo}  source={require('./assets/wLogo.png')} />
          </TouchableHighlight>
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
    backgroundColor: '#f711dc',
    flexDirection: 'row',
  },
  caja1: {
    color: 'white',
    flexDirection: 'column',
    marginLeft: 10,
    marginBottom: 10,
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
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginRight: 10,
    aspectRatio: 1,
  }
});
