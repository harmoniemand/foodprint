var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var JsonDB = require('node-json-db');
var db = new JsonDB("database", true, true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var expressWs = require('express-ws')(app);



 
app.use(function (req, res, next) {
  console.log('middleware');
  req.received = new Date();
  return next();
});
 
app.ws('/', function(ws, req) {

  ws.on('message', function(msg) {
      console.log("msg: " + msg);
  });

  console.log('socket', req.testing);
});
 
















var port = 30080;        // set our port

var router = express.Router();              // get an instance of the express Router

app.use('/', express.static('static'));

router.get('/data', function(req, res) {
    res.json(db.getData('/'));
});
router.post('/data', function (req, res) {
    db.push("/", req.body, false);
    res.json({ it: 'is saved'});
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
