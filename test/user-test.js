// 'use strict';

// const chai = require('chai');

// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const {app, runServer, closeServer} = require('../server');
// const { TEST_DATABASE_URL } = require('../config');
// const { User } = require('../models/users')

// const should = chai.should();

// chai.use(chaiHttp);

// describe('Tests for users', function() {
// 	let testUser;
// 	before(function() {
// 		return runServer(true);
// 	});
// 	beforeEach(function() {
// 		testUser = createFakeUser();
// 		returnUser.create(testUser)
// 			.then(() => { })
// 			.catch(err => {
// 				console.error(err);
// 			});
// 	});
// 	afterEach(function() {
// 		return new Promise((resolve, reject) => {
// 			mongoose.connection.dropDatabase()
// 				.then(result => {
// 					resolve(result);
// 				})
// 				.catch(err => {
// 					console.error(err);
// 					reject(err);
// 				});
// 			});
// 	after(function() {
// 		return closeServer();
// 		});
// 	it('Should return a specfic user', function() {
// 		let foundUser;
// 		return chai.request(app)
// 			.get('/api/user')
// 			.then(res => {
// 				res.should.have.status(200);
//           		res.should.be.json;
//           		res.should.be.a('array');
//           		res.body.should.have.lengthOf.at.least(1);
//           		foundUser = res.body[0];
//           		return chai.request(app).get(`/api/user/${foundUser.id}`);
// 			})
// 			.then(res => {
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.body.should.be.a('object');
// 				res.body.id.should.be.equal(foundUser.id);
// 			});
// 		});
// 	it('Should create new user', function() {
// 		let newUser = createFakeUser();
// 		return chai.request(app)
// 			.post('/api/user')
// 			.send(newUser)
// 			.then(res => {
// 				res.should.have.status(200);
// 				res.should.be.json;
//           		res.should.be.a('array');
//           		res.body.should.include.keys('id', 'name', 'username', 'email');
//           		res.body.name.should.equal(newUser.name);
//           		res.body.email.should.equal(newUser.email);
//           		res.body.username.should.equal(newUser.username);

// 			});
// 		});
// 	function createFakeUser() {
// 		return {
// 			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//             username: `${faker.lorem.word()}${faker.random.number(100)}`,
//             password: faker.internet.password(),
//             email: faker.internet.email()
// 		};
// 	}
// });

// })