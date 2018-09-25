// const express = require('express');

// const { User } = require('../models/users');

// const userRouter = express.Router();

// userRouter.post('/', (req, res) => {
// 	const newUser = {
//         name: request.body.name,
//         email: request.body.email,
//         username: request.body.username,
//         password: request.body.password
//     };
//     User.findOne({
//     $or: [
//             { email: newUser.email },
//             { username: newUser.username }
//         ]
//     })
//     .then(user => {
//     	if(user) {
//     		return res.status(400).json({ error: 'Database error: a user with that username already exists' });
//     	}
//     	return User.hashPassword(newUser.password);
//     })
//     .then(passwordHash => {
//     	newUser.password = passwordHash;
//     	User.create(newUser)
//     		.then(createdUser => {
//     			return res.status(201).json(createdUser.serialize());
//     		})
//     		.catch(err => {
//     			return res.status(500).json(err)
//     		});
//     });
//     userRouter.get('/:userid', (req, res) => {
//     	User.findById(req.params.userid)
//     		.then(user => {
//     			return res.status(200).json(user.serialize());
//     		})
//     		.catch(err => {
//     			return res.status(500).json(err)
//     		});
//     });
// });


// module.exports = { userRouter };