var add_project = require('./add_project');
var back_project = require('./back_project');
var list_backers = require('./list_backers');
var get_backer_pledges = require('./get_backer_pledges');
var errors = require('../common/errors');

function evaluate (input) {
  if (typeof(input)!== 'string') {
     return errors.INPUT_ERROR;
   }

  var arr = input.replace(/\s+/g,' ').split(' ');

  if (arr[0] === 'project'){
    if (arr.length !== 3){
      return errors.INCORRECT_NUMBER_OF_ARGS;
    }
    return add_project(arr[1], arr[2]);
  }
  if (arr[0] === 'back'){
    if (arr.length !== 5) {
      return errors.INCORRECT_NUMBER_OF_ARGS;
    }
    return back_project(arr[1], arr[2], arr[3], arr[4]);
  }

  if (arr[0] === 'backer'){
    if (arr.length !== 2) {
      return errors.INCORRECT_NUMBER_OF_ARGS;
    }
    return get_backer_pledges(arr[1]);
  }

  if (arr[0] === 'list'){
    if (arr.length !== 2){
      return errors.INCORRECT_NUMBER_OF_ARGS;
    }
    return list_backers(arr[1]);
  }
  return errors.INPUT_ERROR;
}

module.exports = evaluate;
