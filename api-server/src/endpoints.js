const server = require('./server');
const Path = require('path');

const prefix = '';

const data = require('../data/data');
const resolvePath = sampleFile => Path.join(__dirname, `../data/samples/${sampleFile}`);

const assignCorrectHandler = (route, endpoint) => {
  const contentType = {
    'application/json': (request, h) => require(resolvePath(endpoint.data.fileName)),
    'text/html': {
      file: resolvePath(endpoint.data.fileName)
    }
  };

  Object.assign(route, {
    handler: contentType[endpoint.data.type]
  });
};


let endpointsData = {
  'otodom1': {
    path: prefix + '/otodom1',
    data: data['otodom1']
  },
  'otodom2': {
    path: prefix + '/otodom2',
    data: data['otodom2']
  }
};

const addAllEndpoints = () => {

  let routes = [];

  for (let endpointName in endpointsData) {

    let endpoint = endpointsData[endpointName];

    let route = {
      method: (!endpoint.method) ? 'GET' : endpoint.method,
      path: endpoint.path,
      config: {
        cors: true
      }
    };

    assignCorrectHandler(route, endpoint);

    routes.push(route);
  }

  server.route(routes);

};

const endpointsPaths = Object.keys(endpointsData).map(
  endpointName => endpointsData[endpointName].path
);


const endpoints = {
  addAll: addAllEndpoints,
  pathsList: endpointsPaths,
  list: endpointsData
};

module.exports = endpoints;
