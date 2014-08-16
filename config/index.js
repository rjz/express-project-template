var confilter = require('confilter'),
    path = require('path');

module.exports = confilter([

  // Paths to load config files from
  confilter.loadJSON([
    path.resolve(__dirname, 'config.' + process.env.NODE_ENV + '.json'),
    path.resolve(__dirname, 'config.json')
  ]),

  // Any defaults to fill in when missing from the config
  confilter.defaults({
    port: 3200
  }, true),

  // Any defaults to fill in when missing from the config
  confilter.required([
    // List required keys here
  ])
]);

