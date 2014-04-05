/**
 * Created by robertorojas on 4/4/14.
 */

var mongoose = require('mongoose');
var user = require('../server/models/user');
mongoose.connect('mongodb://localhost/selfRegistration_test');

describe('Users', function(){

    var currentUser = null;

    beforeEach(function(done){

        user.create({firstName: 'Roberto', lastName:'Rojas', email: 'robertojrojas@gmail.com'}, function(doc){
            currentUser = doc;
            done();
        });

    });

    afterEach(function(done){
        user.model.remove({}, function(){
            done();
        });
    });

    describe('', function(){

        it('', function(done){
             done();
        });

    });

});