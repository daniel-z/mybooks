"use strict";

(function ($, _) {
  var selectors = {
    apiworkForm: '#apiwork',
    resultBox: 'textarea[name=results]',
    resultTable: 'table.results'
  }

  function formToObject($form) {
    var formObject = {}
    _.each($form.find('input, select'), function (element, index) {
      if ($(element).attr('type') !== 'submit') {
        formObject[$(element).attr('name')] = $(element).val();
      }
    });
    return formObject;
  };

  function execute(formData, success, error) {
    $.ajax({
        type: formData.method,
        url: formData.url,
        data: _.omit(formData, ['method', 'url'])
      })
      .done(function (msg) {
        console.log(msg)
        if (success) {
          success(msg);
        }

      })
      .fail(function (msg) {
        console.log(msg)
        if (error) {
          error(msg);
        }
      });
  };

  function buildTable(dataArray) {
    if (dataArray.length === 0) {
      return;
    }

    var getHeaders = function (dataArray) {
      var hcount = 0,
        headers = [];
      _.each(dataArray, function (object) {
        var objectKeys = _.keys(object);
        if (objectKeys.length > hcount) {
          console.log(headers);
          headers = objectKeys;
          hcount = objectKeys.length;
        }
      });
      return headers;
    }

    function insertHeaders(headers) {
      var $thead = $($(selectors.resultTable).find('thead')[0]),
        $tr = $('<tr></tr>');

      // clean headers
      $thead.html('');

      // insert new headers
      _.each(headers, function (header) {
        var $th = $('<th>' + header + '</th>');
        $tr.append($th);
      });

      $thead.append($tr);
      return;
    };

    function insertRows(headers, dataArray) {
      var $tbody = $($(selectors.resultTable).find('tbody')[0]);
      $tbody.html('');
      _.each(dataArray, function (row) {
        var $tr = $('<tr></tr>');

        _.each(row, function (value, key) {
          var $td = $('<td>' + value + '</td>');
          $tr.append($td);
        });

        $tbody.append($tr);
      });
      return;
    }

    var headers = getHeaders(dataArray);
    insertHeaders(headers);
    insertRows(headers, dataArray);

    return;
  }

  function printTextArea(msg) {
    $(selectors.resultTable).addClass('disabled');
    $(selectors.resultBox).removeClass('disabled');
    $(selectors.resultBox).val(msg);
    return;
  }

  function printTable(msg) {
    buildTable(msg);
    $(selectors.resultTable).removeClass('disabled');
    $(selectors.resultBox).addClass('disabled');
    return;
  }

  function ajaxResult(msg) {
    msg = JSON.parse(msg);

    if (!msg) {
      return
    } else if (_.isArray(msg)) {
      printTable(msg)
    } else {
      printTextArea(msg)
    }
    return;
  };

  $(selectors.apiworkForm).on('submit', function (event) {
    event.preventDefault();
    execute(formToObject($(selectors.apiworkForm)), ajaxResult, ajaxResult);
    return;
  })

})(jQuery, _);
