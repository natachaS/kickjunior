var evaluate = require('../lib/commands/evaluate');
var errors = require('../lib/common/errors');
var expect = require('chai').expect;
var data = require('../lib/data/data');


describe('The command evaluate', function () {
  before(function () {
    data.init();
  });
  it('should exist and be a function', function () {
    expect(evaluate).to.exist;
    expect(evaluate).to.be.a('function');
  });

  it('parses a string', function () {
    expect(evaluate(1234)).to.eql(errors.INPUT_ERROR);
  });

  it('returns an input error if it does not recognize the command', function () {
    expect(evaluate('say hello')).to.eql(errors.INPUT_ERROR);
  });

  it('lets the user know if too many arguments have been entered for one command', function () {
    expect(evaluate('project awesome project 20')).to.eql(errors.INCORRECT_NUMBER_OF_ARGS);
    expect(evaluate('back James awesome 22222211321212132 20 and 30')).to.eql(errors.INCORRECT_NUMBER_OF_ARGS);
    expect(evaluate('list Awesome Sauce')).to.eql(errors.INCORRECT_NUMBER_OF_ARGS);
    expect(evaluate('backer Max Levy')).to.eql(errors.INCORRECT_NUMBER_OF_ARGS);
  });
});
