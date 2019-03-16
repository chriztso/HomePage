var express = require('express');
var app = express();



var port = 3000; 
console.log(__dirname + '/client/dist');
app.use(express.static(__dirname + '/client/dist/'));

app.listen(port, console.log('Listening at 3000!'));