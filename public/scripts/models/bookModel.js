'use strict';

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.Model.extend({
    initialize: function (options) {},
    url: function () {
      return '/api/v1/books/' + this.get('id')
    },
    parse: function (data) {
      data.id = data._id;
      return data;
    }
  });
});
