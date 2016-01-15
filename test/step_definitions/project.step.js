/**
 * Created by ThuanLe on 1/13/2016.
 */
var assert = require('chai').assert;
var async=require('async');
module.exports= function () {
    this.World = require('../support/world.js').World;

    /**
     * create new project
     */


    this.When(/^I create a new project$/,function(callback){
        console.log("starting test create new project");
        console.log("----------------------------");
        var self = this;
            self.request
                .post('/api/project/create')
                .use(self.prefix)
                .send({project:"exampleproject"})
                .end(function(err,res){
                    assert.equal(res.body.success,true,'Project must be created')
                    callback();
                })
    });

    this.Then(/^the project with project "exampleproject" is created$/, function(callback){
        assert(true, 'not implemented yet');
        callback();
    })

    /**
     * update a project
     */

    this.When(/^I update a project$/,function(callback){
        console.log("starting test update project");
        console.log("----------------------------");
        var self = this;
        async.waterfall([function (cb) {
            self.request
                .get('/api/project/findByProject')
                .use(self.prefix)
                .query({project:'exampleproject'})
                .end(function(err,res) {
                    if(res.body.success){
                        cb(res.body.body._id);
                    }
                });
        }], function (id) {
            console.log(id);
            self.request
                .post('/api/project/update')
                .use(self.prefix)
                .send({projectId:id,project:"exampleprojectupdate"})
                .end(function(err,res){
                    assert.equal(res.body.success,true,'Project must be updated');
                    callback();
                })
        })
    });

    this.Then(/^the project with project "exampleprojectupdated" is updated$/, function(callback){
        var self=this;
        self.request
            .get('/api/project/findByProject')
            .use(self.prefix)
            .query({project:'exampleprojectupdate'})
            .end(function(err,res) {
                if(res.body.success){
                    assert.equal(res.body.success,true,'Get object');
                    console.log("Success object after update:  "+res.body.body.project);
                    callback();
                }
            });

    })

    /**
     * get list project
     */

    this.When(/^I get a list project$/,function(callback){
        console.log("starting test get list project");
        console.log("----------------------------");
        var self = this;
        self.request
            .get('/api/project/listProject')
            .use(self.prefix)
            .end(function(err,res) {
                if(res.body.success){
                    assert.equal(res.body.success,true,'Get list object');
                    console.log("try display about 5 object");
                    console.log("| Project Id			 | Project			|");
                    for(var i=0;i<5;i++){
                        console.log("| "+ res.body.body[i]._id +" |"+ res.body.body[i].project +"|");
                    }
                    callback();
                }
            });
    });

    this.Then(/^the following project are listed$/, function(callback){
        assert(true, 'not implemented yet');
        console.log("****-----------------****");
        console.log("End test");
        callback();
    })
}
