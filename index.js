var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.port || 3000;port

var todosRoutes = require('./routes/todo-routes');

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(request,response)=>{
  response.sendFile('index.html');
})

app.use('/api/todos',todosRoutes);

app.listen(port,()=>{
  console.log('App is running on port ' + port);
}); 
