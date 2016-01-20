var expect = require('chai').expect;
var data = require('../lib/data/data');
var errors = require('../lib/common/errors');
var list_backers = require('../lib/commands/list_backers');

describe('Listing all the backers for a specific project', function () {
  before(function () {
      var project_name = 'WebComics';
      var target_amount = '200';
      var backer_name_one = 'Natacha';
      var backer_name_two = 'Rebecca';
      var credit_card_one = '3337396323439158';
      var credit_card_two = '5120027532760961';
      var backing_amount = '50';
      data.init();
      data.add_project(project_name, target_amount);
      data.add_pledge(backer_name_one, project_name, credit_card_one, backing_amount);
      data.add_pledge(backer_name_two, project_name, credit_card_two, backing_amount);
    });


  it('should exist and be a function', function () {
    expect(list_backers).to.exist;
    expect(list_backers).to.be.a('function');
  });

  it('should return a list of all backers for one project', function () {
    var project_name = 'WebComics';
    var list = list_backers(project_name);

    expect(list).to.have.string(' -- Natacha backed for $50\n -- Rebecca backed for $50\n');
  });

  it('lets a user know how much a project needs to be succesful', function () {
    var project_name = 'WebComics';
    var list = list_backers(project_name);

    expect(list).to.have.string('WebComics needs $100 more dollars to be successful');
  });

  it('saves a backer object our project data store', function () {
      expect(data.get_project('WebComics').backers.length).to.eql(2);
  });

  it('lets a user know if a project is successful', function () {
    var project_name = 'WebComics';
    var target_amount = '200';
    var backer_name = 'BillyBob';
    var credit_card_one = '4532759003363827';
    var backing_amount = '100';
    var project_name = 'WebComics';
    data.add_pledge(backer_name, project_name, credit_card_one, backing_amount);

    var list = list_backers(project_name);
    expect(list).to.have.string('WebComics is successful');
  });

  it('should let the user know if a project does not exist', function () {
    var project_name = 'Sundance_movie';
    var args = {project_name: 'sundance_movie'};
    var list = list_backers(project_name);
    expect(list).to.eql(errors.NON_EXISTENT_PROJECT);
  });
});
