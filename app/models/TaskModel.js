/**
 * Created by ThuanLe on 1/12/2016.
 */
var config=require('./../config/config.js');
var Datastore=require('nedb');
var db={};

db.tasks = new Datastore(config.db+'/task.db');
db.tasks.loadDatabase();
module.exports.create=function(data,callback)
{
    db.tasks.insert(data,callback);
}

module.exports.update= function (query, update, callback) {
    db.tasks.update(query, { $set: update},{}, callback)
}

module.exports.remove= function (id,callback) {
    db.tasks.remove({ _id: id }, {},callback);
}

module.exports.findById= function (id,callback) {
    db.tasks.find({_id:id}, callback);
}

module.exports.findByOption=function(option,callback) {
    db.tasks.findOne(option, callback);
}

module.exports.listAllTaskNotDone=function(userId,projectId,callback) {
    db.tasks.find({userId:userId,projectId:projectId,done:false},callback);
}

module.exports.listAllTaskDone=function(userId,projectId,callback) {
    db.tasks.find({userId:userId,projectId:projectId,done:true},callback);
}

