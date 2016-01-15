/**
 * Created by ThuanLe on 1/11/2016.
 */
var userModel = require('../models/UserModel.js');
var LocalStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function (err,user) {
            done(err, user)
        })
    })

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(username, password, done) {
            userModel.findByOption({ email: username,password:password }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
};
