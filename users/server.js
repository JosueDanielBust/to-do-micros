let port = 3001;

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
  database: 'users'
});
db.connect();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

//#region Root path
app.get('/', function(req, res) {
  return res.send( { error: true, message: 'Users Microservice' } );
});
//#endregion

//#region MySQL CRUD
app.get('/users', function(req, res) {
  db.query( 'SELECT * FROM users', function( error, results, fields) {
    if (error) throw error;
    return res.send( { error: false, data: results } );
  });
});

app.get('/user/:id', function(req, res) {
  let id = req.params.id;
  if ( !id ) { return res.status(400).send({ error: true, message: 'Please provide id' }); }
  db.query('SELECT * FROM users WHERE id = ?', [ id ], function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results[0] } );
  });
});

app.post('/user', function(req, res){
  let name = req.query.name;
  if ( !name ) { return res.status(400).send({ error: true, message: 'Please provide user' }); }
  db.query('INSERT INTO users SET ? ', { name: name }, function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'User has been created successfully' } );
  });
});

app.put('/user/:id', function(req, res){
  let id = req.params.id;
  let name = req.query.name;
  if ( !id || !name ) { return res.status(400).send({ error: name, message: 'Please provide user and id' }); }
  db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], function( error, results, fields ){
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'User has been updated successfully' } );
  });
});

app.delete('/user/:id', function(req, res) {
  let id = req.params.id;
  if ( !id ) { return res.status(400).send({ error: true, message: 'Please provide id' }); }
  db.query('DELETE FROM users WHERE id = ?', [ id ], function( error, results, fields) {
    if (error) throw error;
    return res.send( { error: false, data: results, message: 'User has been deleted successfully' } );
  });
});
//#endregion

app.listen( port, function() {
  console.log( `Users Microservice is running on port ${port}` );
});

module.exports = app;
