module.exports = function(app) {
  var router = require('express').Router();

  // Get a list of all books
  router.get('/', function(request, response) {
    return app.database.models.book.find(function(err, books) {
      if (!err) {
        return response.json(books);
      } else {
        return console.log(err);
      }
    });
  });

  router.get('/:id', function(request, response) {
    response.send(request.params.id);
  });

  return router;
};