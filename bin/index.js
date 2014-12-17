#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var parseArgs = require('../skypeit').parseArgs;
var cleanArgs = process.argv.map(function (item) {
  return (item || '').toLowerCase();
});

var debug = cleanArgs.indexOf('--debug') >= 0 || cleanArgs.indexOf('--verbose') >= 0;
var help = cleanArgs.indexOf('--help') >= 0;
var printVersion = cleanArgs.indexOf('--version') >= 0;

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

if(help){
  printHelpMessage();
  return;
}

if(printVersion) {
  console.log(getVersion());
  return;
}

var result = parseArgs(process.argv.slice(2), debug);

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
    console.log('stderr: ' + data);
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
