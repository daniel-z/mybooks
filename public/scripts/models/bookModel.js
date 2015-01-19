'use strict';

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.Model.extend({
    initialize: function (options) {},
    url: function () {
      var bookId = this.get('id'),
        url = '/api/v1/books/';
      if (bookId) {
        url += bookId;
      }
      return url;
    },
    parse: function (data) {
      data.id = data._id;
      return data;
    }
  });
});
