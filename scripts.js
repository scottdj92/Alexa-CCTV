// if we receive an input from the button, send a kill message command and hide the feeds.

// get input and test whether or not it is on or off
var input = (data) => {
    if(on) {
        $('.video').addClass('killed');
    } else if (off) {
        // do nothing
        return false;
    }
};

