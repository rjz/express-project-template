var assert = require('assert');

var app = require('../app');

var Session = require('supertest-session')({
  app: app
});

describe('Project', function () {

  before(function () {
    this.session = new Session();
  });

  after(function () {
    this.session.destroy();
  });

  it('serves index', function (done) {
    this.session.get('/')
      .expect(200)
      .end(done);
  });

  it('can\'t find anything else', function (done) {
    this.session.get('/anything-else')
      .expect(404)
      .end(done);
  });
});

