
// 0. Installar primer el paquet de clarifai

// 1. Importar la llibreria
import Clarifai from 'clarifai';

// 2. Crear un objecte app amb l'apiKey
const app = new Clarifai.App({
  apiKey: 'YOUR-APIKEY'
});

class MyComponent extends React.Component {
  /*

      El vostre component tindrà els mètodes que tingui...

  */

  // Mètode que es cridarà quan apretes un botó o algo per fer una foto
  takePicture() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // 3. Segons la documentació de de l'objecte 'response':
        //    https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md#the-response-object
        //    el camp 'data' conté les dades en base64 (caldria comprovar això, que jo ara no puc!).
        const base64data = response.data; // <-- comprovar que això va bé (les dades en base64 són un string amb lletres i números).

        // 4. La API de Clarifai (https://sdk.clarifai.com/js/latest/Model.html#predict)
        //    el mètode 'predict' ens demana el model i un objecte amb les dades de la imatge en base64:
        app.models.predict(Clarifai.XXXXXX_MODEL, { base64: base64data })
        //                          ^^^^^^- Canviar el model aquí!!
          .then(res => {
            // 5. Rebem els resultats de la crida a la API
            Alert.alert('success', JSON.stringify(res.data.concepts));
          })
          .catch(error => {
            // 6. Gestió d'errors.
            Alert.alert('error', JSON.stringify(error));
          })

      }
    });
  };
}
