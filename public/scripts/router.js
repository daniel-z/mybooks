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
      'add/': 'addBook',
    },

    myBooks: function () {
      var myBooksCollection = new BooksCollection();
      var booksView = new BooksView({
        books: myBooksCollection
      })
      this.loadView(booksView);
      return;
    },

    editBook: function (id) {
      console.log('navigate edit book');
      var that = this;
      if (!id) {
        console.error('book id needed');
        return;
      }

      var myBook = new BookModel({
        id: id
      });

      var bookView = new BookView({
        book: myBook
      })

      bookView.listenTo(myBook, 'destroy', function () {
        that.navigate("", true);
      });

      this.loadView(bookView);

      return;
    },

    addBook: function () {
      console.log('navigate add book');
      var that = this;

      var myBook = new BookModel();

      var bookView = new BookView({
        book: myBook
      })

      this.loadView(bookView);

      return;
    },
    loadView: function (view) {
      this.view && this.view.remove();
      this.view = view;
    }

  });
});
