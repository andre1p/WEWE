import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ImageBackground } from 'react-native';
import { TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default class cartelInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.navigation.getParam('poster'), 
            title: props.navigation.getParam('titulaso'),
            peli: props.navigation.getParam('peli'),
            id: props.navigation.getParam('id'),
            text: "Search",
        }
    }
    printValues = () => {
        let imglink = ["https://image.tmdb.org/t/p/original"] ;
        if(this.state.peli == true){
            return(
                <View>
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
                    <Image source={{uri: imglink + this.state.poster}} style={styles.imgBG}/>
                    <Text>{this.state.title}</Text>
                    <Text>Peli id: {this.state.id}</Text>
                </View>
            );
        } else {
            return(
                <View>
                    <View style={styles.navBar2}>
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
                    <Image source={{uri: imglink + this.state.poster}} style={styles.imgBG}/>
                    <Text>{this.state.title}</Text>
                    <Text>Serie id: {this.state.id}</Text>
                </View>
            );
        }
        
    }
    render() { 
       
        return ( 
            <View>
                {this.printValues()}
            </View>
         );
    }
}
 
const styles = StyleSheet.create({
    imgBG: {
        width: '100%',
        height: 150,
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
      navBar2: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#0BE9C7',
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
    },
    movies: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
      },
});