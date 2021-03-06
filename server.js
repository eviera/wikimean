var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var requestIp = require('request-ip');
var winston = require('winston');


var logEnv = process.env.NODE_ENV || 'development';
var logger = new (winston.Logger)({
   transports: [
     new (winston.transports.Console)(),
     new (winston.transports.File)({ filename: 'log/wikimean.' + logEnv + '.log' })
   ]
 });

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

//Puerto
app.listenPort = process.argv[2] || 8000;

//Ve si el server fue levantado en modo edit
app.isEditMode = process.argv[3] == 'edit';

// Connect to MongoDB
mongoose.connect('mongodb://localhost/wikimean');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./server/models/index');

  //Log
  app.use(function(req, res, next) {
    var clientIp = requestIp.getClientIp(req);
    logger.info("Connction from [" + clientIp + "] for [" + req.url + "]");
    next();
  });

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
      logger.info("Method [" + req.method + "], statusCode ["  + res.statusCode + "], url [" + req.url + "]")
      res.json({
      	error: 'Not found'
      });
      return;
  });

  // error handlers
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      logger.error("Method [" + req.method + "], statusCode ["  + res.statusCode + "], message [" + err.message + "]")
      res.json({
      	error: err.message
      });
      return;
  });

  logger.info('Server listo en puerto [' + app.listenPort + ']. Modo edit: [' + app.isEditMode + ']. Entorno [' + process.env.NODE_ENV + ']');

  app.listen(app.listenPort);
});
