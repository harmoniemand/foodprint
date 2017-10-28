const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

var port = new SerialPort("/dev/ttyACM0", {
    baudRate: 9600
});

const parser = new Readline();  
port.pipe(parser);
parser.on('data', console.log);