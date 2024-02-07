const EventEmitter = require('events');

class Logger extends EventEmitter {
	eventName = 'LogEvent';

	log(message) {
		console.log('Logger message - ' + message);
		this.emit(this.eventName, { message });
	}

	on(listener) {
		super.on(this.eventName, listener);
	}
}

module.exports = Logger;
