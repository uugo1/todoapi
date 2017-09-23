
'use strict';

var logger = require('../../helper/logger');
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');


exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err){
       logger.info('Todo list_all_tasks error');
       logger.error(err);
       res.send(err);
    }
       res.json(task);  
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if(task){ logger.info(task.name +' created successfully'); }
    if (err)
    {
       logger.info('Todo create_a_task error');
       logger.error(err);
       res.send(err);
    }    
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err){
       logger.info('Todo read_a_task error');
       logger.error(err);
       res.send(err);
    }
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err){
       logger.info('Todo update_a_task error');
       logger.error(err);
       res.send(err);
    }
      
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err){
        logger.info('Todo delete_a_task error');
        logger.error(err);
        res.send(err);
    } 
    res.json({ message: 'Task successfully deleted' });
  });
};

