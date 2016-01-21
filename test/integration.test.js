var evaluate = require('../lib/commands/evaluate');
var errors = require('../lib/common/errors');
var data = require('../lib/data/data');
var expect = require('chai').expect;

describe('The Kickjunior application', function () {
  before(function (){
    data.init();
  });
// for this integration testing i will be using the examples provided.
  it('adds Awesome_Sauce with a target of 500', function () {
    var command = 'project Awesome_Sauce 500';
    expect(evaluate(command)).to.eql('Added Awesome_Sauce project with target of $500');
  });

  it('adds a pledge to Awesome_Sauce', function () {
    var command = 'back John Awesome_Sauce 4111111111111111 50';
    expect(evaluate(command)).to.eql('John backed project Awesome_Sauce for $50');
  });

  it('sends an error when an invalid card is used for a pledge', function () {
    var command = 'back Sally Awesome_Sauce 1234567890123456 10';
    expect(evaluate(command)).to.eql(errors.INVALID_CC);
  });

  it('sends an error when the card was already used', function () {
    var command = 'back Jane Awesome_Sauce 4111111111111111 50';

    expect(evaluate(command)).to.eql(errors.CC_ALREADY_ADDED);
  });

  it('lists the pledges for a projects', function () {
    var command = 'list Awesome_Sauce';
    var expected_result = ' -- John backed for $50\nAwesome_Sauce needs $450 more dollars to be successful';

    expect(evaluate(command)).to.eql(expected_result);
  });

  it('lists the pledges of a user', function () {
    var command = 'backer John';
    var expected_result = ' -- Backed Awesome_Sauce for $50\n';

    expect(evaluate(command)).to.eql(expected_result);
  });
});
