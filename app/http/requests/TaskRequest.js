/**
 * Created by ThuanLe on 1/12/2016.
 */
var async=require('async');
module.exports= function (request) {
    var err=false;
    async.waterfall([function (callback) {
        request.assert('task', 'Invalid Display Name')
            .notEmpty().withMessage('Task Is Required');
        callback();
    }, function (callback) {
        request.assert('projectId', 'Invalid Project ID')
            .notEmpty().withMessage('projectId Is Required');
        callback();
    }], function () {
        err=request.validationErrors()
    });
    return err;

}
