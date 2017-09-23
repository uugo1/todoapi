
'use strict';
module.exports = function(app) {
  var todo = require('../controllers/todoController');


  // todo Routes


  app.route('/tasks')
    /**
 * @api {get} /api/tasks Get all tasks
 * @apiName Get all tasks
 * @apiGroup Task
 * @apiVersion 0.1.1
 * @apiDescription  Get all created task 
 *
 * @apiParam {String} name The name of the task
 * @apiParam {Date} Created_date The date the task was created
 * @apiParam {String} status The status of the task e.g pending or completed
 * 
 * @apiSuccess Okay
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Okay
 *
 * @apiError Missing-fields Missing fields
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     Missing Fields
 */
    .get(todo.list_all_tasks)

 /**
 * @api {post} /api/tasks Create a task
 * @apiName Create a task
 * @apiGroup Task
 * @apiVersion 0.1.1
 * @apiDescription  Create a new task
 *
 * @apiParam {String} name The name of the task
 * @apiParam {Date} Created_date The date the task was created
 * @apiParam {String} status The status of the task e.g pending or completed
 * 
 * @apiSuccess Okay
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Okay
 *
 * @apiError Missing-fields Missing fields
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     Missing Fields
 */
  .post(todo.create_a_task);


  app.route('/tasks/:taskId')
 /**
 * @api {get} /api/tasks/:taskId get a task
 * @apiName get a task
 * @apiGroup Task
 * @apiVersion 0.1.1
 * @apiDescription  get a task by id
 *
 * @apiParam {Number} taskId The Id of the task
 * 
 * @apiSuccess Okay
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Okay
 *
 * @apiError Missing-fields Missing fields
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     Missing Fields
 */
    .get(todo.read_a_task)

  /**
 * @api {put} /api/tasks/:taskId update a task
 * @apiName update a task
 * @apiGroup Task
 * @apiVersion 0.1.1
 * @apiDescription  update a task by id
 *
 * @apiParam {String} name The name of the task
 * @apiParam {Date} Created_date The date the task was created
 * @apiParam {String} status The status of the task e.g pending or completed
 * 
 * @apiSuccess Okay
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Okay
 *
 * @apiError Missing-fields Missing fields
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     Missing Fields
 */
    .put(todo.update_a_task)

  /**
 * @api {delete} /api/tasks/:taskId delete a task
 * @apiName delete a task
 * @apiGroup Task
 * @apiVersion 0.1.1
 * @apiDescription  delete a task by id
 *
 * @apiParam {Number} taskId The Id of the task
 * 
 * @apiSuccess Okay
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Okay
 *
 * @apiError Missing-fields Missing fields
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     Missing Fields
 */
    .delete(todo.delete_a_task);
};