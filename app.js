const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const authenticate = require('./authenticate');
const app = express();

const Joi = require('joi');
const loggerEx = morgan('combined');

app.use(helmet());
app.use(loggerEx);
app.use(logger);
app.use(authenticate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

const courses = [
	{ id: 1, name: 'Javasrcipt' },
	{ id: 2, name: 'Java' },
	{ id: 3, name: 'HTML' },
];

app.get('/', (req, res) => {
	res.send('Hello World!! dude :)!');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:courseId', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.courseId));
	console.log('Found course: ', course);
	if (course) res.send(course);
	else res.sendStatus(404);
});

app.post('/api/courses', (req, res) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().required().min(3),
	});

	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		res.status(400).send(validationResult.error.details[0].message);
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

app.put('/api/courses/:courseId', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.courseId));
	if (!course) {
		res.status(404).send(`Course id ${req.params.courseid} Not found!`);
		return;
	}

	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).required(),
	});

	const validationResult = schema.validate(req.body);

	if (validationResult.error) {
		res.status(404).send(validationResult.error.details[0].message);
		return;
	}

	course.name = req.body.name;
	res.send(course);
});

app.delete('/api/courses/:courseId', (req, res) => {
	const course = courses.find(c => c.id == parseInt(req.params.courseId));
	if (!course) {
		res.status(404).send(`Course id=${req.params.courseId} not found`);
	}
	courses.splice(courses.indexOf(course), 1);
	res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
	res.send(req.params);
});

app.get('/api/posts/:year/:month/:day', (req, res) => {
	res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
