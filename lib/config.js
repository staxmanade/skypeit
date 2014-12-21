
var yaml = require('js-yaml');
var fs = require('fs');
var debug;

var dlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var loadConfig = function () {
  var configPath = getUserHome() + "/.skypeitrc";
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

var SkypeitConfig = function () {
  this._config = loadConfig();
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

module.exports = function (_debug) {
  debug = _debug;
  return new SkypeitConfig();
};
