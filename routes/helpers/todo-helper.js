var db = require('../../models');

const  getTodos = function(req,res){
  db.Todo.find()
    .then((data)=>res.json(data))
    .catch(err=>res.send(err))
}

const createTodos = function(req,res){
  db.Todo.create(req.body)
      .then(fakeSlowConnection)
      .then(data=>res.send(data))
      .catch(err=>res.send(err));
}

function fakeSlowConnection(response){
  return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                  resolve(response);
                },500);
              })
}

const getTodo = function (req,res){
  const {id}  = req.params;
  db.Todo.findById(id)
    .then(result => res.json(result))
    .catch(err => res.send(err));
}

const updateTodo = function(req,res){
  console.log(req.body)
  db.Todo.findByIdAndUpdate({_id: req.params.id},req.body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
}

const deleteTodo = function(req,res){
  db.Todo.findByIdAndRemove({_id: req.params.id})
    .then(result => res.send(result))
    .catch(err => res.send(err));
}

module.exports = {
  getTodos,
  createTodos,
  getTodo,
  updateTodo,
  deleteTodo
}