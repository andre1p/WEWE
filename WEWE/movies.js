import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { forStatement } from '@babel/types';
//import { NONAME } from 'dns';

const page = {
 number: 1
}

export default class movies extends Component {
  constructor() {
    super();
    this.state = {
        movies: [],
        imageSource: null,
        text: "Search",
        styleStar: 'styles.nolikeStar',
    }
}
  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=a7a70930a3a525de17aae6719fbd0d68&page=${page.number}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        movies: json.results,
        
      });
      console.log(this.state.movies);
    });
}


nextPage = () =>{
  page.number++;
  this.refs._scrollView.scrollTo(0); 
  this.componentDidMount();
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

  pressCartel = () =>{
    alert("hi");
  }

  render() {
    
    let { movies } = this.state;
    let imglink = ["https://image.tmdb.org/t/p/original"];
    let movielink = ["http://localhost:3000/minfo"];
    
    /*let rendermas;
    if(this.state.styleStar == 'styles.nolikeStar'){
      rendermas =  this.displayRows();
    }*/
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
        <ScrollView ref='_scrollView'>
          <View style={styles.rows}>
          {movies.map((movie, index) =>
           <View style={styles.cartel}>
           <ImageBackground source={{ uri: imglink + movie.poster_path }} style={styles.bgImage}>
             <View><Text style={styles.title}>{movie.original_title}</Text></View>
             <View style={styles.listed}><Text style={styles.listedLines}>//</Text></View>
             <View style={styles.like}><Image source={require('./assets/Star_Active.png')} style={styles.likeStar} onPress={()=>this.changeFav}></Image></View>
           </ImageBackground>
         </View>
                    )}
             <View style={styles.cartel}>
             <TouchableOpacity style={styles.cartel} onPress={()=>this.nextPage()}>
                  <View><Text style={{textAlign: 'center', }}>+</Text></View>
              </TouchableOpacity>
         </View>
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
    flexWrap: 'wrap',
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
    zIndex: 2,
    position: 'absolute',
    bottom: -165,
    width: '100%',
  },
  listed: {
    zIndex: 2, 
    position: 'absolute',
    left: 103,
  },
  listedLines: {
    color: 'rgba(221,0,162,1)',
    fontWeight: '900',
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nolistedLines: {
    color: 'rgba(150,150,150,1)',
    fontWeight: '900',
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  like: {
    zIndex: 2, 
    position: 'absolute',
    top: 10,
    left: 10,
  },
  likeStar: {
    aspectRatio: 1,
    zIndex: 3,
    height: 20,
  },
  nolikeStar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
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
    shadowOpacity: 0.75,
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
