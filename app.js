const http = require('http');
const Logger = require('./logger');
const logger = new Logger();

logger.on(message => console.log(message));

logger.log('Hello World!!');

const httpServer = http.createServer((req, res) => {
	if (req.url === '/') {
		res.write('Hello World :) !!!');
		logger.log('Connected...');
		res.end();
	}

	if (req.url === '/api/hello') {
		res.write(JSON.stringify({ message: 'Hello World :)' }));
		logger.log('Respone form /api/hello ...');
		res.end();
	}
});
httpServer.on('connection', () => logger.log('Connected on server port 3000'));

httpServer.listen(3000);
