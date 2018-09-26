const express = require('express');
const passport = require('passport');
const { User } = require('../models/users');

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
	const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
    $or: [
            { username: newUser.username }
        ]
    })
    .then(user => {
    	if(user) {
    		return res.status(400).json({ error: 'Database error: a user with that username already exists' });
    	}
    	return User.hashPassword(newUser.password);
    })
    .then(passwordHash => {
    	newUser.password = passwordHash;
    	User.create(newUser)
    		.then(createdUser => {
    			return res.status(201).json(createdUser.serialize());
    		})
    		.catch(err => {
    			return res.status(500).json(err)
    		});
    });

    userRouter.get('/', (req, res) => {
        User.find()
            .then(users => {
                return res.status(200).json(
                    users.map(user => user.serialize())
                    );
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    });

    userRouter.get('/:userid', (req, res) => {
    	User.findById(req.params.userid)
    		.then(user => {
    			return res.status(200).json(user.serialize());
    		})
    		.catch(err => {
    			return res.status(500).json(err)
    		});
    });
});


module.exports = { userRouter };