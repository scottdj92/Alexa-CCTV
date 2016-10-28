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

noise = (ctx) => {
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
    killed = false;
    $('.reboot').addClass('hidden');

    $('.video').removeClass('killed');
    $('.status').removeClass('killed');
}

(function loop() {
    console.log(killed);
    verifyKill(pressed);
    if(killed) {
        noise(ctx);
    }
    requestAnimationFrame(loop);
})();
