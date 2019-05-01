
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const imagePickerOptions = {
  title: 'Take a Picture'
}

export default class login extends Component {
  state = {
    imageSource: null,
    name: "Holi holi"
  }

  takePicture = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({ imageSource: source });
        this.celebremThis();
        //const { navigation } = this.props;
        //navigation.navigate('userlistedit');
      }
    });
  }
  celebrem =()=>{
    var CV_URL = 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs';
    alert(CV_URL);
  }
  celebremThis = () => {

    alert("holi");

    var CV_URL = 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs';


    uploadFiles();


    function uploadFiles(event) {
      event.preventDefault();
      var file = this.state.imageSource;
      var reader = new FileReader();
      reader.onloadend = processFile;
      reader.readAsDataURL(file);
    }

    function processFile(event) {
      var content = event.target.result;
      sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
    }

    function sendFileToCloudVision(content) {
      var request = {
        inputs: [
          {
            data: {
              image: {
                base64: content
              }
            }
          }
        ]
      };

      $('#results').text('Loading...');
      $.post({
        url: CV_URL,
        data: JSON.stringify(request),
        contentType: 'application/json',
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Key " + window.apiKey);

        }
      }).done(GuardaVector);
    }

    function GuardaVector(data) {
      var content = data.outputs[0].data.regions[0].data.concepts[0].name;
      console.log(content);
    }
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
        <Button title="Take a Picture" onPress={this.takePicture} />
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <Text style={styles.buttonL}>{this.state.name}</Text>
        <Text style={styles.buttonR}>Series</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonR: {
    fontSize: 16,
    padding: 15,
    margin: 5,
    backgroundColor: '#f1f121',
    borderRadius: 20,
    width: 120,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
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
