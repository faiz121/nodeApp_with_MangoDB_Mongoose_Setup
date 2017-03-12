var express = require('express');
var morgan = require('morgan');

var parser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);

module.exports.app = app;