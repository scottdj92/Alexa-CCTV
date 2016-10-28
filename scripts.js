// require('./arduino');
require('./webcam');

// Get reference to canvas
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    killed = false;


document.addEventListener("keydown", function(event) {
    if (event.which === 32) {
        event.preventDefault();
        console.log(event.which);
        verifyKill(event.which);
    }
});
// if we receive an input from the button, send a kill message command and hide the feeds.

// get input and test whether or not it is on or off
verifyKill = (keyCode) => {
    if(keyCode === 32) {
        $('.video').addClass('killed');
        $('.status').addClass('killed');
        //generate static noise
        generateFailure();
    } else {
        // do nothing
        killed = false;
        return;
    }
};

generateFailure = () => {
    noise(ctx);
    shutDown();
    killed = true;

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
}

(function loop() {
    if(killed) {
        noise(ctx);
    }
    requestAnimationFrame(loop);
})();
