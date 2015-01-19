"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    table_tmp = require('hb!templates/mybooks_table.hbs');

  return Backbone.View.extend({
    tagName: 'section',
    id: '#myBooks',
    initialize: function (options) {
      this.books = options.books;

      this.listenTo(this.books, 'sync', this.render);
      this.listenTo(this.books, 'destroy', this.remove);

      this.books.fetch({
        error: this.booksError
      });
    },

    booksError: function (collection, response, options) {
      console.error(response);
    },

    render: function () {
      this.$el.html(table_tmp({
        books: this.books.models
      }));

      $('body').append(this.$el);
      return this;
    }
  });
});
