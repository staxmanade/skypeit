#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var parseArgs = require('../skypeit').parseArgs;
var cleanArgs = process.argv.map(function (item) {
  return (item || '').toLowerCase();
});

var debug = cleanArgs.indexOf('--debug') >= 0 || cleanArgs.indexOf('--verbose') >= 0;
var config = require('../lib/config.js')(debug);

var dlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

var getVersion = function () {
  return require('../package.json').version;
};

var printHelpMessage = function() {

  dlog("printing help...");

  var helpFile = path.join(__dirname, 'help.md');
  var output = require('msee').parseFile(helpFile);

  var version = getVersion();
  output = output.replace('{{version}}', version);

  // Some spacing formatting cleanup
  output = output.replace(/&nbsp;/g, ' ');
  console.log(output);
};

var argv = require('minimist')(process.argv.slice(2));

dlog('args: ', argv);

if(argv.help) {
  printHelpMessage();
  return;
}

if(argv.version) {
  console.log(getVersion());
  return;
}

if(argv.completion) {

  if(argv.completion === true) {
    console.log(config.listAlias.join('\n'));
    return;
  }

  require('../lib/completion')(argv.completion);
  return;
}

var aliasNumber;
var alias = argv._[0];
var result;
dlog("config.alias: ", config.alias);
if(alias && config.alias[alias]) {
  dlog('found alias for: ' + alias);
  var aliasValue = config.alias[alias];
  dlog('alias:', aliasValue);
  aliasNumber = aliasValue.number;
  result = parseArgs(aliasNumber.split(' '), debug);
} else {
  dlog('no alias found');
  result = parseArgs(argv._, debug);
}

if(!result) {
  printHelpMessage();
  var chalk = require('chalk');
  console.log(chalk.red("invalid input... Consider using the --debug parameter to help diagnose issues."));
  return;
}

dlog('process.argv:', process.argv);
dlog('debug:', debug);
dlog('parseArgs: ', result);

var appleScriptArgs = [ path.join(__dirname, './skypeItAppleScript.scpt'), result.num, result.ext];

var appleScriptCmd = 'osascript';

dlog(appleScriptCmd + ' ' + appleScriptArgs.join(' '));

if(debug) {
  var cmd = spawn(appleScriptCmd, appleScriptArgs);

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
  var cmd = spawn(appleScriptCmd, appleScriptArgs, {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
  });
  cmd.unref();
}
