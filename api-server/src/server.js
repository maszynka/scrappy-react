const Hapi = require('hapi');

const server = Hapi.server({
  debug: {
    request: ['error'],
    log: ['error'],
  },
  port: 7779,
  host: 'localhost',
  routes: {
    cors: true
  }
});

module.exports = server;
