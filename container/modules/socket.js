

var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var connection = null;
var onReceive = null;

 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(con) {
    console.log('WebSocket Client Connected');
    connection = con;

    con.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    con.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    con.on('message', function(message) {
        if (message.type === 'utf8') {
            if (onReceive != null)
                onReceive(message.utf8Data);
        }
    });
});
 
client.connect('ws://localhost:30080/', 'echo-protocol');


function sendMessage (msg) {
    if (connection == null)
        return;

    connection.sendUTF(msg);
};


module.exports = {
    sendMessage: sendMessage,
    setReceive: function(receiver) { onReceive = receiver; }
};