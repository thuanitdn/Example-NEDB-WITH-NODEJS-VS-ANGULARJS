/**
 * Created by ThuanLe on 1/13/2016.
 */
var assert = require('chai').assert;
var async=require('async');
module.exports= function () {
    this.World = require('../support/world.js').World;

    /**
     * create new task
     */

    this.When(/^I create a new task$/, function (callback) {
        console.log("starting test create new task");
        console.log("----------------------------");
        var self = this;
        self.request
            .post('/api/task/create')
            .use(self.prefix)
            .send({task: "exampletask",projectId:"exampleid"})
            .end(function (err, res) {
                assert.equal(res.body.success, true, 'Task must be created')
                callback();
            })
    });

    this.Then(/^the task with task "exampletask" is created$/, function (callback) {
        assert(true, 'not implemented yet');
        callback();
    })

    /**
     * get list task
     */

    this.When(/^I get a list task$/,function(callback){
        console.log("starting test get list project");
        console.log("----------------------------");
        var self = this;
        self.request
            .get('/api/task/listTask')
            .use(self.prefix)
            .query({projectId:"exampleid"})
            .end(function(err,res) {
                if(res.body.success){
                    assert.equal(res.body.success,true,'Get list object');
                    console.log("try display about 5 object");
                    console.log("| Task Id			 | task			|");
                    for(var i=0;i<5;i++){
                        console.log("| "+ res.body.body[i]._id +" |"+ res.body.body[i].task +"|");
                    }
                    callback();
                }
            });
    });

    this.Then(/^the following task are listed$/, function(callback){
        assert(true, 'not implemented yet');
        console.log("****-----------------****");
        console.log("End test");
        callback();
    })

}