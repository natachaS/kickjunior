var data = require('../data/data.js');
var vl= require('../common/validate');
var forEach = require('lodash.foreach');
var errors = require('../common/errors');
var format_number = require('../common/format');

function list_backers (project_name) {
  var result = '';
  var funding = 0;
  var sentence = '';

  if (!vl.validate_name(project_name)) {
    return errors.INVALID_PROJECT_NAME;
  }
  if (data.get_project(project_name) === undefined) {
    return errors.NON_EXISTENT_PROJECT;
  }

  if (data.get_project(project_name).backers === []) {
    return errors.PROJECT_NOT_BACKED;
  }

  forEach(data.get_project(project_name).backers, function (obj) {
    var pledge = data.get_pledge(obj);
    funding += Number(pledge.amount);
    var formattedAmount = format_number(pledge.amount);
    sentence = ' -- ' + pledge.name + ' backed for $' + formattedAmount + '\n';
    result += sentence;
  });

  var target_number = Number(data.get_project(project_name).target_amount);

  if (funding >= target_number) {
    result += project_name + ' is successful';
  } else {
    var diff = target_number - funding;
    var formattedDiff = format_number(diff);
    result += project_name + ' needs $' + formattedDiff + ' more dollars to be successful';
  }
  return result;
}

module.exports = list_backers;
