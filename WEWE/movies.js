import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
//import { NONAME } from 'dns';


export default class movies extends Component {
  state = {
    imageSource: null,
    text: "Search",
    styleStar: 'styles.nolikeStar',
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
  changeFav = () => {
    if(this.state.styleStar == 'styles.nolikeStar'){
      this.setState({styleStar: 'styles.likeStar'});
      alert(this.state.styleStar);
    } else {
      this.setState({styleStar: 'styles.nolikeStar'});
      alert(this.state.styleStar);
    }
  }
  displayRows = () => (
    <View style={styles.rows}>
      {this.displayCartels()}
      {this.displayCartels()}
      {this.displayCartels()}
    </View>
  );
  displayCartels = () => (
      <View style={styles.cartel}>
        <ImageBackground source={require('./assets/alita.jpg')} style={styles.bgImage}>
          <View><Text style={styles.title}>Movie 1</Text></View>
          <View style={styles.listed}><Text style={styles.listedLines}>//</Text></View>
          <View style={styles.like}><Text style={styles.likeStar} onPress={this.changeFav}>*</Text></View>
        </ImageBackground>
      </View>
  );

  render() {
    let rendermas;
    if(this.state.styleStar == 'styles.nolikeStar'){
      rendermas =  this.displayRows();
    }
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.caja1}>
            <Text style={styles.movies} >// MOVIES</Text>
            <TextInput value={this.state.text} 
              style={styles.search}
              onChangeText={this.onChange}
              onSubmitEditing={this.submit} />
          </View>
          <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
            <Image style={styles.logo}  source={require('./assets/wLogo.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.content}>
            {this.displayRows()}
            <View style={styles.rows}>
              <View style={styles.cartel}>
                <ImageBackground source={require('./assets/endgame.jpg')} style={styles.bgImage}>
                  <View><Text style={styles.title}>Movie 1</Text></View>
                  <View style={styles.listed}><Text style={styles.nolistedLines}>//</Text></View>
                  <View style={styles.like}><Text style={styles.likeStar}>*</Text></View>
                </ImageBackground>
              </View>
              <View style={styles.cartel}>
                <ImageBackground source={require('./assets/endgame.jpg')} style={styles.bgImage}>
                  <View><Text style={styles.title}>Movie 1</Text></View>
                  <View style={styles.listed}><Text style={styles.nolistedLines}>//</Text></View>
                  <View style={styles.like}><Text style={styles.nolikeStar}>*</Text></View>
                </ImageBackground>
              </View>
              <View style={styles.cartel}>
                <View><Text style={{textAlign: 'center', }}>+</Text></View>
              </View>
              
            </View>
            {rendermas}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  conent: {
    flexDirection: 'column',
  },
  rows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bgImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 0,
  },
  cartel: {
    color: 'white',
    backgroundColor: 'white',
    margin: 5,
    aspectRatio: 0.7,
    height: 165,
    alignItems: 'stretch',
    justifyContent: 'center',
    zIndex: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 0,
  },
  title: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(201,0,122,0.5)',
    zIndex: 1,
  },
  listed: {
    zIndex: 2, 
    position: 'absolute',
    left: 103,
  },
  listedLines: {
    color: 'rgba(201,0,122,1)',
    fontWeight: '900',
    fontSize: 30,
  },
  nolistedLines: {
    color: 'rgba(150,150,150,1)',
    fontWeight: '900',
    fontSize: 30,
  },
  like: {
    zIndex: 2, 
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  likeStar: {
    color: 'rgba(201,0,122,1)',
    fontWeight: '900',
    fontSize: 30,
    textAlign: 'center',
  },
  nolikeStar: {
    color: 'rgba(150,150,150,1)',
    fontWeight: '900',
    fontSize: 30,
        textAlign: 'center',

  },
  navBar: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#f711dc',
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
