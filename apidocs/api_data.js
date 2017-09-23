define({ "api": [
  {
    "type": "post",
    "url": "/api/tasks",
    "title": "Create a task",
    "name": "Create_a_task",
    "group": "Task",
    "version": "0.1.1",
    "description": "<p>Create a new task</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the task</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Created_date",
            "description": "<p>The date the task was created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>The status of the task e.g pending or completed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Okay",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nOkay",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing-fields",
            "description": "<p>Missing fields</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\nMissing Fields",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/todoRoutes.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/tasks",
    "title": "Get all tasks",
    "name": "Get_all_tasks",
    "group": "Task",
    "version": "0.1.1",
    "description": "<p>Get all created task</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the task</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Created_date",
            "description": "<p>The date the task was created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>The status of the task e.g pending or completed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Okay",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nOkay",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing-fields",
            "description": "<p>Missing fields</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\nMissing Fields",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/todoRoutes.js",
    "groupTitle": "Task"
  },
  {
    "type": "delete",
    "url": "/api/tasks/:taskId",
    "title": "delete a task",
    "name": "delete_a_task",
    "group": "Task",
    "version": "0.1.1",
    "description": "<p>delete a task by id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "taskId",
            "description": "<p>The Id of the task</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Okay",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nOkay",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing-fields",
            "description": "<p>Missing fields</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\nMissing Fields",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/todoRoutes.js",
    "groupTitle": "Task"
  },
  {
    "type": "get",
    "url": "/api/tasks/:taskId",
    "title": "get a task",
    "name": "get_a_task",
    "group": "Task",
    "version": "0.1.1",
    "description": "<p>get a task by id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "taskId",
            "description": "<p>The Id of the task</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Okay",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nOkay",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing-fields",
            "description": "<p>Missing fields</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\nMissing Fields",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/todoRoutes.js",
    "groupTitle": "Task"
  },
  {
    "type": "put",
    "url": "/api/tasks/:taskId",
    "title": "update a task",
    "name": "update_a_task",
    "group": "Task",
    "version": "0.1.1",
    "description": "<p>update a task by id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the task</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Created_date",
            "description": "<p>The date the task was created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>The status of the task e.g pending or completed</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "Okay",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nOkay",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Missing-fields",
            "description": "<p>Missing fields</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\nMissing Fields",
          "type": "json"
        }
      ]
    },
    "filename": "api/routes/todoRoutes.js",
    "groupTitle": "Task"
  }
] });
