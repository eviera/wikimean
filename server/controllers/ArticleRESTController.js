var restful = require('node-restful');

module.exports = function(app, route) {

  /*
   * Para ver como limitar queries, ordenar, etc, ver https://github.com/baugarten/node-restful
   *
   * Por ejemplo para traer solo 5 articulos, ordenados por titulo descendente, usar:
   * (NO ESTOY SEGURO SI IMPORTA EL ORDEN DE LOS COMANDOS)
   *
   *  /article?limit=3&sort=-title
   *
   */
  var rest = restful.model(
    'article',
    app.models.article                          //se le pasa el scheme
  ).methods(['get', 'post', 'put']);

  //Ejecuta autenticacion antes del post
  rest.before('post', checkAuth).before('put', checkAuth);

/*
  casi seguro que en lugar de llamar a checkAuth podria llamar a passport.authenticate
*/

  function checkAuth(req, res, next) {
    if (app.isEditMode) {
      next();
    } else {
      console.log('Se llamo a [' + req.method + '] pero la app no esta en modo edit');
      res.status(401).send('No esta autorizado a ejecutar [' + req.method + ']');
    }
  }




  /*

  ESTE CODIGO MUESTRA COMO HACER UN QUERY MANUAL, PERO CASI NO ES NECESARIO YA QUE EL NODE-RESTFUL CUBRE MUCHOS CASOS
  DE USARSE ESTE CODIGO HAY QUE AGREGAR ARRIBA: var mongoose = require('mongoose');

  //Agrega la ruta /article/finder_last10 para el query customizado
  rest.route('finder_last10', function(req, res, next) {

    //Le pido el modelo al scheme para poder ejecutar el query
    var Article = mongoose.model('Article', app.models.article);

    Article.find().limit(10).exec(function(err, articles) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(articles); // return all todos in JSON format
    });
  });
  */



  // Register this endpoint with the application.
  rest.register(app, route);

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
