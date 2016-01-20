var crypto = require('crypto');
var uuid = require('node-uuid');
var forEach = require('lodash.foreach');
var _data;

function init() {
  _data = {
    pledges: {},
    projects: {},
    backers: {},
    cards: {}
  };
  return _data;
}

function add_project (project_name, target_amount) {
  _data.projects[project_name] = { target_amount: target_amount,
                                   backers: []
                                  };
  return _data;
}

function _encrypt (credit_card) {
  var encrypted_cc = crypto.createHash('md5').update(credit_card).digest('hex');
  return encrypted_cc;
}

function _add_cc (given_name, credit_card) {
  var encrypted_cc = _encrypt(credit_card);
  _data.cards[encrypted_cc] = given_name;
  return _data;
}

function add_pledge (given_name, project_name, credit_card, backing_amount) {
  var identifier = uuid.v4();
  _data.pledges[identifier] = { name: given_name,
                                project: project_name,
                                amount: backing_amount
                              };

  if (_data.backers[given_name] !== undefined) {
    _data.backers[given_name].push(identifier);
  } else {
    _data.backers[given_name] = [];
    _data.backers[given_name].push(identifier);
  }

  _data.projects[project_name].backers.push(identifier);
  _add_cc(given_name, credit_card);
  return _data;
}

function get_pledge (identifier) {
  return _data.pledges[identifier];
}

function get_project (project_name) {
  return _data.projects[project_name] ? _data.projects[project_name] : undefined;
};

function get_backer (given_name) {
  return _data.backers[given_name];
};
// returns true is a card is already entered by another user
function check_cc (credit_card, given_name) {
  var encrypted_cc = _encrypt(credit_card);
  if (_data.cards[encrypted_cc] !== undefined) {
    return (_data.cards[encrypted_cc].localeCompare(given_name) !== 0);
  } else {
    return false;
  }
}

function check_pledge (user, project) {
  var result = false;
  forEach(_data.pledges, function (pledge) {
    if (pledge.name === user && pledge.project === project) {
      result = true;
    }
  });
  return result;
}

module.exports = {
  init: init,
  add_project: add_project,
  get_project: get_project,
  add_pledge: add_pledge,
  check_pledge: check_pledge,
  get_pledge: get_pledge,
  get_backer: get_backer,
  check_cc: check_cc
};
