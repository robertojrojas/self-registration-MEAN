
var User = function(){

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        firstName: String,
        lastName: String,
        email: {type: String, index: {unique: true, required: true}},
        creationDate: {type: Date, 'default': Date.now}
    });

    var _model = mongoose.model('User', userSchema);

    var _create = function(userData, cb){
       new  _model({
           firstName: userData.firstName,
           lastName: userData.lastName,
           email: userData.email
       }).save(cb);
    };

    // This is just to populate the DB with some starting data
    _model.find(function(err, users){
        if(err){
           console.log(err);
        } else {
            if (users.length == 0) {
                console.log('Populating the DB...');
                _create({
                    firstName: 'Roberto',
                    lastName: 'Rojas',
                    email: 'first@email.com'
                }, function () {});
                _create({
                    firstName: 'Josette',
                    lastName: 'Rojas',
                    email: 'second@email.com'
                }, function () {});
            }
        }
    });


    return {
        schema: userSchema,
        model: _model,
        create: _create
    };

}();

module.exports = User;