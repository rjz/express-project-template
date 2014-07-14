var _ = require('lodash'),
    errors = require('http-error-factories');

function sendError (res, err) {
  res.format({
    json: function () {
      res.json(err.code, _.pick(err, 'code', 'status', 'message'));
    }
  });
}

module.exports = function (app) {

  var exports = {};

  var logger = app.get('logger');

  // For use with bunyan.
  exports.requestLogger = function requestLogger (req, res, next) {
    var _end = res.end,
        t0 = Date.now();

    res.end = function () {
      logger.info({
        req: req,
        res: res,
        dt: (Date.now() - t0)
      });

      _end.apply(this, arguments);
    };

    next();
  };

  // For use with (factory-wrapped) http-errors
  exports.errorHandler = function errorHandler (err, req, res, next) {

    if (err instanceof errors.HTTPError) {

      if (err.code < 500) {
        logger.warn({ err: err });
      }
      else {
        logger.error(err);
      }

      sendError(res, err);
    }
    else {
      logger.error(err);

      // Error must have originated somewhere outside the app's code and arrived
      // here unhandled. No way to gauge its "fatality"--we'll send an internal
      // error and go down hard to be safe.
      sendError(res, errors.internalServer());
      process.exit(1);
    }
  };

  return exports;
};

