const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var onReceive = null;

var port = new SerialPort("/dev/ttyACM0", {
    baudRate: 9600
});

const parser = new Readline();  
port.pipe(parser);
parser.on('data', function(data) {
    if (onReceive != null)
        onReceive(data);
});

module.exports = {
    onReceive: function(callback) {
        onReceive = callback;
    }
}