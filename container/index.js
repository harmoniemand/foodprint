
var robotJson = {
    "ascOpcuaProfiles": [],

    "w_Mode_Select_Opc": "7",
    "x_StartMode": false,
    "x_AbortMode": false,
    "x_ResetErrorOpc": false,
    "eSelectAxisOpc": "Z",
    "x_GripperOu": true
};


var incredients = [

    {
        name: "bun",
        position: {
            x: -200,
            y: -250,
            z: -750
        }
    },
    {
        name: "salad",
        position: {
            x: 0,
            y: 0,
            z: -750
        }
    }

];

var placePosition = {
    x: 230,
    y: 0,
    z: -745
};


function pick(inc) {
    var incredient = incredients.filter(function (item) { return item.name == inc.name; });

    if (incredient.length == 0)
        return;

    incredient = incredient[0];

    robotJson.ascOpcuaProfiles.push({
        "id": robotJson.ascOpcuaProfiles.length + 1,
        "lrXPos": incredient.position.x,
        "lrYPos": incredient.position.y,
        "lrZPos": incredient.position.z,
        "lrAux1Pos": 0,
        "lrPathVel": "1000",
        "lrPathAcc": "10000",
        "lrPathDec": "10000",
        "lrBlendingRadius": "100"
    });

};

function place() {
    robotJson.ascOpcuaProfiles.push({
        "id": robotJson.ascOpcuaProfiles.length + 1,
        "lrXPos": placePosition.x,
        "lrYPos": placePosition.y,
        "lrZPos": placePosition.z,
        "lrAux1Pos": 0,
        "lrPathVel": "1000",
        "lrPathAcc": "10000",
        "lrPathDec": "10000",
        "lrBlendingRadius": "100"
    });
};

// call api
var sendRequest = function (url, callback) {
    var http = require("http");

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


sendRequest("http://127.0.0.1:8080/orders.json", function (obj) {

    obj.forEach(function (order) {

        order.items.forEach(function (item) {

            pick(item.basement);
            place();

            item.incs.forEach(function (inc) {
                pick(inc);
                place();
            });

            console.info(JSON.stringify(robotJson, null, 2));

            

            robotJson = {
                "ascOpcuaProfiles": [],

                "w_Mode_Select_Opc": "7",
                "x_StartMode": false,
                "x_AbortMode": false,
                "x_ResetErrorOpc": false,
                "eSelectAxisOpc": "Z",
                "x_GripperOu": true
            };
        });
    })

});