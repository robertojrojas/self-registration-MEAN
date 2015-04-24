
// This is just to populate the DB with some starting data
function populateDBIfNeeded(model, create) {
    model.find(function(err, users){
        if(err){
            console.log(err);
        } else {
            if (users.length == 0) {
                console.log('Populating the DB...');
                create({
                    firstName: 'Roberto',
                    lastName: 'Rojas',
                    email: 'first@email.com',
                    password: 'password1',
                    state: 'Pennsylvania',
                    zipcode: '10032',
                    sushitype: 'Amaebi – Sweet shrimp'

                }, function () {});
                create({
                    firstName: 'Josette',
                    lastName: 'Rojas',
                    email: 'second@email.com',
                    password: 'password1',
                    state: 'Pennsylvania',
                    zipcode: '10032',
                    sushitype: 'California – Crab and avocado'
                }, function () {});
            }
        }
    });
}


var User = function(){

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        firstName:    String,
        lastName:     String,
        email:        {type: String, index: {unique: true, required: true}},
        password:     String,
        state:        String,
        zipcode:      String,
        sushitype:    String,
        creationDate: {type: Date, 'default': Date.now}
    });

    var _model = mongoose.model('User', userSchema);

    var _create = function(userData, cb){
       new  _model({
           firstName: userData.firstName,
           lastName:  userData.lastName,
           email:     userData.email,
           password:  userData.password,
           state:     userData.state,
           zipcode:   userData.zipcode,
           sushitype: userData.sushitype
       }).save(cb);
    };

    var _findByEmailAndPassword = function(userData, cb) {
        _model.findOne({ where: {email: userData.email, password: userData.password}},
            function (err, user) {
                if (err) {
                    cb(err, null);
                } else if (typeof user === 'undefined') {
                    cb(null, null);
                } else {
                    cb(null, user);
                }
            }
        );
    };



    populateDBIfNeeded(_model, _create);


    return {
        schema: userSchema,
        model: _model,
        create: _create,
        findByEmailAndPassword: _findByEmailAndPassword
    };

}();

module.exports = User;