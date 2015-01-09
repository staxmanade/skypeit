#!/usr/bin/env node
'use strict';

var child_process = require('child_process');
var spawn = child_process.spawn;
var path = require('path');
var _ = require('lodash');
var Liftoff = require('liftoff');
var parsePhoneNumber = require('../lib/parsePhoneNumber').parsePhoneNumber;
var cleanArgs = process.argv.map(function (item) {
  return (item || '').toLowerCase();
});

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var skypeitrcName = '.skypeitrc';
var debug = cleanArgs.indexOf('--debug') >= 0 || cleanArgs.indexOf('--verbose') >= 0;

var dlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

var getVersion = function () {
  return require('../package.json').version;
};

var printHelpMessage = function() {

  dlog('printing help...');

  var helpFile = path.join(__dirname, 'help.md');
  var output = require('msee').parseFile(helpFile);

  var version = getVersion();
  output = output.replace('{{version}}', version);

  // Some spacing formatting cleanup
  output = output.replace(/&nbsp;/g, ' ');
  console.log(output);
};


var Skypeit = new Liftoff({
  processTitle: 'SkypeIt',
  moduleName: 'skypeit',
  configName: skypeitrcName,
  extensions:{
    '': null
  }
});

var argv = require('minimist')(process.argv.slice(2));

var invoke = function (env) {

  dlog('Environment is:', env);
  dlog('Cli options are:', argv);
  dlog('Liftoff config is:', this);

  if(argv.help) {
    printHelpMessage();
    return;
  }

  if(argv.version) {
    console.log(getVersion());
    return;
  }

  var globalConfigPath = path.join(getUserHome(), skypeitrcName);
  var localConfigPath = env.configBase && path.join(env.configBase, skypeitrcName);
  dlog('globalConfigPath:', globalConfigPath);
  dlog('localConfigPath:', localConfigPath);
  var config = require('../lib/config.js')(debug, globalConfigPath, localConfigPath);

  // print the sample config
  if(argv.sampleConfig) {
    console.log(config.sampleConfig());
    return;
  }


  // handle tab completion
  if(argv.completion) {

    if(argv.completion === true) {
      console.log(config.listAlias.join('\n'));
      return;
    }

    require('../lib/completion')(argv.completion);
    return;
  }

  // look for alias values
  var aliasNumber;
  var alias = argv._[0];
  var result;
  dlog('config.alias: ', config.alias);
  if(alias && config.alias[alias]) {
    dlog('found alias for: ' + alias);
    var aliasValue = config.alias[alias];
    dlog('alias:', aliasValue);
    aliasNumber = aliasValue.number;
    result = parsePhoneNumber(aliasNumber.split(' '), debug);
  } else {
    dlog('no alias found');

    result = parsePhoneNumber(argv._, debug);
  }

  // No result found - print the help message.
  if(!result) {
    printHelpMessage();
    var chalk = require('chalk');
    console.log(chalk.red('invalid input... Consider using the --debug parameter to help diagnose issues.'));
    return;
  }

  dlog('process.argv:', process.argv);
  dlog('debug:', debug);
  dlog('parsePhoneNumber result: ', result);

  // windows 
  if(/^win/.test(process.platform)){
    var opn = require('opn')
    opn('skype://' + result.num + result.ext)
    return;
  }

  var externalCommand = 'osascript';
  var externalCommandArgs = [ path.join(__dirname, './skypeItAppleScript.scpt'), result.num, result.ext];        


  // copy the trimmed command to the clipboard
  if(config && config.copyCommandToClipboard) {
    dlog('copying skypeit command to clipboard...');
    var clipboardCmd = 'skypeit \"' + [result.num, result.ext].join(' ').trim() + '"';
    dlog('copying cmd: ' + clipboardCmd);
    var copyPaste = require('copy-paste');
    copyPaste.copy(clipboardCmd, function () {
      dlog('arguments', arguments);
      dlog('copying skypeit command to clipboard...');
    });
  }

  dlog(externalCommand + ' ' + externalCommandArgs.join(' '));

  var cmd;
  if(debug) {
    cmd = spawn(externalCommand, externalCommandArgs);

    cmd.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    cmd.stderr.on('data', function (data) {
      console.error('stderr: ' + data);
    });

    cmd.on('close', function (code) {
      console.log('child process exited with code ' + code);
    });
  } else {
    cmd = spawn(externalCommand, externalCommandArgs, {
      detached: true,
      stdio: ['ignore', 'ignore', 'ignore']
    });
    cmd.unref();
  }

};
Skypeit.launch({
  cwd: argv.cwd,
  configPath: argv.myappfile,
  require: argv.require,
  completion: argv.completion
}, invoke);
