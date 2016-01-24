var data = require('../data/data.js');
var errors = require('../common/errors.js');
var vl = require('../common/validate');
var format = require('../common/format');

function add_project (project_name, target_amount_string) {
  var result_message;

  if (!vl.validate_name(project_name)) {
    return errors.INVALID_PROJECT_NAME;
  }

  if (!vl.validate_amount(target_amount_string)) {
    return errors.INVALID_AMOUNT;
  }

  if (data.get_project(project_name) !== undefined) {
    return errors.DUPLICATE_PROJECT;
  }

  var target_amount = Number(target_amount_string.replace(/,/g, ''));
  data.add_project(project_name, target_amount);

  var formatted_amount = format.amount(target_amount);
  result_message = 'Added ' + project_name + ' project with target of $' + formatted_amount;
  return result_message;
}

module.exports = add_project;
