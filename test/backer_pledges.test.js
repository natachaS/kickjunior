var expect = require('chai').expect;
var data = require('../lib/data/data');
var errors = require('../lib/common/errors');
var get_backer_pledges = require('../lib/commands/get_backer_pledges');

describe('Listing all projects backed by a user', function () {
  before(function () {
    var project_name = 'Pebble_watch';
    var backer_name = 'Natacha';
    var credit_card = '4716268306224478';
    var backing_amount = '500';
    data.init();
    data.add_project(project_name);
    data.add_pledge(backer_name, project_name, credit_card, backing_amount);
  });

  it('should exist and be a function', function () {
    expect(get_backer_pledges).to.exist;
    expect(get_backer_pledges).to.be.a('function');
  });

  it('should return a list of all backed projects for one user', function () {
    var backer_name = 'Natacha';
    var pledges = get_backer_pledges(backer_name);
      expect(pledges).to.eql(' -- Backed Pebble_watch for $500\n');
  });

  it('should return an error if the user does not exist', function () {
    var unknown_user = 'Elliott'
    var unknown = get_backer_pledges(unknown_user);
    expect(unknown).to.eql(errors.NON_EXISTENT_USER);
  });
});
