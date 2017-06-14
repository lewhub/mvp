var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config()
var port = 8080;
var db = require('./api/db/config.js');
var userRoutes = require('./api/routes/user_rts.js');
var path = require('path');
var session = require('express-session');
var user_ctrl = require('./api/controllers/user_ctrl.js');


app.use('/', express.static(path.join(__dirname, 'www')))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(session({
    secret: 'squareRock',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge : 1500000 }
}))

app.use(function(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "Options") {
        res.send(200);
    } else {
        return next();
    }
})

app.use('/api/users', userRoutes)

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, function(err) {
  if (err) return console.log(err)
  console.log('listening on port: ' + port);
})