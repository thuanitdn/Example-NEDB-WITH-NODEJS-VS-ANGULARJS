/**
 * Created by ThuanLe on 1/11/2016.
 */
var projectModel = require('../../models/ProjectModel.js');
var projectRequest=require('../requests/ProjectRequest.js');
var baseResponse=require('../BaseResponse.js');
exports.loadAll= function (req,res,next) {
    projectModel.listAll(req.session.passport.user._id,function (err,listProject) {
            var response=new baseResponse();
            if(err){
                response.setSuccess(false);
                response.setMessageInfo("Interval server");
                res.status(500).json(response.get());
            }
            else if(listProject){
                response.setSuccess(true);
                response.setMessageInfo("Success list all project");
                response.setBody(listProject);
                res.status(200).json(response.get());
            }
        })
}
exports.findByProject= function (req,res,next) {
    projectModel.findByOption({project:req.param('project')}, function (err,result) {
        var response=new baseResponse();
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(result){
            response.setSuccess(true);
            response.setMessageInfo("Success list all project");
            response.setBody(result);
            res.status(200).json(response.get());
        }
    })
}

exports.create= function (req,res,next) {
    var validate=projectRequest(req);
    var response=new baseResponse();
    if(validate !== false) {
        response.setSuccess(false);
        response.setMessageInfo("Invalid Value --> bad request");
        res.status(400).json(response.get());
    }
    else{
        projectModel.create({project:req.body.project,userId:req.session.passport.user._id,dateActive:new Date()}, function (err,success) {
            if(err) {
                response.setSuccess(false);
                response.setMessageInfo("Interval server");
                res.status(500).json(response.get());
            }
            else if(success){
                response.setSuccess(true);
                response.setMessageInfo("Success add project");
                res.status(200).json(response.get());
            }
        })
    }
}

exports.remove= function (req,res) {
    var response=new baseResponse();
    projectModel.remove(req.param('projectId'), function (err,success) {
        if(err){
            response.setSuccess(false);
            response.setMessageInfo("Interval server");
            res.status(500).json(response.get());
        }
        else if(success){
            response.setSuccess(true);
            response.setMessageInfo("Success remove project");
            res.status(200).json(response.get());
        }
    })
}

exports.update= function (req,res) {
    console.log("something is happening with update project");
    var response=new baseResponse();
    projectModel.update({_id:req.body.projectId},{project:req.body.project}, function (err,num) {
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