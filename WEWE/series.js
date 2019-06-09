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
        text: "Search",
        styleStar: 'styles.nolikeStar',
        seriePage: props.navigation.getParam('serie'),
        moviePage: props.navigation.getParam('movie'),
    }
}
  componentDidMount() {
      fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=a7a70930a3a525de17aae6719fbd0d68&page=${page.number}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movies: json.results,
        });
        color.id=1;
      });
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

 compareLikes = (movie) => {
  fav.bool = 0;
    data.seriesFav.forEach(id => { 
      if(id == movie.id){
        fav.bool = 1; 
        console.log(id);
       }     
    })
   if(fav.bool == 1){
    fav.styleStar = styles.likeStar;
  }else{
    fav.styleStar = styles.nolikeStar;
  }
  }


  goInfo = (movie) =>{
    let { id } = 0;

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
      return(<View style={styles.navBar2}>
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
      </View>);
    }
  

  render() {
    
    let { movies } = this.state;
    let imglink = ["https://image.tmdb.org/t/p/original"];
    let movielink = ["http://localhost:3000/minfo"];
    let changePage;
    if(page.number == 1){
      changePage = this.displayCargaMas();
    } else {
      changePage = this.displayCargaMasMenos();
    }

    /*let rendermas;
    if(this.state.styleStar == 'styles.nolikeStar'){
      rendermas =  this.displayRows();
    }*/
    return (
      <View style={styles.container}>
        {this.constructNavBar()}
        <ScrollView ref='_scrollView'>
          <View style={styles.rows}>
          {movies.map((movie, index) =>
            <TouchableOpacity style={styles.cartel} key={index} onPress={()=> this.goInfo(movie)}>
              <ImageBackground source={{ uri: imglink + movie.poster_path }} style={styles.bgImage}>
              <View><Text style={styles.titleSerie}>{movie.original_name}</Text></View>
                {this.compareLikes(movie)}
                <View style={styles.listed}><Text style={styles.listedLines}>//</Text></View>
                <View style={styles.like}><Image source={require('./assets/Star_Active.png')} style={fav.styleStar} onPress={()=>this.changeFav}></Image></View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    backgroundColor: 'rgba(201,0,122,0.5)',
    zIndex: 2,
    position: 'absolute',
    bottom: -165,
    width: '100%',
  },
  titleSerie: {
    color: 'white',
    padding: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(11,233,199,0.5)',
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
