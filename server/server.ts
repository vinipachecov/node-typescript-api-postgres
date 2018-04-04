import * as http from 'http';
import Api from './api';

const models = require('./models');

const config = require('./config/env/config')();

const server = http.createServer(Api);

models.sequelize.sync().then( () => {
  
server.listen(config.serverPort);
  server.on('listening', () => console.log(`Server está rodando na porta ${config.serverPort}`));
  server.on('error', (error: NodeJS.ErrnoException) => console.log((`Ocorreu um erro: ${error}`)))
})

