var cluster = require('cluster'),
    logger = require('./src/logger')('development');

var size = process.env.WORKERS || require('os').cpus().length;

var workers = {};

function log (msg, opts) {
  if (!opts) opts = {};

  opts.name = 'master';

  logger.info(msg, opts);
}

function resize (size) {
  var count = Object.keys(workers).length,
      i = size - count;

  if (i < 0) throw new Error('Resizing to invalid size');

  while (i--) cluster.fork();
}

if (cluster.isMaster) {

  cluster.on('fork', function (worker) {
    var pid = worker.process.pid;

    worker.process.on('message', function (msg) {
      log(JSON.stringify(msg), { pid: pid });
    });

    worker.process.on('exit', function (code, signal) {
      log('Exited with ' + code, { pid: pid });
    });

    workers[pid] = {
      start: Date.now(),
      pid: [pid]
    };
  });

  cluster.on('disconnect', function (worker) {
    if (Date.now() - workers[worker.process.pid].start < 1000) {
      // Wait a few moments before trying to come back up.
      setTimeout(resize.bind(this, size), 1000);
    }
    else {
      resize(size);
    }

    delete workers[worker.process.pid];
  });

  cluster.setupMaster({
    exec: 'app.js'
  });

  resize(size);
}

