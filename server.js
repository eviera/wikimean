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

  app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
  });

  console.log('Server ready and listening on port 3000...');

  app.listen(3000);
});
