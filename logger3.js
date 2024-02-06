function log(message) {
	console.log('logger3', message);
}

//export { log as log };

module.exports.log = log;
