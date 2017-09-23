
var targetAddr = "http://localhost:5000";

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest=require('supertest'),
    api=supertest(targetAddr),
    mongoose = require('mongoose'),     //TaskSchema require('../src/helper/mongo'),
    taskmodel = require('../api/models/todoModel'),
    async = require('async');    

    var task = taskmodel.TaskSchema;


  it('should create a new task with correct parameters', function(done){

            api.post('/tasks').send({
                name: ' learn mean stack test_data-'+ Math.floor((Math.random() * 100) + 1)
            }).end(function (err, res) {
                expect(err).to.equal(null);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("name");
                expect(res.body).to.have.property("Created_date");
                expect(res.body.name).to.be.a.string;
                done();
            });
        });
    
    it('it should retrieve all task', function (done) {

    api.get('/tasks')
       .set('Accept', 'application/json')
       .expect(200,done);
    });
