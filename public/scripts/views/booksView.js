"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    tmp = require('hb!templates/mybooks.hbs'),
    area_tmp = require('hb!templates/mybooks_area.hbs'),
    table_tmp = require('hb!templates/mybooks_table.hbs'),
    form_tmp = require('hb!templates/mybooks_form.hbs');

  return Backbone.View.extend({
    initialize: function (options) {
      this.books = options.books;
      this.books.on('sync', this.render, this);
      this.books.fetch({
        error: this.booksError
      });
    },

    getHeaders: function (dataArray) {
      var hcount = 0,
        headers = [];
      _.each(dataArray, function (object) {
        var objectKeys = _.keys(object);
        if (objectKeys.length > hcount) {
          headers = objectKeys;
          hcount = objectKeys.length;
        }
      });
      return headers;
    },

    booksError: function (collection, response, options) {
      console.error(response);
    },
    render: function () {
      this.$el.html(tmp());
      this.$el.append(form_tmp());
      this.$el.append(table_tmp({
        books: this.books.models
      }));
    }
  });
});
