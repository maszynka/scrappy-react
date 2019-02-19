
const Hapi = require('hapi');
const port    = process.env.PORT || 5000;
const __server  = new Hapi.Server({ port: port });

const plugins = [
  require('inert')
]

async function startServer() {

  await __server.register(plugins);

  __server.route([
    {
      path: '/',
      method: 'GET',
      config: {
        auth: false,
        handler: {
          file: './api-server/data/samples/index.html'
        }
      }
    }
  ]);

  await __server.start();
  console.log('Static Server Listening on : http://127.0.0.1:' +port);
}

startServer();

module.exports = __server;
