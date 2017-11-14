var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var queryHelper = require("./server/query_helper");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  var objectToInsert = req.body;
  queryHelper.insert(objectToInsert, function() {
    res.sendFile(__dirname + '/client/build/index.html');
  });
});

app.post("/", function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html');
})

app.use(express.static('client/build'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
