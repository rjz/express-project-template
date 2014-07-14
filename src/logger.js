var _ = require('lodash'),
    bunyan = require('bunyan');

function serializeReq (req) {
  return _.extend(_.pick(req, 'ip', 'method'), { url: req.originalUrl });
}

function serializeRes (res) {
  return {
    status: res.statusCode
  };
}

module.exports = function (env) {

  var loggerOpts = {
    name: 'app',
    serializers: {
      err: bunyan.stdSerializers.err,
      req: serializeReq,
      res: serializeRes
    },
    streams: [
      {
        level: 'debug',
        stream: process.stdout
      }
    ]
  };

  switch (env) {
    case 'test':
      loggerOpts.streams = [{
        level: 'error',
        stream: process.stdout
      }];
      loggerOpts.src = true;
      break;
    case 'development':
      loggerOpts.level = 'debug';
      loggerOpts.src = true;
      break;
    default: // 'production', et. al
      loggerOpts.level = 'info';
  }

  return bunyan.createLogger(loggerOpts);
};

