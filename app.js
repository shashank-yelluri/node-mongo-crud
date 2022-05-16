var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var app = express();

// CORS Fix
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

var Todo = require("./models/todo");
const res = require("express/lib/response");

// Body parser middleware
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://shashank:Greesh123@cluster0.zwpdv.mongodb.net/todo-assignment?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected !"))
  .catch((err) => console.log(err));

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).send("Health Check !");
});

// Getting all todos
app.get("/todos", (req, res) => {
  Todo.find({}).then((todos) => res.send(todos));
});

// Post Todo
app.post("/add", (req, res) => {
  var todo = new Todo(req.body);
  todo.save((err, data) => {
    res.send(data);
  });
});

// Edit Todo
app.put("/update/:id", (req, res) => {
  const todo = req.todo;
  todo.name = req.body.name;
  todo.save((err, data) => {
    res.send(data);
  });
});

app.param("id", (req, res, next, id) => {
  Todo.findById(id).exec((err, todo) => {
    req.todo = todo;
    next();
  });
});

// Delete Todo
app.delete("/delete/:id", (req, res) => {
  const todo = req.todo;
  todo.remove((err, data) => {
    res.json({ data });
  });
});

app.listen(3001, () => console.log("Server started running !"));
