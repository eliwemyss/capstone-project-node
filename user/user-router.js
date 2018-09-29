const express = require('express');
const Joi = require('joi');

const mongoose = require('mongoose');
const { PORT, DATABASE_URL } = require('../config');
const { User, UserJoiSchema } = require('../models/users');

const app = express();
app.use(express.json());

const router = express.Router();

// CREATE NEW USER
router.post('/', (request, response) => {
    const newUser = {
        name: request.body.name,
        username: request.body.username,
        password: request.body.password
    };

    const validation = Joi.validate(newUser, UserJoiSchema);
    if (validation.error) {
        return response.status(400).json({ error: validation.error });
    }
    User.findOne({
        $or: [
            { username: newUser.username }
        ]
    }).then(user => {
        if (user) {
            return response.status(400).json({ error: 'Database Error: A user with that username and/or email already exists.' });
        }
        return User.hashPassword(newUser.password);
    }).then(passwordHash => {
        newUser.password = passwordHash;
        User.create(newUser)
            .then(createdUser => {
                return response.status(201).json(createdUser.serialize());
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    });
});

// RETRIEVE USERS
router.get('/', (request, response) => {
    User.find()
        .then(user => {
            return response.status(200).json(
                user.map(user => user.serialize())
            );
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});
// RETRIEVE ONE USER
router.get('/:userid', (request, response) => {
    User.findById(request.params.userid)
        .then(user => {
            return response.status(200).json(user.serialize());
        })
        .catch(error => {
            return response.status(500).json(error);
        });
});

module.exports = router ;