const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');

const jsonParson = bodyParser.json();

const mongoose = require('mongoose');


const { PORT, DATABASE_URL } = require('./config');
const { Predictions } = require('./models/predictions');
const { Scores } = require('./models/scores');
const { User } = require('./models/users')
const jwt = require('jsonwebtoken');


const { localPassportMiddleware, jwtPassportMiddleware } = require('./user/auth-strategies');
const { JWT_SECRET, JWT_EXPIRY } = require('./config.js');

const app = express();
app.use(express.json());

const router = express.Router();


let user;

function createJwtToken(user) {
    return jwt.sign({ user }, JWT_SECRET, {
        subject: user.username,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
}

router.post('/api/auth/login', localPassportMiddleware, (request, response) => {
    const user = request.user.serialize();
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
});

router.post('/api/auth/login/refresh', jwtPassportMiddleware, (request, response) => {
    const user = request.user;
    const jwtToken = createJwtToken(user);
    response.json({ jwtToken, user });
});


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

router.get('/api/predictions', function(req, res) {
    Predictions
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


router.get('/api/predictions/:id', function(req, res) {
    Predictions
        .findById(req.params.id)
        .then(scores => res.json(scores.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something not working'})
        });
});



router.get('/api/scores/week/:id', function(req, res) {
    
    Scores
        .find({ 'Week': req.params.id})
        .then(scores => {
            res.json({
                scores: scores.map(
                    (score) => score.serialize())
            })
        })
        .catch(err => {
            

            res.status(500).json({ error: 'something not working', params: req.params.Week, p: err})
        });

});

router.get('/api/predictions/week/:id', function(req, res) {
    
    Predictions
        .find({ 'Week': req.params.id})
        .then(scores => {
            res.json({
                scores: scores.map(
                    (score) => score.serialize())
            })
        })
        .catch(err => {
            

            res.status(500).json({ error: 'something not working', params: req.params.Week, p: err})
        });

});


router.post('/api/predictions', function(req, res) {
    const requiredFields = ['AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore', 'Week']

    for ( let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        console.log(req.body)
        if(!(field in req.body)) {
            console.log('req body is', req.body)
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
            Week: req.body.Week,
            user: req.body.user,
            username: req.body.username
        })
        .then(scores => res.status(201).json(scores.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something not right'})
        });
});

router.put('/api/predictions/:id', function(req, res) {
    if(req.params.id  === req.body.id) {
        res.status(400).json({
            error: 'Request path id and request body id values must match'
        });
    }
    const updated = {};
    const updateableFields = ['AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore'];
    updateableFields.forEach(field => {
        if (field in req.body){
            updated[field] = req.body[field];
        }
    });
    Predictions
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
        .then(updatedScore => res.status(203).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }))
});

router.delete('/api/predictions/:id', function(req, res) {
    Predictions
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