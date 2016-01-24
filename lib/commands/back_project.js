var data = require('../data/data.js');
var vl= require('../common/validate');
var errors = require('../common/errors.js');
var format = require('../common/format');


function back_project (given_name, project_name, credit_card, backing_amount_string) {
  var result_message;

  if (!vl.validate_name(given_name) || !vl.validate_name(project_name)) {
    return errors.INVALID_NAME;
    }

  if (!vl.validate_card(credit_card)) {
    return errors.INVALID_CC;
  }

  if (!vl.validate_amount(backing_amount_string)) {
    return errors.INVALID_AMOUNT;
  }

  if (data.get_project(project_name) === undefined) {
    return errors.NON_EXISTENT_PROJECT;
  }

  if (data.check_cc(credit_card, given_name)) {
    return errors.CC_ALREADY_ADDED;
  }

  if (data.check_pledge(given_name, project_name)) {
    return errors.ALREADY_PLEDGED;
  }

  var backing_amount = Number(backing_amount_string.replace(/,/g, ''));
  data.add_pledge(given_name, project_name, credit_card, backing_amount);

  var formatted_amount = format.amount(backing_amount);
  result_message = given_name + ' backed project ' + project_name + ' for $' + formatted_amount;

  return result_message;
}

module.exports = back_project;
