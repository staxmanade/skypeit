/*jshint expr: true*/

var expect = require('chai').expect;

var parsePhoneNumber = require('../lib/parsePhoneNumber').parsePhoneNumber;

describe('when parsing skype args', function () {

  [
    // # not supported because of the last test case that
    // # expects to combine extension digits together.
    // {
    //   input: 'Dial (555) 555-5555 acc 5555555 lead 5555',
    //   expected: {
    //     num: '+15555555555',
    //     ext: ',5555555#',
    //     noPoundAfterExt: false
    //   }
    // },
    {
      info: "has a 1 in the front & some whitespace",
      input: '	1-555-555-5555  --> 555555',
      expected: {
        num: '+15555555555',
        ext: ',555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: ',5555555#',
        noPoundAfterExt: false
      }
    },
    {
      info: "has the --verbose flag",
      input: '	(555) 555-5555 x 5555555 --verbose',
      expected: {
        num: '+15555555555',
        ext: ',5555555#',
        noPoundAfterExt: false
      }
    },
    {
      info: "has the --verbose flag",
      input: '--verbose	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: ',5555555#',
        noPoundAfterExt: false
      }
    },
    {
      info: "has the --nopound flag",
      input: '--nopound	(555) 555-5555 x 5555555',
      expected: {
        num: '+15555555555',
        ext: ',5555555',
        noPoundAfterExt: true
      }
    },
    {
      info: "no extension",
      input: '(555) 555-5555',
      expected: {
        num: '+15555555555',
        ext: '',
        noPoundAfterExt: true
      }
    },
    {
      info: "extension attached to main number",
      input: '(555) 555-5555#555',
      expected: {
        num: '+15555555555',
        ext: ',555#',
        noPoundAfterExt: false
      }
    },

    {
      input: '1-555-555-5555 555555',
      expected: {
        num: '+15555555555',
        ext: ',555555#',
        noPoundAfterExt: false
      }
    },
    {
      input: '1-555-555-5555 Code 5555555',
      expected: {
        num: '+15555555555',
        ext: ',5555555#',
        noPoundAfterExt: false
      }
    },
    {
      info: "already has a # at end of ext",
      input: '1-555-555-5555 Code 5555555#',
      expected: {
        num: '+15555555555',
        ext: ',5555555#',
        noPoundAfterExt: false
      }
    },
    {
      info: "extension has extra spaces and should pull in all numbers",
      input: '555.555.5555 pass:666 666 6666',
      expected: {
        num: '+15555555555',
        ext: ',6666666666#',
        noPoundAfterExt: false
      }
    },
  ].forEach(function (item) {

    it('should parse input correctly: ' + item.input, function () {
      if(item.info) {
        console.log(item.info);
      }
      var args = item.input.split(' ');
      var result = parsePhoneNumber(args, /*debug*/false);

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
      expect(parsePhoneNumber(item)).to.equal(null);
    });
  });


});
