var express = require('express');
var app = express();
var db = require('./database/index.js');
var bodyParser = require('body-parser');


var port = 3000; 
console.log(db.addTasks);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));

app.get('/tasks', (req, res) => {
    db.getTasks((err, data) => {
       if(err){
           res.status(404).send(err);
           return;
       }
       res.status(200).send(data);
    })
})

app.get('/music', (req, res) => {
    db.getTasks((err, data) => {
       if(err){
           res.status(404).send(err);
           return;
       }
       res.status(200).send(data);
    })
})

app.post('/tasks', (req, res) => {
    console.log('HERE', req.body);
    db.addTasks(req.body.tasks, (err, data) => {
        if(err){
            console.log(err);
            
            return;
        }
        res.status(201).send(data);
    })
})

app.listen(port, console.log('Listening at 3000!'));