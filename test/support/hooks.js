/**
 * Created by ThuanLe on 1/13/2016.
 */
var hooks = function hooks() {
    var fs = require('fs');
    var tmp = require('tmp');

    this.Before(function () {
        var tmpObject = tmp.dirSync({unsafeCleanup: true});
        this.tmpDir = fs.realpathSync(tmpObject.name);
    });
};


module.exports = hooks;