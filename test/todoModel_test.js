
var targetAddr = "http://localhost:5000";

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest=require('supertest'),
    api=supertest(targetAddr),
    mongoose = require('mongoose'),     //TaskSchema require('../src/helper/mongo'),
    taskmodel = require('../api/models/todoModel'),
    async = require('async');    

    var task = taskmodel.TaskSchema;


    it('it should retrieve all task', function (done) {

    api.get('/tasks')
       .set('Accept', 'application/json')
       .expect(200,done);
    });