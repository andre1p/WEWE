import login from './login.js';

'use strict';

var CV_URL = 'https://api.clarifai.com/v2/models/e466caa0619f444ab97497640cefc4dc/outputs';


$(function () {
    $('#fileform').on('submit', uploadFiles);
  });
  
 
  function uploadFiles (event) {
    event.preventDefault();
    var file = this.props.imageSource;
    var reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file); 
  }
  
  function processFile (event) {
    var content = event.target.result;
    sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
  }
  
  function sendFileToCloudVision (content) {
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
  
  function GuardaVector (data) {
    var content = data.outputs[0].data.regions[0].data.concepts[0].name;
    console.log(content);
    }
    
  
  