
var socket = require('./modules/socket');
var sensor = require('./modules/sensor');

socket.setReceive(function(msg) {
    console.info(msg);
});

sensor.onReceive(function(data) {
    socket.sendMessage(JSON.stringify(data));
});

var worker = require('./modules/worker');
worker.run();