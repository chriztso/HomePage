var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yourpassword',
  database : 'mvp'
});

connection.connect(() => {console.log('CONNECTED TO DB')});

var getTasks = (callback) => {
  var query = 'SELECT * FROM tasks';
  connection.query(query, (err, data) => {
     if(err){
         callback(err, null);
         return;
     }
     callback(null, data);
  })
}

var getMusic = (callback) => {
    var query = 'SELECT * FROM music';
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
    })
}


var addTasks = (task, callback) => {
  
    var query = `INSERT INTO tasks (tasks) VALUES ("${task}")`;
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
   })
}

exports.addTasks = addTasks;
exports.getTasks = getTasks;
exports.getMusic = getMusic;