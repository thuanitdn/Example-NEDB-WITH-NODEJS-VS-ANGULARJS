/**
 * Created by ThuanLe on 1/11/2016.
 */
var userModel = require('../../models/UserModel.js');
var projectModel = require('../../models/ProjectModel.js');
var userRequest=require('../requests/UserRequest.js');
exports.getRegister= function (req,res) {
    res.render('RegisterPage');
}
exports.postRegister= function (req,res,next) {
    var validate=userRequest.createFunction(req);
    if(validate !== false) {
        console.log(validate)
        req.flash("warning",validate);
        res.render('RegisterPage',{warning:"Please check your infomation"});
    }
    else{
        userModel.findByEmail(req.body.email, function (err,user) {
            if (err){
                res.redirect('/register');
            }
            else if(user){
                res.render('RegisterPage',{warning:"User already Exist"});
            }
            else{
                userModel.create({DisplayName:req.body.display_name,email: req.body.email, password: req.body.password}, function (err,docs) {
                    if (err) {
                        console.error(err);
                    }
                    projectModel.create({project:"Personal",userId:docs._id,dateActive:new Date()}, function (err,success) {
                        if(err) {
                           console.log(err)
                        }
                    })
                    return res.redirect('/login');
                });
            }
        })
    }
}
exports.getSignin= function (req,res) {
    res.render('LoginPage');
}
exports.session = login;

function login (req, res) {
    const redirectTo = req.session.returnTo
        ? req.session.returnTo
        : '/dashboard';
    delete req.session.returnTo;
    res.redirect(redirectTo);
}