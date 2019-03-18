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
    db.getMusic((err, data) => {
       if(err){
           res.status(404).send(err);
           return;
       }
       res.status(200).send(data);
    })
})

app.get('/media', (req, res) => {
    db.getMedia((err, data) => {
       if(err){
           res.status(404).send(err);
           return;
       }
       res.status(200).send(data);
    })
})

app.get('/people', (req, res) => {
    db.getPeople((err, data) => {
       if(err){
           res.status(404).send(err);
           return;
       }
       res.status(200).send(data);
    })
})

app.get('/photos', (req, res) => {
    db.getPhotos((err, data) => {
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

app.post('/music', (req, res) => {
    console.log('HERE', req.body);
    db.addMusic(req.body.music, (err, data) => {
        if(err){
            console.log(err);
            
            return;
        }
        res.status(201).send(data);
    })
})

app.post('/media', (req, res) => {
    console.log('HERE', req.body);
    db.addMedia(req.body.media, (err, data) => {
        if(err){
            console.log(err);
            
            return;
        }
        res.status(201).send(data);
    })
})

app.post('/people', (req, res) => {
    console.log('HERE', req.body);
    db.addPeople(req.body.people, (err, data) => {
        if(err){
            console.log(err);
            
            return;
        }
        res.status(201).send(data);
    })
})

app.delete('/tasks', (req, res) => {
    db.deleteTasks((err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).send(data);
    })
})

app.delete('/media', (req, res) => {
    db.deleteMedia((err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).send(data);
    })
})

app.delete('/music', (req, res) => {
    db.deleteMusic((err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).send(data);
    })
})

app.delete('/people', (req, res) => {
    db.deletePeople((err, data) => {
        if(err){
            console.log(err);
            return;
        }
        res.status(201).send(data);
    })
})

app.listen(port, console.log('Listening at 3000!'));