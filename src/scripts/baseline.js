const {
    ipcRenderer
} = require('electron');

import { computeBaseline } from './process.js';

const camera = document.querySelector('#camera');
const doneButton = document.querySelector('#done');

//The MediaDevices.getUserMedia() method prompts the user for permission to use a media 
//input which produces a MediaStream with tracks containing the requested types of media.
navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(function (stream) {
        //The getVideoTracks() method of the MediaStream interface 
        //returns a sequence of MediaStreamTrack objects representing the video tracks in this stream.
        if (!stream.getVideoTracks().length) {
            throw new Error("Device does not have webcam");
        }

        //The srcObject property of the HTMLMediaElement interface sets or returns the object
        // which serves as the source of the media associated with the HTMLMediaElement.
        camera.srcObject = stream;

    }).catch(function (error) {
        console.log(error);
        alert('Could not connect stream.');
    });

doneButton.addEventListener('click', function() {
    computeBaseline(camera.srcObject, function(baseline) {
        ipcRenderer.send('baseline-complete', baseline);
    });
})