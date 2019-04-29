
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class login extends Component {
  state = {
    imageSource: null
  }
  renderItem = ({ item }) => (
    <View style={styles.user}>
      <Image style={styles.userPhoto} source={item.photo} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.imageSource} style={styles.image} />
        <Button title="Take a Picture" />
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <Text style={styles.buttonL}>Log In</Text>
        <Text style={styles.buttonR}>Log Up</Text>
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
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: '#21f1f1',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
  },
  buttonR: {
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: '#f1f121',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
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
