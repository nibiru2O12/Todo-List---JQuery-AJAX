$(document).ready(function(){
  
  getTodos();

  input.addEventListener("keypress",function(e){
    if(e.keyCode===13){
      addTodo(this.value);
      this.value="";
    }
  })

  btnShowAll.addEventListener("click",()=>getTodos());
  btnCompleted.addEventListener("click",()=>getFilteredTodos({completed:true}));
  btnNot.addEventListener("click",()=>getFilteredTodos({completed:false}));
  
});

var ul = document.querySelector(".list");
var input = document.querySelector("input");
var btnShowAll = document.querySelector("#show-all");
var btnCompleted = document.querySelector("#completed");
var btnNot = document.querySelector("#not-completed");
var btnClear = document.querySelector("#clear");

function getFilteredTodos(filter){
  const url = '/api/todos/';
  $.getJSON(url)
  .done((result)=>{
    var filtered = result.filter((r)=>{
      return r.completed === filter.completed
    });
    TodoList(filtered);
  })
  .fail(err => console.log(err))
}

function getTodos(){
  const url = '/api/todos/';
  $.getJSON(url)
  .done(TodoList)
  .fail(err => console.log(err))
}

function getTodo(todoID){
  const url = `/api/todos/`+ todoID;
  return $.getJSON(url)
  .done((result )=>{
    return result
  })
  .fail(err => console.log('error',err))
}

function TodoList(todos){
  ul.innerHTML="";
  todos.forEach(todo => TodoItem(todo));
}

function TodoItem(todo){

  var li = document.createElement("li");
  li.innerHTML = todo.name ;

  if(todo.completed) li.classList.add("completed");

  li.addEventListener("click",()=>toggleCompleted(todo._id));
  var btn = DeleteButton(todo._id);

  li.appendChild(btn);
  ul.appendChild(li);

}

function DeleteButton(todoID){
  var btn = document.createElement("a");
  btn.addEventListener("click",()=>{deleteTodo(todoID)});
  btn.innerHTML="x";
  btn.classList.add("delete");
  return btn;
}

function addTodo(name){
  const url = `/api/todos/`;
  $.ajax({method:"POST",url,data:{name}})
    .done(result=>{
      TodoItem(result);
    })
    .fail(err => console.log(err));
}

function deleteTodo(todoID){
  const url = "/api/todos/" + todoID;
  $.ajax({method:"DELETE",url})
    .done(result=>{
      getTodos();
    })
    .fail(err => console.log(err));
}

 async function toggleCompleted(todoID){

  var todo = await getTodo(todoID).then((res)=>res);

  if(!todo) return false;

  var completed = todo.completed;

  const url = "/api/todos/" + todoID;
  $.ajax({
    method:"PUT",
    url,
    data : {completed:!completed}
  })
    .done(result=>{
      getTodos();
    })
    .fail(err => console.log(err));
}
