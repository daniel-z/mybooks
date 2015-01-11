'use strict';

var Books = Backbone.Collection.extend({
  model: Book,
  url: '/api/v1/books',
  initialize: function () {}
})
