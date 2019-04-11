
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';


const users = [
  { id: 1, name: "Claudia Ryan", photo: require('./assets/user00.jpg') },
  { id: 2, name: "Jeremiah Harris", photo: require('./assets/user01.jpg') },
  { id: 3, name: "Janet Little", photo: require('./assets/user02.jpg') },
  { id: 4, name: "Timmothy Daniels", photo: require('./assets/user03.jpg') },
  { id: 5, name: "Ted Wade", photo: require('./assets/user04.jpg') },
  { id: 6, name: "Jennifer Snyder", photo: require('./assets/user05.jpg') },
  { id: 7, name: "Andy Murray", photo: require('./assets/user06.jpg') },
  { id: 8, name: "Lily Sutton", photo: require('./assets/user07.jpg') },
  { id: 9, name: "Isobel Gregory", photo: require('./assets/user08.jpg') },
  { id: 10, name: "Tyrone Bates", photo: require('./assets/user09.jpg') },
];

export default class UserList extends Component {

  renderItem = ({ item }) => (
    <View style={styles.user}>
      <Image style={styles.userPhoto} source={item.photo} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={users}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
  userPhoto:{
    width: 60,
    height: 60,
    borderRadius: 60,
    marginLeft: 20,
  },
});
