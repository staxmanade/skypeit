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

var vlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

var printHelpMessage = function() {

  vlog("printing help...");

  var helpFile = path.join(__dirname, 'help.md');
  var output = require('msee').parseFile(helpFile);

  // Some spacing formatting cleanup
  output = output.replace(/&nbsp;/g, ' ');
  console.log(output);
};

if(help){
  printHelpMessage();
  return;
}

var result = parseArgs(process.argv.slice(2), debug);

if(!result) {
  printHelpMessage();
  var chalk = require('chalk');
  console.log(chalk.red("invalid input... Consider using the --debug parameter to help diagnose issues."));
  return;
}

vlog('process.argv:', process.argv);
vlog('debug:', debug);
vlog('parseArgs: ', result);

var appleScriptArgs = [ path.join(__dirname, './skypeItAppleScript.scpt'), result.num, result.ext];

var appleScriptCmd = 'osascript';

vlog(appleScriptCmd + ' ' + appleScriptArgs.join(' '));

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
