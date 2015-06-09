var restful = require('node-restful');

module.exports = function(app, route) {

  // Setup the controller for REST.
  var rest = restful.model(
    'article',
    app.models.article
  ).methods(['get', 'put', 'post', 'delete']);

  rest.route('finder', function(req, res, next) {
    res.send('la caca');
  });

  // Register this endpoint with the application.
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};