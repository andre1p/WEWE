import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';


export default class series extends Component {
  state = {
    imageSource: null,
    text: "Search",
  }
  LoginPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('login');
  }
  onChange = (text) => {
    this.setState({ text:text });
  }
  submit = () => {
    const { navigation } = this.props;
    navigation.navigate('search');
  }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.navBar}>
            <View style={styles.caja1}>
              <Text style={styles.movies} >// SERIES</Text>
              <TextInput value={this.state.text} 
                style={styles.search}
                onChangeText={this.onChange}
                onSubmitEditing={this.submit} />
            </View>
            <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
              <Image style={styles.logo}  source={require('./assets/wLogo.png')} />
            </TouchableOpacity>
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
  