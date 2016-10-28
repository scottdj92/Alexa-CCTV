(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// require('./arduino');
require('./webcam');

// Get reference to canvas
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    killed = false,
    pressed;


document.addEventListener("keypress", function(event) {
    if (event.which === 32) {
        event.preventDefault();
        pressed = event.which;
    }
});

document.addEventListener('keyup', function(event) {
    pressed = null;
})
// if we receive an input from the button, send a kill message command and hide the feeds.

// get input and test whether or not it is on or off
verifyKill = (keyCode) => {
    if(keyCode === 32) {
        killed = true;
        $('.video').addClass('killed');
        $('.status').addClass('killed');
        //generate static noise
        generateFailure();
    } else {
        killed = false;
    }
};

generateFailure = () => {
    noise(ctx);
    shutDown();

    window.setTimeout(reboot, 5000);
}

shutDown = () => {
    var videos = document.getElementsByClassName('video');

    for (var i = 0; i < videos.length; i++) {
        videos[i].classList.add('killed');
    }
}

resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.onresize = resize;

noise = () => {
    var w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length;

    for (var i = 0; i < len; i++) {
        buffer32[i++] = ((255 * Math.random())|0) << 24;
    }

    ctx.putImageData(idata, 0, 0);
}

reboot = () => {
    $('.reboot').removeClass('hidden');
    $('.video').addClass('hidden');

    window.setTimeout(function() {
        killed = false;

        window.setTimeout(function() {
            $('.reboot').addClass('hidden');
            $('.video').removeClass('killed');
            $('.video').removeClass('hidden');
            $('.status').removeClass('killed');
        }, 2000);
    }, 10000);
}

(function loop() {
    console.log(killed);
    verifyKill(pressed);
    if(killed) {
        noise(ctx);
    }
    requestAnimationFrame(loop);
})();

},{"./webcam":2}],2:[function(require,module,exports){
"use strict";

(function () {

    navigator.mediaDevices.getUserMedia(
        {video: {height: 150, width: 300}, audio: false})
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

},{}]},{},[1]);
