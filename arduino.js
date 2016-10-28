// var five = require("johnny-five");
// var board = new five.Board();
//
// board.on("ready", function() {
//   var spdt = new five.Switch(8);
//   var led = new five.Led(13);
//
//   spdt.on("open", function() {
//     led.off();
//   });
//
//   spdt.on("close", function() {
//     led.on();
//   });
// });

var SerialPort = require('serialport');
var port = new SerialPort('/dev/tty.usbmodem1411', function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});
