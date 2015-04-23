
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


    return {
        schema: userSchema,
        model: _model,
        create: _create
    };

}();

module.exports = User;