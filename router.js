const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { Scores } = require('./models/scores');

const app = express();

app.use(express.json());

// Scores.create('Tennessee -- Florida, 28 -- 24')

router.get('/api/scores', function(req, res) {
	Scores
		.find()
		.then(scores => {
			res.json({
				scores: scores.map(
					(score) => score.serialize())
			});
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'})
		});
});

router.get('/api/scores/:id', function(req, res) {
	Scores
		.findById(req.params.id)
		.then(post => res.json(post.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'something not working'})
		});
});

router.post('/api/scores', function(req, res) {
	const requiredFields = ['awayTeamName', 'homeTeamName', 'awayTeamScore', 'homeTeamScore', 'week']
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Scores
		.create({
			awayTeamName: req.body.awayTeamName,
			homeTeamName: req.body.homeTeamName,
			awayTeamScore: req.body.awayTeamScore,
			homeTeamScore: req.body.homeTeamScore,
			week: req.body.week
		})
		.then(scores => res.status(201).json(scores.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Something not right'})
		});
});

router.put('/api/scores/:id', function(req, res) {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		res.status(400).json({
			error: 'Request path id and request body id values must match'
		});
	}
	const updated = {};
	const updateableFields = [ 'awayTeamName', 'homeTeamName', 'awayTeamScore', 'homeTeamScore', 'week'];
	updateableFields.forEach(field => {
		if (field in req.body){
			updated[field] = req.body[field];
		}
	});
	Scores
		.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true })
		.then(updatedScore => res.status(204).end())
		.catch(err => res.status(500).json({ message: 'Something went wrong' }))
});

router.delete('/api/scores/:id', function(req, res) {
	Scores
		.findByIdAndRemove(req.params.id)
		.then(() => {
			console.log(`Deleted score prediction with id \`${req.params.id}\``);
			res.status(204).end();
		});
});

router.use('*' , function(req, res) {
	res.status(404).json({ message: 'Not found' });
});



module.exports = router;

