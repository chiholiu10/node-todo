const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');

mongoose.connect('mongodb://localhost/todo');

const todoSchema = new mongoose.Schema({
    name: String
});

const Todo = mongoose.model("Todo", todoSchema);
console.log('Tood' + Todo);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const todoList = [
    "Todo list 1",
    "Todo List 2"
];

app.get('/', function(req, res) {
    Todo.find({}, function(err, todoList) {
        if(err) console.log(err);
        else {
            res.render('index.ejs', { todoList: todoList });
        }
    });
});

app.post('/newTodo', function(req, res) {
    const newItem = new Todo({
        new: req.body.item
    });

    Todo.create(newItem, (err, Todo) => {
        if(err) console.log(err);
        else {
            console.log("Inserted Item: " + newItem);
        }
    });

    res.redirect("/");
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    
    Todo.remove({ _id: mongodb.ObjectID(id)}, (err, result) => {
        if(err) return console.log(err)
        console.log(req.params.id);
    });

    res.redirect('/');
});

app.get('*', function(req, res) {
    res.send("<h1>Invalid</h1>");
});


app.listen(3004, function() {
    console.log('running on localhost 3000');
})
