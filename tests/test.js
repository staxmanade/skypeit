/*jshint expr: true*/

var expect = require('chai').expect;

var parseArgs = require('../skypeit').parseArgs;

describe('when parsing skype args', function () {

  [
    {
      input: 'Dial (555) 555-5555 acc 5555555 lead 5555',
      expected: {
        num: '+15555555555',
        ext: '5555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '	1-555-555-5555  --> 555555',
      expected: {
        num: '+15555555555',
        ext: '555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: '5555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '	(555) 555-5555 x 5555555 --verbose',
      expected: {
        num: '+15555555555',
        ext: '5555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '--verbose	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: '5555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '--nopound	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: '5555555',
        noPoundAfterExt: true
      }
    },
    {
      input: '(555) 555-5555',
      expected: {
        num: '+15555555555',
        ext: '',
        noPoundAfterExt: true
      }
    },
    {
      input: '(555) 555-5555#555',
      expected: {
        num: '+15555555555',
        ext: '555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '1-555-555-5555 555555',
      expected: {
        num: '+15555555555',
        ext: '555555#',
        noPoundAfterExt: false
      }
    },
  ].forEach(function (item) {

    it('should parse input correctly: ' + item.input, function () {
      var args = item.input.split(' ');
      var result = parseArgs(args);

      expect(result).to.be.ok;
      expect(result.num).to.equal(item.expected.num);
      expect(result.ext).to.equal(item.expected.ext);
      expect(result.noPoundAfterExt).to.equal(item.expected.noPoundAfterExt);
    });
  });

  [
    null,
    undefined,
    '',
    'asdf',
    ["--verbose"],
    "555",
    ['555']
  ].forEach(function (item) {
    it('should handle strange inputs: ' + item, function () {
      expect(parseArgs(item)).to.equal(null);
    });
  });


});
