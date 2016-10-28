var Cylon = require('cylon');

Cylon.robot({
    connections: {
        arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411'}
    },

    devices: {
        switch: { driver: }
    }
})
