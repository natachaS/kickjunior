var expect = require('chai').expect;
var data = require('../lib/data/data');


describe('The data store API', function () {

  describe('The init function', function () {
    it('should exist and be a function', function () {
      expect(data.init).to.exist;
      expect(data.init).to.be.a('function');
    });

    it('should clear the data store', function () {
      var _data = { projects: {},
                    backers: {},
                    pledges: {},
                    cards: {}
                  };
      var obj = data.init();
      expect(obj).to.eql(_data);
    });
  });

  describe('Getting and Setting data', function () {
    before(function () {
      var project_name = 'WebComics';
      var target_amount = '200';
      var given_name = 'EllaRose';
      var credit_card = '3337396323439158';
      var backing_amount = '1000';
      data.init();
      data.add_project(project_name, target_amount);
      data.add_pledge(given_name, project_name, credit_card, backing_amount);
    });

    it('adds and returns a project object', function () {
      expect(data.get_project('WebComics')).to.be.an.object;
      expect(data.get_project('WebComics').target_amount).to.eql('200');
      expect(data.get_project('WebComics').backers.length).to.eql(1);
    });

    it('adds and returns a backer object', function () {
      expect(data.get_backer('EllaRose')).to.exist;
      expect(data.get_backer('EllaRose').length).to.eql(1);
    });

    it('checks if a credit card is already entered', function () {
      expect(data.check_cc).to.exist;
      expect(data.check_cc('3337396323439158', 'EllaRose')).to.be.false
    });

    it('checks if a user already pledged to a project', function () {
      expect(data.check_pledge).to.exist;
      expect(data.check_pledge('EllaRose', 'WebComics')).to.be.true
    });
  });
});
