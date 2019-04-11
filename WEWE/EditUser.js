/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';


export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.navigation.getParam('userName', 'xxx')
    }
  }

  state = { text: '' }
  onChange = (text) => {
    this.setState({ text /*Es lo mateix que 'text: text' */ });
  }
  submit = () => {
    const changeUserName = this.props.navigation.getParam('changeUserName', null);
    if (changeUserName) {
      changeUserName(this.state.text);
      this.props.navigation.goBack();
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
          onChangeText={this.onChange}
          onSubmitEditing={this.submit} />
        <Text style={styles.instructions}>Current text "{this.state.text}"</Text>
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
  inputBox: {
    backgroundColor: "#222222",
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
