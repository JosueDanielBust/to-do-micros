let port = 3000;

let express = require('express');
let app = express();

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  res.sendFile( '/templates/index.html', { root : __dirname } );
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry, that route doesn\'t exist.');
});


app.listen( port, function() {
  console.log( `UI Microservice is running on port ${port}` );
});

module.exports = app;
