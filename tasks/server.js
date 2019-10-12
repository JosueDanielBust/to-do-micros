let port = 3002;

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mysql =  require('mysql');

let app = express();
app.use(cors());

const db =  mysql.createConnection({
  host: 'localhost',
  user: 'bunny',
  password: 'bunny',
  database: 'tasks'
});
db.connect();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

//#region Root path
app.get('/', function(req, res) {
  return res.send( { error: true, message: 'Tasks Microservice' } );
});
//#endregion

//#region MySQL CRUD
app.get('/tasks', function(req, res) {
  db.query( 'SELECT * FROM user_tasks', function( error, results, fields) {
    if (error) throw error;
    return res.send( { error: false, data: results } );
  });
});

app.get('/tasks/:id', function(req, res) {
  let user_id = req.params.id;
  if ( !user_id ) { return res.status(400).send({ error: true, message: 'Please provide user id' }); }
  db.query('SELECT * FROM user_tasks WHERE user_id = ?', [ user_id ], function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results } );
  });
});

app.get('/task/:id', function(req, res) {
  let id = req.params.id;
  if ( !id ) { return res.status(400).send({ error: true, message: 'Please provide id' }); }
  db.query('SELECT * FROM user_tasks WHERE id = ?', [ id ], function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results[0] } );
  });
});

app.post('/task', function(req, res){
  let user_id = req.query.user_id;
  let description = req.query.description;
  if ( !user_id || !description ) { return res.status(400).send({ error: true, message: 'Please provide task description and user id' }); }
  db.query('INSERT INTO user_tasks SET ? ', { user_id: user_id, description: description, state: false }, function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'Task has been created successfully' } );
  });
});

app.put('/task/:id', function(req, res){
  let id = req.params.id;
  let state = req.query.state;
  let description = req.query.description;
  if ( !id || !state || !description ) { return res.status(400).send({ error: id, message: 'Please provide task state and task description' }); }
  db.query('UPDATE user_tasks SET state = ?, description = ? WHERE id = ?', [state, description, id], function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'Task has been updated successfully' } );
  });
});

app.delete('/task/:id', function(req, res) {
  let id = req.params.id;
  if ( !id ) { return res.status(400).send({ error: true, message: 'Please provide id' }); }
  db.query('DELETE FROM user_tasks WHERE id = ?', [ id ], function( error, results, fields) {
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'Task has been deleted successfully' } );
  });
});
//#endregion

app.listen( port, function() {
  console.log( `Tasks Microservice is running on port ${port}` );
});

module.exports = app;
