"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    BooksCollection = require('scripts/collections/booksCollection'),
    BooksView = require('scripts/views/booksView');

  return Backbone.Router.extend({
    routes: {
      '': 'myBooks'
    },

    myBooks: function () {
      console.log('navigate root');

      var myBooksCollection = new BooksCollection();
      var myBooksView = new BooksView({
        el: '#myBooksApp',
        books: myBooksCollection
      });
    }

  });
});
