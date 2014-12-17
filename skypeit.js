var knownArgs = [
  '--verbose',
  '--nopound'
];

exports.parseArgs = function (args, debug) {

  var dlog = function () {
    if(debug) {
      console.log.apply(null, arguments);
    }
  };

  var noPoundAfterExt = false;

  dlog("args:", args);


  if(!args || !args.length || typeof args === "string") {
    return null;
  }

  var newArgs = [];

  (args || [])
    .map(function (item) {
      // sanatize null inputs and lowercase everything
      return (item || '').toLowerCase();
    })
    .forEach(function (item) {

      //newArgs.push(item);
      item.split(/\s/g).forEach(function (item) {

        if(item === "--nopound") {
          noPoundAfterExt = true;
        }

        item.replace(/[^0-9]/gi, ' ').split(' ').forEach(function (item) {
          newArgs.push((item || '').trim());
        });

      });
    });

    dlog("args procesed:", args);


    newArgs = newArgs
      .filter(function (item) {
        // remove known args like (--verbose)
        return knownArgs.indexOf(item) < 0;
      })
      .map(function (item) {
        // remove non-numeric characters
        return item.replace(/[^0-9]/gi, '');
      })
      .filter(function (item) {
        // filter out empty items from array
        return item.trim().length > 0;
      });

    dlog("newArgs:", newArgs);

    //console.log(newArgs);

    var num = '';
    var ext = '';
    newArgs.forEach(function (item) {
      //console.log("num: " + num + " - ext: " + ext + " - item: " + item);
      if(num.length < 10) {
        if(num.length === 0) {
          // remove 1
          if(item[0] === "1"){
            item = item.slice(1);
          }
        }
        num += item;
      } else if(!ext) {
        ext = item;
      }
    });

  dlog("num: ", num);
  dlog("ext: ", ext);
  //console.log(args);

  if(ext) {
    ext = ',' + ext + (noPoundAfterExt ? '' : '#');
  } else {
    noPoundAfterExt = true;
  }


  dlog("ext after pound check: ", ext);

  // if no number parsed - get outa here
  if(!num) {
    dlog('no num value - return null');
    return null;
  }

  // TODO: this is U.S. only at the moment.
  // consider what international would look like
  if(num.length != 10) {
    dlog('num.length = ' + num.length + ' which was not 10 - return null');
    return null;
  }

  var result = {
    num: '+1' + num,
    ext: ext,
    noPoundAfterExt: noPoundAfterExt,
  };
  dlog('result:', result);
  return result;

};
