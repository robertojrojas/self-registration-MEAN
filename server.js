var express = require('express'),
     stylus = require('stylus'),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developement';
var port = process.env.PORT = process.env.PORT || 5750;

var app = express();

function compileStylus(str, path) {
    return stylus(str).set('filename', path);
}

 
app.configure(function(){
     app.set('views', __dirname + '/server/views');
     app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(stylus.middleware({

        src: __dirname + '/public',
        compile: compileStylus

    }));

    app.use(express.static(__dirname + '/public'));
});

mongoose.connect('mongodb://localhost/selfRegistration');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('Self Registration DB Opened');
});

//TODO: I know the following mongoose section will be removed soon.
var messageSchema = mongoose.Schema({message: String});

var Message = mongoose.model('Message', messageSchema);

var mongooseMessage;
Message.findOne().exec(function(err,messageDoc){

    if (!messageDoc || !messageDoc.message) {
      var newMessage = new Message({message: 'Hello MEAN Stack from MongoDB!'});
      newMessage.save(function(err) {
        if (!err) {
          console.log('New MongoDB message inserted! ID:', newMessage._id);
          mongooseMessage = newMessage.message;
        } else {
             console.log('Something went wrong inserting first document. Check if MongoDB is running.', err);
        }
      });
    } else {
       mongooseMessage = messageDoc.message;
    }
});


app.get('/partials/:partialPath', function(req, res){
    res.render('partials/'+req.params.partialPath);
});

// Server the Index page whenever our app does not
// know how to deal with the URI
app.get('*', function(req, res){
    res.render('index', {
        mongoMessage : mongooseMessage
    });
});


app.listen(port, function(){
    console.log("App serving: http://localhost:"+ port);
});
