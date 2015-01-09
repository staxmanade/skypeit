var approvals = require('approvals');
var exec = require('shelljs').exec;
var path = require('path');

describe('when calling the cli', function () {

  [
    {
      testName: 'completion',
      cmd: '--completion'
    },
    {
      testName: 'blank',
      cmd: ''
    },
    {
      testName: 'help',
      cmd: '--help'
    },
    {
      testName: 'sampleConfig',
      cmd: '--sampleConfig'
    },
    // {
    //   testName: '',
    //   cmd: ''
    // },
  ].forEach(function (item) {

    it('should verify command: ' + item.cmd, function () {
      this.timeout(5000);
      
      var result = exec(path.join(__dirname, "../bin/index.js") + " " + item.cmd);
      var output = result.output;

      // remove version
      output = output.replace(/\(v(.*)\)/g, '(v###)');

      approvals.verify(__dirname, item.testName, output);

    });

  });

});
