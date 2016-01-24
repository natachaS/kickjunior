var data = require('../data/data.js');
var vl= require('../common/validate');
var forEach = require('lodash.foreach');
var errors = require('../common/errors');
var format = require('../common/format');

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

  if (data.get_project(project_name).pledges === []) {
    return errors.PROJECT_NOT_BACKED;
  }

  forEach(data.get_project(project_name).pledges, function (obj) {
    var pledge = data.get_pledge(obj);
    funding += pledge.amount;

    var formatted_amount = format.amount(pledge.amount);
    sentence = ' -- ' + pledge.name + ' backed for $' + formatted_amount + '\n';
    result += sentence;
  });

  var target_amount = data.get_project(project_name).target_amount;

  if (funding >= target_amount) {
    result += project_name + ' is successful';
  } else {
    var diff = target_amount - funding;
    var formatted_diff = format.amount(diff);
    result += project_name + ' needs $' + formatted_diff + ' more dollars to be successful';
  }
  return result;
}

module.exports = list_backers;
