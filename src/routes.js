module.exports = function (app) {

  var routes = {};

  // TODO: extract these to separate files + folders as needed
  routes.helloWorld = function (req, res, next) {
    res.format({
      json: function () {
        res.json({ hello: 'world' });
      }
    });
  };

  app.route('/')
    .get(routes.helloWorld);
};

