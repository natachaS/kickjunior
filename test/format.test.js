var expect = require('chai').expect;
var format_number = require('../lib/common/format');

describe('Formatting a number', function () {

	it('should exist and be a function', function () {
		expect(format_number).to.exist;
		expect(format_number).to.be.a('function');
	});

	it('should be a language sensitive representation of a number', function () {
		expect(format_number('100000')).to.eql('100,000');
	});
});
