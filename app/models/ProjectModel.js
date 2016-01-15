/**
 * Created by thuanle on 1/11/2015.
 */
var config=require('./../config/config.js');
var Datastore=require('nedb');
var db={};

db.projects = new Datastore(config.db+'/project.db');
db.projects.loadDatabase();
module.exports.create=function(data,callback)
{
    db.projects.insert(data,callback);
}

module.exports.update= function (query, update, callback) {
    db.projects.update(query, { $set: update},{}, callback)
}

module.exports.remove= function (id,callback) {
    db.projects.remove({ _id: id }, {},callback);
}

module.exports.removeAll= function (callback) {
    db.projects.remove({}, {},callback);
}

module.exports.findById= function (id,callback) {
    db.projects.find({_id:id}, callback);
}

module.exports.findByOption=function(option,callback) {
    db.projects.findOne(option, callback);
}

module.exports.listAll=function(id,callback)
{
    db.projects.find({userId:id},callback);
}

module.exports.listAllNotId= function (callback) {
    db.projects.find({},callback);
}
