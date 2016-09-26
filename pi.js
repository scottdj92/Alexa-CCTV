"use strict";

var rpio = require('rpio');

rpio.open(11, rpio.INPUT);
console.log('Pin 11 is currently set' + rpio.read(11));

let returnInput = (pin) => {
    //returns 0 or 1
    let state = rpio.read(pin) ? 1 : 0;
    return state;
}
rpio.poll(11, returnInput);
