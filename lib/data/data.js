var crypto = require('crypto');
var uuid = require('node-uuid');
var forEach = require('lodash.foreach');
var cloneDeep = require('lodash.clonedeep');
var _data;

function init() {
  _data = {
    /* map of project name to associated properties
     * {
     *   'awesome_sauce':
     *   {
     *     target_amount: <number>,
     *
     *     // array of uuids to lookup each pledge in _data.pledges
     *     pledges: [ <uuid>, <uuid>, ... ]
     *   },
     *   ...
     * }
     */
    projects: {},

    /* map of backer name to an array of pledges
     * used to tell backers what they've backed
     * {
     *   // array of uuids to lookup each pledge in _data.pledges
     *   'arya': [ <uuid>, <uuid>, ... ],
     *   'tywin': ...
     * }
     */
    backers: {},

    /* central map of metadata for each pledge, indexed by a uuid
     * each pledge is defined as a triple, i.e.:
     * {
     *   '88cb0d77-1fc7-47de-85ef-cac89795d07a':
     *     {
     *       name: <string>,
     *       project: <string>,
     *       amount: <number>
     *     }
     *   '7b85a244-cfe7-4b1e-9760-bd67217539df':
     *     ...
     * }
     */
    pledges: {},

    /* map of encrypted credit cards to backer_name:
     * {
     *   '2893u23h23092830923adfadfa092': 'arya',
     *   '49834938498394839483984938493493': 'tywin',
     *   ...
     * }
     */
    cards: {}
  };
  return _data;
}

function add_project (project_name, target_amount) {
  _data.projects[project_name] = { target_amount: target_amount,
                                   pledges: []
                                 };
  // return _data;
}

function _encrypt (credit_card) {
  var encrypted_cc = crypto.createHash('md5').update(credit_card).digest('hex');
  return encrypted_cc;
}

function _add_cc (given_name, credit_card) {
  var encrypted_cc = _encrypt(credit_card);
  _data.cards[encrypted_cc] = given_name;
  // return _data;
}

function add_pledge (given_name, project_name, credit_card, backing_amount) {
  var id = uuid.v4();
  _data.pledges[id] = { name: given_name,
                        project: project_name,
                        amount: backing_amount
                      };

  if (_data.backers[given_name] === undefined) {
    _data.backers[given_name] = [];
  }
  _data.backers[given_name].push(id);
  _data.projects[project_name].pledges.push(id);
  _add_cc(given_name, credit_card);
  // return _data;
}

function get_pledge (id) {
  return cloneDeep(_data.pledges[id]);
}

function get_project (project_name) {
  return cloneDeep(_data.projects[project_name]);
};

function get_backer (given_name) {
  return cloneDeep(_data.backers[given_name]);
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
