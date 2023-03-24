require('dotenv').config();
const http = require('http');
const { app } = require('./app');
const { config } = require('./config');

const server = http.createServer(app);

server.listen(config.port);
server.on('listening', () => console.log(`process running at port:${config.port}`));
