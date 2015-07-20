
module.exports = function(app, route) {

  //Devuelve el estado de edicion del server
  return function(req, res, next) {
    res.json({isEditMode : app.isEditMode});
  };
};
