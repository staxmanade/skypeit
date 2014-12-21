
var expect = require('chai').expect;
var skypeitConfig = require('../lib/config');

describe('when loading config', function () {

  it('should construct', function () {
    var config = skypeitConfig;

    expect(config).to.be.ok();
  });


});
