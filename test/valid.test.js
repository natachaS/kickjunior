var expect = require('chai').expect;
var vl = require('../lib/common/validate');

describe('The validation and formatting module', function () {
  describe('Validating the credit card number', function () {
    it('should exist and be a function', function () {
      expect(vl.validate_card).to.exist;
      expect(vl.validate_card).to.be.a('function');
    });

    it('should return false if the credit card length is too long or too short', function () {
      expect(vl.validate_card('123')).to.eql.false;
      expect(vl.validate_card('1232222222222346341')).to.eql.false;
    });

    it('should perform the luhn-10 check', function () {
      expect(vl.validate_card('4716268306224478')).to.eql.true;
      expect(vl.validate_card('47162')).to.eql.false;
    });
  });

  describe('Validating names', function () {

    it('should exist and be a function', function () {
      expect(vl.validate_name).to.exist;
      expect(vl.validate_name).to.be.a('function');
    });

    it('should return false if the name length is too long or too short', function () {
      expect(vl.validate_name('Joe')).to.eql.false;
      expect(vl.validate_name('Jean_Edith_Simpson_the_third')).to.eql.false;
    });

    it('should check for non alphanumeric characters', function () {
      expect(vl.validate_name('Natacha!')).to.eql.false;
    });
  });

  describe('Validating dollar amounts', function () {

    it('should exist and be a function', function () {
      expect(vl.validate_amount).to.exist;
      expect(vl.validate_amount).to.be.a('function');
    });

    it('should return true if the amount contains 2 decimals', function () {
      expect(vl.validate_amount('10.555')).to.eql.false;
      expect(vl.validate_amount('10.55')).to.be.true;
    });

    it('should check for letters', function () {
      expect(vl.validate_amount('123go')).to.be.false;
    });
  });
});
