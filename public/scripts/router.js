"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    BooksCollection = require('scripts/collections/booksCollection'),
    BookModel = require('scripts/models/bookModel'),
    BooksView = require('scripts/views/booksView'),
    BookView = require('scripts/views/bookView');

  return Backbone.Router.extend({
    routes: {
      '': 'myBooks',
      'edit/:id': 'editBook',
    },

    myBooks: function () {
      var myBooksCollection = new BooksCollection();
      this.loadView(new BooksView({
        books: myBooksCollection
      }));
      return;
    },

    editBook: function (id) {
      console.log('navigate edit book');

      if (!id) {
        console.error('book id needed');
        return;
      }

      var myBook = new BookModel({
        id: id
      });

      this.loadView(new BookView({
        book: myBook
      }));

      return;
    },

    loadView: function (view) {
      this.view && this.view.remove();
      this.view = view;
    }

  });
});
