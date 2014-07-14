var _ = require('lodash'),
    crypto = require('crypto'),
    fs = require('fs'),
    path = require('path');

crypto.randomBytes(48, function (ex, buf) {
    if (ex) throw ex;

    var configFile = path.resolve(__dirname, '../config.json'),
        config = require(configFile);

    fs.writeFileSync(configFile, JSON.stringify(_.extend(config, {
      secret: buf.toString('hex')
    }), null, 2));
});

