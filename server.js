var express = require('express'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';
var port = process.env.PORT = process.env.PORT || 5750;

var app = express();


mongoose.connect('mongodb://localhost/selfRegistration');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('Self Registration DB Opened');
});


app.get('/', function(req, res){
    res.send('Basic API is ready!');
});


app.listen(port, function(){
    console.log("App serving: http://localhost:"+ port);
});
