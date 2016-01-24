var forEach = require('lodash.foreach');
var data = require('../data/data.js');
var vl = require('../common/validate');
var errors = require('../common/errors.js');
var format = require('../common/format');

function get_backer_pledges ( backer) {
  var result_message = '';

  if (!vl.validate_name(backer)) {
    return errors.INVALID_BACKER_NAME;
  }

  if (data.get_backer(backer) === undefined) {
    return errors.NON_EXISTENT_USER;
  }

  forEach(data.get_backer(backer),function (obj) {
    var pledge = data.get_pledge(obj);
    var formatted_amount = format.amount(pledge.amount);
    result_message += ' -- Backed ' + pledge.project + ' for $' + formatted_amount + '\n';
  });

  return result_message;
};

module.exports = get_backer_pledges;
