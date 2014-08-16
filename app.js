var _ = require('lodash'),
    express = require('express'),
    errors = require('http-error-factories');

var config = require('./config');

var middleware,
    port = config.port,
    app = module.exports = express();

var logger = require('./src/logger')(app.get('env'));

// App configuration
app.set('x-powered-by', false);
app.set('port', config.port);
app.set('logger', logger);

// Set up request middleware:
middleware = require('./src/middleware')(app);

app.use(middleware.requestLogger);

// Set up application routes
require('./src/routes')(app);

// Route wasn't found :'(
app.all('*', function (req, res, next) {
  next(errors.notFound(req.originalUrl));
});

app.use(middleware.errorHandler);

app.listen(app.get('port'), function (err) {
  if (err) {
    logger.error({ err: err });
  }
  else {
    logger.info('Listening on ' + port);
  }
});

