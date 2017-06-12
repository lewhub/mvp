var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = 8080;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'))



app.listen(port, function(err) {
  if (err) return console.log(err)
  console.log('listening on port: ' + port);
})