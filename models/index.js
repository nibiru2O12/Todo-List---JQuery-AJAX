var mongoose = require('mongoose');

mongoose.set('debug',true);

mongoose.connect('mongodb://localhost/todo');

mongoose.Promise = Promise;

var Todo = require("./todo");

module.exports = {Todo};


// var db = mongoose.connection;
// db.on('error',console.error.bind('console',"connection error"));
// db.once('open',()=>{

//   console.log('connected on mongo');

//   var todoSchema = mongoose.Schema({
//     name: {type: String, required:true},
//     completed: {type: Boolean, default: false },
//     created_date: {type: Date, default: Date.now},
//   });

//   var Todo = mongoose.model('Todo',todoSchema);
  
// })
