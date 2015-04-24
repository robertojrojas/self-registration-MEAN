
module.exports = function(userRouter, User) {
    userRouter.route('/users')
        .get(
            function (req, res, next) {
                User.model.find(function(err, users){
                    if(err){
                        res.status(500).send(err);
                        return;
                    }
                    res.json(
                        users
                    );
                });
            }
       )
       .post(function(req, res, next){
            User.create(req.body, function(err){
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send(req.body);
                }
            });
        });

    userRouter.route('/user-authentication')
        .post(function(req, res, next){
           User.findByEmailAndPassword(req.body, function(err, user){
               if (err) {
                   res.status(401).send("Not Authenticated");
               } else {
                  res.json(user);
               }
           });
        });


};