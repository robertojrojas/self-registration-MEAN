 var express = require('express');

 var app = express();

 var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';
 
 app.configure(function(){
     app.set('views', __dirname + '/server/views');
     app.set('view engine', 'jade');
 });


// Server the Index page whenever our app does not
// know how to deal with the URI
app.get('*', function(req, res){
    res.render('index');
});

var port = process.env.PORT = process.env.PORT || 5750;

app.listen(port, function(){
    console.log("App serving: http://localhost:"+ port);
});