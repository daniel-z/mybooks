"use strict";

define(function (require, exports, module) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    MyBooksRouter = require('scripts/router');

  return {
    start: function () {
      Backbone.history.start();
      console.log('books app started!');
    }
  }
});

// (function ($, _) {

//   var selectors = {
//     apiworkForm: '#apiwork',
//     resultBox: 'textarea[name=results]',
//     resultTable: 'table.results'
//   }

//   var routesConfig = {
//     '/api/v1/books': {
//       'GET': {
//         data: null
//       }
//     },
//     '/api/v1/book': {
//       'GET': {
//         data: ['id']
//       },
//       'POST': {
//         data: 'all'
//       },
//       'PUT': {
//         data: 'all'
//       },
//       'DELETE': {
//         data: ['id']
//       }
//     }
//   };

//   function formToObject($form) {
//     var formObject = {}
//     _.each($form.find('input, select'), function (element, index) {
//       if ($(element).attr('type') !== 'submit') {
//         formObject[$(element).attr('name')] = $(element).val();
//       }
//     });
//     return formObject;
//   };

//   function getNeededDataForRequest(allData, routesConfig) {
//     var requestDataCfg = routesConfig[allData.url][allData.method],
//       requestData = _.omit(allData, ['method', 'url']);

//     if (_.isArray(requestDataCfg)) {
//       requestData = _.pick(requestData, requestDataCfg);
//     } else if (requestData === null) {
//       requestData = {}
//     }
//     return requestData;
//   }

//   function execute(formData, success, error, routesConfig) {
//     $.ajax({
//         url: formData.url,
//         type: formData.method,
//         data: getNeededDataForRequest(formData, routesConfig)
//       })
//       .done(function (msg) {
//         console.log(msg)
//         if (success) {
//           success(msg);
//         }

//       })
//       .fail(function (msg) {
//         console.log(msg)
//         if (error) {
//           error(msg);
//         }
//       });
//   };

//   function buildResultsTable(dataArray) {
//     if (dataArray.length === 0) {
//       return;
//     }

//     var getHeaders = function (dataArray) {
//       var hcount = 0,
//         headers = [];
//       _.each(dataArray, function (object) {
//         var objectKeys = _.keys(object);
//         if (objectKeys.length > hcount) {
//           headers = objectKeys;
//           hcount = objectKeys.length;
//         }
//       });
//       headers.unshift('Edit');
//       return headers;
//     }

//     function insertHeaders(headers) {
//       var $thead = $($(selectors.resultTable).find('thead')[0]),
//         $tr = $('<tr></tr>');

//       // clean headers
//       $thead.html('');

//       // insert new headers
//       _.each(headers, function (header) {
//         var $th = $('<th>' + header + '</th>');
//         $tr.append($th);
//       });

//       $thead.append($tr);
//       return;
//     };

//     function insertRows(headers, dataArray) {
//       var $tbody = $($(selectors.resultTable).find('tbody')[0]);
//       $tbody.html('');
//       _.each(dataArray, function (row) {
//         var $tr = $('<tr></tr>');

//         _.each(row, function (value, key) {
//           var $td = $('<td>' + value + '</td>');
//           $tr.append($td);
//         });
//         $tr.prepend($('<td  class="edit"><a>Edit</a></td>'));
//         $tbody.append($tr);
//       });
//       return;
//     }

//     var headers = getHeaders(dataArray);
//     insertHeaders(headers);
//     insertRows(headers, dataArray);

//     return;
//   }

//   function printTextArea(msg) {
//     $(selectors.resultTable).addClass('disabled');
//     $(selectors.resultBox).removeClass('disabled');
//     $(selectors.resultBox).val(msg);
//     return;
//   }

//   function printTable(msg) {
//     buildResultsTable(msg);
//     $(selectors.resultTable).removeClass('disabled');
//     $(selectors.resultBox).addClass('disabled');
//     return;
//   }

//   function ajaxResult(msg) {
//     msg = JSON.parse(msg);

//     if (!msg) {
//       return
//     } else if (_.isArray(msg)) {
//       printTable(msg)
//     } else {
//       printTextArea(msg)
//     }
//     return;
//   };

//   $(selectors.apiworkForm).on('submit', function (event) {
//     event.preventDefault();
//     execute(formToObject($(selectors.apiworkForm)), ajaxResult, ajaxResult, routesConfig);
//     return;
//   })

// });
