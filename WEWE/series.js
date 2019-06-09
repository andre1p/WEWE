import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import userdb from './userdb.json';
import ImagePicker from 'react-native-image-picker';
import { forStatement } from '@babel/types';
import * as data from './userdb.json';
//import { NONAME } from 'dns';

const page = {
 number: 1
}

const fav = {
  bool: 0,
  styleStar: 'styles.nolikeStar'
}

const color = {
id: 0,
}

export default class series extends Component {
  constructor(props) {
    super(props);
    this.state = {
        favM: [],
        favS: [],
        movies: [],
        imageSource: null,
        text: "",
        styleStar: 'styles.nolikeStar',
        seriePage: props.navigation.getParam('serie'),
        moviePage: props.navigation.getParam('movie'),
        loading: true,
    }
}
  componentDidMount() {
      this.setState({
        loading: true,
      });
      fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=a7a70930a3a525de17aae6719fbd0d68&page=${page.number}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
          loading: false
        });
      
      });
}

onChange = (text) => {
  this.setState({
    loading: true
  });
  if(text){
    fetch(`http://api.themoviedb.org/3/search/tv?query=${text}&api_key=a7a70930a3a525de17aae6719fbd0d68&page=${page.number}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        movies: json.results,
        loading: false
      });
    });
    
  }
  this.setState({ text:text });

  }

nextPage = () =>{
  page.number++;
  this.refs._scrollView.scrollTo(0); 
  this.componentDidMount();
}
prevPage = () =>{
  page.number--;
  this.refs._scrollView.scrollTo(0); 
  this.componentDidMount();
}
  LoginPage =()=>{
    const { navigation } = this.props;
    navigation.navigate('login');
  }

  submit = () => {
    const { navigation } = this.props;
    navigation.navigate('search');
  }

 compareLikes = (movie) => {
  fav.bool = 0;
  
    data.filmsFav.forEach(id => { 
      if(id == movie.id){
        fav.bool = 1; 
       }     
    })
   
  if (fav.bool == 1){
    return(
      <View style={styles.like}>
        <Image source={require('./assets/Star_Active.png')} style={styles.likeStar}></Image>
      </View>
    );
  } else{
      return(
        <View style={styles.like}>
          <Image source={require('./assets/Star_Inactive.png')} style={styles.likeStar}></Image>
        </View>
      );
    }
  }

  goInfo = (movie) =>{
    let id = 0;
    const { navigation } = this.props; 
        id = movie.id;
        navigation.navigate('infoSerie', {id});  
  }

  displayCargaMas = () =>{
    return (
    <View style={styles.rows}>
      <TouchableOpacity style={styles.cartel} onPress={()=>this.nextPage()}>
        <Text style={{textAlign: 'center', }}>Next</Text> 
        <Text style={{textAlign: 'center', }}>{page.number + 1}</Text>
      </TouchableOpacity>
    </View>);
  }

  displayCargaMasMenos = () => {
    return (
    <View style={styles.rows}>
      <TouchableOpacity style={styles.cargarMas} onPress={()=>this.prevPage()}>
        <Text style={{textAlign: 'center', }}>Prev</Text> 
        <Text style={{textAlign: 'center', }}>{page.number - 1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cargarMas} onPress={()=>this.nextPage()}>
        <Text style={{textAlign: 'center', }}>Next</Text> 
        <Text style={{textAlign: 'center', }}>{page.number + 1}</Text>
      </TouchableOpacity>
    </View>
    );
  }

  constructNavBar = () => {
      return(<View style={styles.navBar}>
        <View style={styles.caja1}>
          <Text style={styles.movies} >// SERIES</Text>
          <TextInput value={this.state.text}
            placeholder={'Search'}
            placeholderTextColor="#fff"
            style={styles.search}
            onChangeText={this.onChange}
            onSubmitEditing={this.onChange} />
        </View>
        <TouchableOpacity style={styles.cajaL} onPress={this.LoginPage}>
          <Image style={styles.logo}  source={require('./assets/wLogo.png')} />
        </TouchableOpacity>
      </View>);
  }

  render() {
    
    let { movies } = this.state;
    let imglink = ["https://image.tmdb.org/t/p/original"];
    let movielink = ["http://localhost:3000/minfo"];
    let changePage;
    let {loading} = this.state;

    if(page.number == 1){
      changePage = this.displayCargaMas();
    } else {
      changePage = this.displayCargaMasMenos();
    }

    if(loading){
      return(
        <View style={styles.container}>
          {this.constructNavBar()}
            <View style={styles.Loading}>
              <Image style={{aspectRatio: 1, height: 150}} source={require('./assets/loading2.gif')}/>
            </View>
          </View>
      );
    } else {
    return (
      <View style={styles.container}>
        {this.constructNavBar()}
        <ScrollView ref='_scrollView'>
          <View style={styles.rows}>
          {movies.map((movie, index) =>
            <TouchableOpacity style={styles.cartel} key={index} onPress={()=> this.goInfo(movie)}>
              <ImageBackground source={{ uri: imglink + movie.poster_path }} style={styles.bgImage}>
                <Image style={styles.imageColorGradient} source={require('./assets/Gradient_CyanUP.png')}/>
              <View><Text style={styles.titleMovie}>{movie.original_title}</Text></View>
                <View style={styles.listed}><Text style={styles.listedLines}>\\</Text></View>
                {this.compareLikes(movie)}
              </ImageBackground>
            </TouchableOpacity>
                    )}
              
              {changePage}
            
          </View>
        </ScrollView>
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  Loading:{
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems:'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageColorGradient:{
    zIndex: 5, 
    position: 'absolute', 
    bottom: 0, 
    width: '100%',
  },
  cargarMas: {
    color: 'black',
    backgroundColor: 'white',
    margin: 5,
    aspectRatio: 0.32,
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
  conent: {
    flexDirection: 'column',
  },
  navBar2: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(11,233,199, 1)',
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
  rows: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  bgImage: {
    height: '100%',
    width: '100%',
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
  titleMovie: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-end',
    zIndex: 2,
    position: 'absolute',
    bottom: -165,
    width: '100%',
    zIndex: 6,
    fontWeight: 'bold',
  },
  titleSerie: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(221,0,162,0.5)',
    zIndex: 2,
    position: 'absolute',
    bottom: -165,
    width: '100%',
  },
  listed: {
    zIndex: 10, 
    position: 'absolute',
    left: 80,
    top:-60,
  },
  listedLines: {
    color: 'rgba(11,233,199, 0.8)',
    fontWeight: '900',
    fontSize: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  nolistedLines: {
    color: 'rgba(150,150,150,0.8)',
    fontWeight: '900',
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
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
    aspectRatio: 1,
    zIndex: 3,
    height: 20,
  },
  navBar: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(11,233,199, 1)',
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
