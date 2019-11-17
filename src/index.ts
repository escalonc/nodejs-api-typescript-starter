import {createServer} from 'http';
import signale from 'signale';
import config from './config';
import ApplicationServer from './server';

const applicationServer = ApplicationServer.bootstrap();
const server = createServer(applicationServer);

server.listen(config.PORT);
server.on('listening', onListing);
server.on('error', onError);

function onListing() {
  signale.success('🚀  server listening on port:', config.PORT);
}

function onError(error: any) {
  signale.error('There was an error:', error);
}
