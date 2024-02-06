const url = 'http://localhost:9000/log';

function log(message) {
	console.log('logger', message);
}

module.exports.endpointUrl = url;
module.exports.log = log;
