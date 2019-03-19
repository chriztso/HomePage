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

var getMedia = (callback) => {
    var query = 'SELECT * FROM media';
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
    })
}


var getPeople = (callback) => {
    var query = 'SELECT * FROM people';
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
    })
}

var getPhotos = (callback) => {
    var query = 'SELECT * FROM photos';
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

var addMusic = (music, callback) => {
  
    var query = `INSERT INTO music (music) VALUES ("${music}")`;
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
   })
}

var addMedia = (media, callback) => {
  
    var query = `INSERT INTO media (media) VALUES ("${media}")`;
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
   })
}

var addPeople = (person, callback) => {
  
    var query = `INSERT INTO people (people) VALUES ("${person}")`;
    connection.query(query, (err, data) => {
       if(err){
           callback(err, null);
           return;
       }
       callback(null, data);
   })
}

var deleteTasks = (callback) => {
    var query = 'DELETE FROM tasks';
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deleteMedia = (callback) => {
    var query = 'DELETE FROM media';
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deleteMusic = (callback) => {
    var query = 'DELETE FROM music';
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deletePeople = (callback) => {
    var query = 'DELETE FROM people';
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deleteOneTask = (id, callback) => {
    var query = `DELETE FROM tasks where id =${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deleteOneMusic = (id, callback) => {
    var query = `DELETE FROM music where id =${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deletePerson = (id, callback) => {
    var query = `DELETE FROM people where id =${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var deleteMedia = (id, callback) => {
    var query = `DELETE FROM media where id =${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var updateMusic = (id, text, callback) => {
    var query = `UPDATE music SET music = '${text}' WHERE id = ${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var updatePeople = (id, text, callback) => {
    var query = `UPDATE people SET people = '${text}' WHERE id = ${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var updateMedia = (id, text, callback) => {
    var query = `UPDATE media SET media = '${text}' WHERE id = ${id}`;
    connection.query(query, (err, data) => {
        if(err){
            callback(err, null);
            return;
        }
        callback(null, data);
    })
}

var updateTasks = (id, text, callback) => {
    var query = `UPDATE tasks SET tasks = '${text}' WHERE id = ${id}`;
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
exports.addMusic = addMusic;
exports.deleteTasks = deleteTasks;
exports.getMedia = getMedia;
exports.addMedia = addMedia;
exports.deleteMedia = deleteMedia;
exports.getPeople = getPeople;
exports.addPeople = addPeople;
exports.deletePeople = deletePeople;
exports.deleteMusic = deleteMusic;
exports.getPhotos = getPhotos;
exports.deleteOneTask = deleteOneTask;
exports.deleteOneMusic = deleteOneMusic;
exports.deletePerson = deletePerson;
exports.deleteMedia = deleteMedia;
exports.updateMusic = updateMusic;
exports.updatePeople = updatePeople;
exports.updateMedia = updateMedia;
exports.updateTasks = updateTasks;