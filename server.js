var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();

// set the static files location /client/img will be /img for users
app.use(express.static(__dirname + '/client'));


// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Ve si el server fue levantado en modo edit
app.isEditMode = process.argv.slice(2) == 'edit';


// Connect to MongoDB
mongoose.connect('mongodb://localhost/wikimean');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./server/models/index');

  // Load the routes.
  var routes = require('./server/routes');
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route));
  });

  // Ruta por default
  app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
  });


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
      res.status(404);
      console.log("DEBUG method [" + req.method + "], statusCode ["  + res.statusCode + "], url [" + req.url + "]")
      res.json({
      	error: 'Not found'
      });
      return;
  });

  // error handlers
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      console.log("ERROR method [" + req.method + "], statusCode ["  + res.statusCode + "], message [" + err.message + "]")
      res.json({
      	error: err.message
      });
      return;
  });

  console.log('Server listo en puerto 3000. Modo edit: [' + app.isEditMode + ']. Entorno [' + process.env.NODE_ENV + ']');

  app.listen(3000);
});
