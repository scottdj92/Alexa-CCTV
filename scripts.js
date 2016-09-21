// Get reference to canvas
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    killed = false;

// if we receive an input from the button, send a kill message command and hide the feeds.

// get input and test whether or not it is on or off
var input = (data) => {
    if(on) {
        $('.video').addClass('killed');
        //generate static noise
        generateFailure();
    } else if (off) {
        // do nothing
        killed = false;
        return;
    }
};

generateFailure = () => {
    noise(ctx);
    killed = true;
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

(function loop() {
    if(killed) {
        noise(ctx);
    }
    requestAnimationFrame(loop);
})();
