Express Project Template
==============================================================================

This is a minimally opinionated boilerplate for web services built on top of
[express.js][express].

Out of the box, it extends express with:

  * Worker management (via [cluster][cluster])
  * Explicit error types (via [http-error-factories][http-error-factories])
  * JSON logging (via [bunyan][bunyan])
  * Configuration management (via [confilter][confilter])

...testing utilities:

  * Code linting (via [jshint][jshint])
  * Functional tests (via [supertest-session][supertest-session] and
      [mocha][mocha])
  * Code coverage (via [istanbul][istanbul])
  * Templates for travis-ci and coveralls.io

...and npm tasks for supporting all of the above.

It doesn't make assumptions about view frameworks, authentication strategies,
sessions, security, data stores, or much anything else--just pick the tools
that suit your application's needs.

Installation
-------------------------------------------------------------------------------

    $ npm install

Generate configuration:

    $ npm start

Test
-------------------------------------------------------------------------------

Lint and run test suite:

    $ npm test

Generate code coverage report:

    $ npm run cover

Usage
-------------------------------------------------------------------------------

License
-------------------------------------------------------------------------------

MIT

[bunyan]: https://github.com/trentm/node-bunyan
[cluster]: http://nodejs.org/api/cluster.html
[confilter]: https://github.com/rjz/confilter
[express]: https://github.com/strongloop/express
[istanbul]: https://github.com/gotwarlost/istanbul
[jshint]: http://www.jshint.com/
[mocha]: https://github.com/visionmedia/mocha
[supertest-session]: https://github.com/rjz/supertest-session

