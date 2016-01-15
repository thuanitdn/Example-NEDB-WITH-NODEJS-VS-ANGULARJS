/**
 * Created by thuanle on 1/8/2016.
 */
var userModel = require('../../models/UserModel.js');
var logger=require('../../config/logger.js');
var userRequest=require('../requests/UserRequest.js');
exports.index= function (req,res) {
    res.render('HomePage');
}
exports.createUser=function(req,res) {
    var validate=userRequest(req);
    if(validate !== false) {
        req.flash('errors',validate);
        return res.redirect('/');
    }
    else {
        userModel.create({username: req.body.username, password: req.body.password}, function (err) {
            if (err) {
                logger.error(err);
            }
            return res.redirect('/');
        });
    }

}