const Logger = require('./logger');
const logger = new Logger();

logger.on(message => console.log(message));

logger.log('Hello World!!');
