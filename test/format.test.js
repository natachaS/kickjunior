var expect = require('chai').expect;
var format = require('../lib/common/format');

describe('Formatting a number', function () {

	it('should exist and be a function', function () {
		expect(format.amount).to.exist;
		expect(format.amount).to.be.a('function');
	});

	it('should be a language sensitive representation of a number', function () {
		expect(format.amount(100000.34)).to.eql('100,000.34');
	});
});
