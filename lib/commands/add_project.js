var data = require('../data/data.js');
var errors = require('../common/errors.js');
var vl = require('../common/valid');

function add_project (project_name, target_amount) {
  var target = target_amount.replace(/,/g, '');
  var result_message;

  if (!vl.validate_name(project_name)) {
    return errors.INVALID_PROJECT_NAME;
  }

  if (!vl.validate_amount(target_amount)) {
    return errors.INVALID_AMOUNT;
  }

  if (data.get_project(project_name) !== undefined) {
    return errors.DUPLICATE_PROJECT;
  }

  target = vl.format_number(target);
  data.add_project(project_name, target);
  result_message = 'Added ' + project_name + ' project with target of $' + target;
  return result_message;
}

module.exports = add_project;
