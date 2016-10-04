"use strict";

(function () {

    navigator.mediaDevices.getUserMedia(
        {video: {height: 720, width: 1280}, audio: false})
        .then(function(mediaStream) {
            let video = document.getElementsByTagName('video')[1];

            video.src = window.URL.createObjectURL(mediaStream);
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(error) {
            console.log('error', error);
        });
})();
