// import { log as log3 } from './logger3';

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const logger = require('./logger');
const log = require('./logger2');
const log3 = require('./logger3').log;

logger.log('Hello from main application :)');

console.log(logger.endpointUrl);

log('My other module :)');

log3('Another logger as ES3');
