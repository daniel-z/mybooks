'use strict';

var BooksCollection = Backbone.Collection.extend({
  model: BookModel,
  url: '/api/v1/books'
})
