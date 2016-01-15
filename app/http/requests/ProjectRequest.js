/**
 * Created by ThuanLe on 1/11/2016.
 */
var async=require('async');
module.exports= function (request) {
    var err=false;
    async.waterfall([function (callback) {
        request.assert('project', 'Invalid Display Name')
            .notEmpty().withMessage('Display Name Is Required');
    }, function (callback) {
        err=request.validationErrors()
    }]);
    return err;

}
