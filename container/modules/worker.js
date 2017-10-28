

const http = require("http");
const config = require("../data/config");
const incredients = require("../data/incredients");

function getIncredient(name) {
    var incredient = incredients.filter(function (item) { return item.name == name; });

    if (incredient.length == 0)
        return null;

    return incredient[0];
};

function postTask(data, callback) {
    var post_options = {
        host: config.robotUrl,
        port: config.robotPort,
        path: '/v1/opcua',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(chunk);
        });
    });

    post_req.write(JSON.stringify(data));
    post_req.end();
}

function getOrders(url, callback) {

    http.get(url, function (res) {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            var obj = JSON.parse(output);
            callback(obj);
        });
    });
};

function printItems(items, callback) {
    if (items == null || items.length == 0) {
        callback();
        return;
    }

    var item = items.pop();

    // build JSON
    var reqData = {
        "ascOpcuaProfiles": [],
        "w_Mode_Select_Opc": "7",
        "x_StartMode": true,
        "x_AbortMode": false,
        "x_ResetErrorOpc": false,
        "eSelectAxisOpc": "Z",
        "x_GripperOu": true
    };

    var basement = getIncredient(item.basement.name);
    reqData.ascOpcuaProfiles.push({
        "id": 1,
        "lrXPos": basement.position.x,
        "lrYPos": basement.position.y,
        "lrZPos": basement.position.z,
        "lrAux1Pos": 0,
        "lrPathVel": "1000",
        "lrPathAcc": "10000",
        "lrPathDec": "10000",
        "lrBlendingRadius": "100"
    });

    item.incs.forEach(function (inc) {
        var incredient = getIncredient(inc.name);
        reqData.ascOpcuaProfiles.push({
            "id": reqData.ascOpcuaProfiles.length + 1,
            "lrXPos": incredient.position.x,
            "lrYPos": incredient.position.y,
            "lrZPos": incredient.position.z,
            "lrAux1Pos": 0,
            "lrPathVel": "1000",
            "lrPathAcc": "10000",
            "lrPathDec": "10000",
            "lrBlendingRadius": "100"
        });
    });

    postTask(reqData, function() {
        printItems(items, callback);
    })
};

function fullfillOrders(orders) {
    if (orders == null || orders.length == 0)
        return;

    var order = orders.pop();
    printItems(order.items, function() {
        fullfillOrders(orders);
    });
};

function run() {
    getOrders(config.apiUrl + "/orders.json", function (orders) {
        fullfillOrders(orders);
    });
}



module.exports = {
    run: run
};