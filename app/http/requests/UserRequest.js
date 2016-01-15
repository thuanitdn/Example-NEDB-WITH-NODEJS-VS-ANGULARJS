/**
 * Created by thuanle on 9/18/2015.
 */
var async=require('async');
/**
 * form validate
 * @param request
 * @returns {boolean}
 */
module.exports={
    createFunction: function (request) {
        var err=false;
        async.parallel([
            function(callback){
                request.assert('display_name', 'Invalid Display Name')
                    .notEmpty().withMessage('Display Name Is Required');
                callback();
            },
            function(callback){
                request.assert('email', 'Invalid Display Email')
                    .isEmail().withMessage('Email Is Required');
                callback();
            }
            ,function(callback){
                request.assert('password', 'Invalid Password')
                    .notEmpty().withMessage('Password Is Required');
                callback();
            }
        ],function(){
            err=request.validationErrors()
        });
        return err;
    }
}