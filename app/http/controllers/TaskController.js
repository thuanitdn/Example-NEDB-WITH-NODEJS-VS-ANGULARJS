/**
 * Created by ThuanLe on 1/12/2016.
 */
var taskModel = require('../../models/TaskModel.js');
var taskRequest=require('../requests/TaskRequest.js');
var baseResponse=require('../BaseResponse.js');
exports.loadAll= function (req,res) {
    taskModel.listAllTaskNotDone(req.session.passport.user._id,req.param('projectId'),function (err,list) {
        var response=new baseResponse();
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(list){
            response.setSuccess(true);
            response.setMessageInfo("Success list all project");
            response.setBody(list);
            res.status(200).json(response.get());
        }
    })
}
exports.loadAllTaskDone= function (req,res) {
    taskModel.listAllTaskDone(req.session.passport.user._id,req.param('projectId'),function (err,list) {
        var response=new baseResponse();
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(list){
            response.setSuccess(true);
            response.setMessageInfo("Success list all project");
            response.setBody(list);
            res.status(200).json(response.get());
        }
    })
}
exports.create= function (req,res) {
    var validate=taskRequest(req);
    var response=new baseResponse();
    if(validate !== false) {
        response.setSuccess(false);
        response.setMessageInfo("Invalid Value --> bad request");
        res.status(400).json(response.get());
    }
    else{
        taskModel.create({task:req.body.task,userId:req.session.passport.user._id,projectId:req.body.projectId,dateActive:new Date(),done:false}, function (err,success) {
            if(err) {
                response.setSuccess(false);
                response.setMessageInfo("Interval server");
                res.status(500).json(response.get());
            }
            else if(success){
                response.setSuccess(true);
                response.setMessageInfo("Success add task");
                res.status(200).json(response.get());
            }
        })
    }
}
exports.remove= function (req,res) {
    var response=new baseResponse();
    var id=req.param('taskId');
    taskModel.remove(id, function (err,num) {
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(num){
            response.setSuccess(true);
            response.setMessageInfo("Success remove task");
            res.status(200).json(response.get());
        }
    })
}
exports.update= function (req,res) {
    var response=new baseResponse();
    var id=req.param('taskId');
    taskModel.update({_id:id},{done:true}, function (err,num) {
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(num){
            response.setSuccess(true);
            response.setMessageInfo("Success update task");
            res.status(200).json(response.get());
        }
    })
}

