'use strict';

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.Model.extend({
    initialize: function (options) {},
    url: '/api/v1/book',
    parse: function (data) {
      data.id = data._id;
      return data;
    }
  });
});
