const express = require('express');
const passport = require('passport')

const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');
const { Predictions } = require('./models/predictions');

const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('./config.js');

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/api/predictions', function(req, res) {
    Predictions
        .find()
        .then(predictions => {
            res.json({
                predictions: predictions.map(
                    (prediction) => prediction.serialize())
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'})
        });
});

router.get('/api/predictions/:id', function(req, res) {
    Predictions
        .findById(req.params.id)
        .then(predictions => res.json(predictions.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something not working'})
        });
});

router.get('/api/predictions/week/:id', function(req, res) {
    
    Predictions
        .find({ 'Week': req.params.id})
        .then(predictions => {
            res.json({
                predictions: predictions.map(
                    (prediction) => prediction.serialize())
            })
        })
        .catch(err => {
            

            res.status(500).json({ error: 'something not working', params: req.params.Week, p: err})
        });

});

router.post('/api/predictions', function(req, res) {
    const requiredFields = ['AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore']
    for ( i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in request body....`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Predictions
        .create({
            AwayTeamName: req.body.AwayTeamName,
            HomeTeamName: req.body.HomeTeamName,
            AwayTeamScore: req.body.AwayTeamScore,
            HomeTeamScore: req.body.HomeTeamScore,
            Week: req.body.Week
        })
        .then(predictions => res.status(201).json(predictions.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something not right'})
        });
});


module.exports = router;