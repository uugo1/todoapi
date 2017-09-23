var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000;
  mongoose = require('mongoose'),
  Task = require('./api/models/todoModel'),
  bodyParser = require('body-parser');
  var logger = require('./helper/logger');
  
  // mongoose.Promise = global.Promise;
  // mongoose.connect('mongodb://localhost:27017/tododb'); 
    logger.info("Connecting..");
  //  var promise = mongoose.connect('mongodb://localhost:27017/tododb', {
    var promise = mongoose.connect('mongodb://todouser:todopass2@ds143754.mlab.com:43754/todo_test', {   
    useMongoClient: true,
  });
promise.then(function(db) {
   logger.info("Connection Established..");
   console.log("Connection Established");
 })
 promise.catch(function(err) { // if error we will be here
       logger.error('App starting error:', err.stack);
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/todoRoutes');
routes(app);

app.listen(port);

//    //Middleware
app.use(function(req, res) {
  // redirect and respond whenever a wrong route is entered 
  res.status(404).send({url: req.originalUrl + ' not found'});
});
 logger.info('todo list RESTful API server started on: ' + port);
 console.log('todo list RESTful API server started on: ' + port);