
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var debug;

var dlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

var sampleConfig = {
  alias: {
    sample: {
      number: "555-555-5555 ext 5555"
    },
    anotherSample: {
      number: "555-555-5555 ext 5555"
    },
  }
};

var loadConfig = function (configPath) {
  dlog("looking for config file in: ", configPath);
  var configExists = fs.existsSync(configPath);
  dlog('config exists?: :', configExists);
  if(configExists) {
    var configContents = fs.readFileSync(configPath, 'utf8');
    dlog('config contents: ', configContents);

    var config = yaml.safeLoad(configContents);
    dlog('parsed config yaml:', config);

    return config;
  } else {
    // return blank config object
    return {
      alias: { }
    };
  }
};

var SkypeitConfig = function (globalConfigPath, localConfigPath) {

  var globalConfig = loadConfig(globalConfigPath);
  var localConfig = loadConfig(localConfigPath);

  var mergedConfig = _.merge(localConfig, globalConfig);
  dlog("mergedConfig: ", mergedConfig);

  this._config = mergedConfig;
};

Object.defineProperty(SkypeitConfig.prototype, "listAlias", {
  get: function () {
    var aliases = (this._config && this._config.alias) || {};
    return Object.keys(aliases).sort(function (a, b) {
      a = a || '';
      b = b || '';
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
  }
});

Object.defineProperty(SkypeitConfig.prototype, "alias", {
  get: function () {
    return (this._config && this._config.alias) || {};
  }
});

SkypeitConfig.prototype.sampleConfig = function () {
  var configPath = path.resolve(__dirname, '../.skypeitrc');
  dlog("sample config path:", configPath);
  var configContents = fs.readFileSync(configPath, 'utf8');
  dlog('sample config contents: ', configContents);

  return configContents;
};

var config = function (_debug, globalConfigPath, localConfigPath) {
  debug = _debug;
  return new SkypeitConfig(globalConfigPath, localConfigPath);
};
module.exports = config;
