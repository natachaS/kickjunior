var expect = require('chai').expect;
var back_project = require('../lib/commands/back_project');
var errors = require('../lib/common/errors');
var data = require('../lib/data/data');

describe('Backing a project', function () {
  beforeEach(function () {
    var project_name = 'Pebble_watch';
    var target_amount = '1000000';
    data.init();
    data.add_project(project_name, target_amount);
  });

  it('should exist and be a function', function () {
    expect(back_project).to.exist;
    expect(back_project).to.be.a('function');
  });

  it('should not allow an invalid name to be entered', function () {
    var given_name = 'Nat';
    var project_name = 'Pebble_watch';
    var credit_card = '4716268306224478';
    var backing_amount = '50';
    var backing = back_project(given_name, project_name, credit_card, backing_amount);

    expect(backing).to.eql(errors.INVALID_NAME);
  });

  it('should let the user know if the project does not exist', function () {
    var given_name = 'Aylana';
    var project_not_added = 'Random007';
    var credit_card = '4716268306224478';
    var backing_amount = '50';
    var backing = back_project( given_name, project_not_added, credit_card, backing_amount);

    expect(backing).to.eql(errors.NON_EXISTENT_PROJECT);
  });

  it('should not allow an invalid credit card number to be entered', function () {
    var given_name = 'Natacha';
    var project_name = 'Pebble_watch';
    var invalid_credit_card = '4716268306324478';
    var backing_amount = '50';
    var backing = back_project( given_name, project_name, invalid_credit_card, backing_amount);

    expect(backing).to.eql(errors.INVALID_CC);
  });

  it('should let the user know if his card is already in the system', function () {
    var user_one = 'Natacha';
    var user_two = 'Stephanie';
    var project_name = 'Pebble_watch';
    var credit_card = '348234301496226';
    var backing_amount = '50';
    var backing = back_project( user_one, project_name, credit_card, backing_amount);
    var back_same_cc = back_project( user_two, project_name, credit_card, backing_amount);

    expect(backing).to.have.string('backed');
    expect(back_same_cc).to.eql(errors.CC_ALREADY_ADDED);
  });

  it('adds a backer to the data store', function () {
    var user = 'Aaron';
    var project_name = 'Pebble_watch';
    var credit_card = '372763991372080';
    var backing_amount = '50';

    back_project( user, project_name, credit_card, backing_amount);
    expect(data.get_backer('Aaron')).to.exist;
    expect(data.get_backer('Aaron').length).to.eql(1);
  });

  it('does not let a user back a project twice', function () {
    var user = 'Aaron';
    var project_name = 'Pebble_watch';
    var credit_card = '5292420119448856';
    var backing_amount = '50';

    back_project( user, project_name, credit_card, backing_amount);
    var back_again = back_project( user, project_name, credit_card, backing_amount);
    expect(back_again).to.eql(errors.ALREADY_PLEDGED);
  });
});
