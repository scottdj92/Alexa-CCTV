"use strict";

(function () {

    navigator.mediaDevices.getUserMedia(
        {video: true, audio: false})
        .then(function(mediaStream) {
            let video = document.getElementsByTagName('video')[2];

            video.src = window.URL.createObjectURL(mediaStream);
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(error) {
            console.log('error', error);
        });
})();
