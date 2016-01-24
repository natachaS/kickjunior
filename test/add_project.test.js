var expect = require('chai').expect;
var data = require('../lib/data/data');
var add_project = require('../lib/commands/add_project');
var errors = require('../lib/common/errors');

describe('Adding a project', function () {
  // Clear our datastore before running each test suite.
  beforeEach(function () {
    data.init();
  });

  it('should exist and be a function', function () {
    expect(add_project).to.exist;
    expect(add_project).to.be.a('function');
  });

  it('should not allow project names that are too short or too long', function () {
    var project_name_short = 'foo';
    var project_name_long = 'pneumonoultramicroscopicsilicovolcanoconiosi';
    var target_amount = '100000000';
    var add_short = add_project(project_name_short, target_amount);
    var add_long = add_project(project_name_long, target_amount);
    expect(add_short).to.eql(errors.INVALID_PROJECT_NAME);
    expect(add_long).to.eql(errors.INVALID_PROJECT_NAME);
  });

  it('should not allow an invalid dollar amount to be entered', function () {
    var project_name = 'foo3534';
    var target_amount = '100.1234';
    var add = add_project(project_name, target_amount);
    expect(add).to.eql(errors.INVALID_AMOUNT);
  });

  it('should not allow project names with non alphanumeric characters', function () {
    var project_name = 'wuzzzup!';
    var target_amount = '100000000';
    var add = add_project(project_name, target_amount);

    expect(add).to.eql(errors.INVALID_PROJECT_NAME);
  });

  it('adds a project to our in-memory data store', function () {
    var project_name = 'Potato_salad';
    var target_amount = '100000000';
    var expected_result = { target_amount: 100000000, pledges: [] };
    add_project(project_name, target_amount);

    expect(data.get_project('Potato_salad')).to.eql(expected_result);
  });

  it('does not add a project that was already added succesfully', function () {
    var project_name = 'Pebble_watch';
    var target_amount = '100000000';

    var add = add_project(project_name, target_amount);
    expect(add).to.eql('Added Pebble_watch project with target of $100,000,000');

    var add_again = add_project(project_name, target_amount);
    expect(add_again).to.eql(errors.PROJECT_ALREADY_ADDED);
  });

  it('adds a project with a target amount that contains decimals', function () {
    var project_name = 'oculus';
    var target_amount = '10.52';
    var add = add_project(project_name, target_amount);
    expect(data.get_project('oculus')).to.exist;
    expect(add).to.eql('Added oculus project with target of $10.52');
  });

  it('adds an amount with a target amount with commas', function () {
    var project_name = 'coolMovie';
    var target_amount = '11,000,000';
    var add = add_project(project_name, target_amount);

    expect(data.get_project('coolMovie')).to.exist;
    expect(add).to.eql('Added coolMovie project with target of $11,000,000');
  });
});
