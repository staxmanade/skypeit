#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var chalk = require('chalk');
var parseArgs = require('../skypeit').parseArgs;
var cleanArgs = process.argv.map(function (item) {
  return (item || '').toLowerCase();
});

var debug = cleanArgs.indexOf('--debug') >= 0 || cleanArgs.indexOf('--verbose') >= 0;

var vlog = function () {
  if(debug) {
    console.log.apply(null, arguments);
  }
};

var printHelpMessage = function() {

  vlog("printing help...");

  var helpFile = require('path').join(__dirname, 'help.md');
  var output = require('msee').parseFile(helpFile);

  // Some spacing formatting cleanup
  output = output.replace(/&nbsp;/g, ' ');
  console.log(output);
};


var result = parseArgs(process.argv.slice(2), debug);

if(!result) {
  printHelpMessage();
  console.log(chalk.red("invalid input..."));
  return;
}

vlog('process.argv:', process.argv);
vlog('debug:', debug);
vlog('parseArgs: ', result);

var appleScriptArgs = ['./skypeItAppleScript.scpt', result.num, result.ext];

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
