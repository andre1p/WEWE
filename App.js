/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';


export default class App extends Component {
  state = { text: '' }
  onChange = (text) => {
    this.setState({ text /*Es lo mateix que text: text*/});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WEWE</Text>
        <Text style={styles.instructions}>Carles és bastant molt gey.</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
