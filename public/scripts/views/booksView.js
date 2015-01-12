"use strict";

var BooksView = Backbone.View.extend({
  initialize: function (options) {
    this.books = options.books;
    this.books.on('sync', this.render, this);
    this.books.fetch({
      error: this.booksError
    });
  },
  booksError: function (collection, response, options) {
    console.error(response);
  },
  render: function () {
    console.log('render view!');
  }
});
