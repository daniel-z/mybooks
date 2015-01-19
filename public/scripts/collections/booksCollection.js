'use strict';

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    BookModel = require('scripts/models/bookModel');

  return Backbone.Collection.extend({
    model: BookModel,
    url: '/api/v1/books'
  })
});
