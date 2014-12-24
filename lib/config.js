
var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('lodash');
var debug;

var dlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
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
    return Object.keys(aliases);
  }
});

Object.defineProperty(SkypeitConfig.prototype, "alias", {
  get: function () {
    return (this._config && this._config.alias) || {};
  }
});

module.exports = function (_debug, globalConfigPath, localConfigPath) {
  debug = _debug;
  return new SkypeitConfig(globalConfigPath, localConfigPath);
};
