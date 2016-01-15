/**
 * Created by thuanle on 1/09/2015.
 */
var config=require('./../config/config.js');
var Datastore=require('nedb');
var db={};
/**
 * user data
 * @param username
 * @param password
 * @type {Datastore|exports|module.exports}
 */
db.users = new Datastore(config.db+'/user.db');
db.users.loadDatabase();
/**
 * Create a document
 * @param data
 * @param cb
 */
module.exports.create=function(data,callback)
{
    db.users.insert(data,callback);
}
/**
 * update a document
 * @param query
 * @param update
 * @param options
 * @param callback
 */
module.exports.update= function (query, update, options, callback) {
    db.users.update(query, update, options, callback)
}

module.exports.removeAll= function (callback) {
    db.users.remove({}, {},callback);
}

/**
 * find by username
 * @param username
 * @param callback
 */
module.exports.findById= function (id,callback) {
    db.users.find({_id:id}, callback);
}
module.exports.findByEmail=function(email,callback) {
    db.users.findOne({email:email}, callback);
}
module.exports.findByOption=function(option,callback) {
    db.users.findOne(option, callback);
}
/**
 * List all
 * @param callback
 */
module.exports.listAll=function(callback)
{
    db.users.find({},callback);
}


