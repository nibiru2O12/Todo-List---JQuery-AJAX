var express = require('express');
var router = express.Router();

var db = require("../models");
var helpers = require('./helpers/todo-helper');

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodos)

router.route('/:id')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo);

module.exports = router;