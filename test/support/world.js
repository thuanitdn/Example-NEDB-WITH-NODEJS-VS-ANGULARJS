/**
 * Created by ThuanLe on 1/13/2016.
 */
//var server = require('../../server.js');

var request = require('superagent');
var prefix = require('superagent-prefix')('http://localhost:3000');
var World = function World() {

    this.request = request;
    this.prefix = prefix;
};

module.exports.World = World;
