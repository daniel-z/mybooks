var router = require('express').Router();

module.exports = function(database) {
  // Get a list of all books
  router.get('/', function(request, response) {
    return database.models.book.find(function(err, books) {
      if (!err) {
        return response.send(books);
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