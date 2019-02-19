'use strict';
const server = require('./src/routing');
const endpoints = require('./src/endpoints.js');


const init = async () => {
    await server.register(require('inert'));
    endpoints.addAll();

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};



process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
