
// 'use strict';

// const chai = require('chai');

// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');

// const {app, runServer, closeServer} = require('../server');
// const { TEST_DATABASE_URL } = require('../config');
// const { Scores } = require('../models/scores')

// const should = chai.should();

// chai.use(chaiHttp);

// function tearDownDb() {
//   return new Promise((resolve, reject) => {
//     console.warn('Deleting database');
//     mongoose.connection.dropDatabase()
//       .then(result => resolve(result))
//       .catch(err => reject(err));
//   });
// }

// function seedScoreData() {
//   const seedData = [];
//   for(let i = 1; i <= 20; i++) {
//     seedData.push({
//     AwayTeamName: 'Florida Gators',
//     HomeTeamName: 'Tennessee Volunteers',
//     AwayTeamScore: '23',
//     HomeTeamScore: '28',
//     Week: '4'
//   });
//     return Scores.insertMany(seedData)
//   }
// }

// describe('API resource', function() {
//   before(function() {
//     return runServer(TEST_DATABASE_URL)
//   })
//   beforeEach(function() {
//     return seedScoreData()
//   })
//   afterEach(function() {
//     return  tearDownDb()
//   })
//   after(function() {
//     return closeServer()
//   });

//  describe('GET endpoint', function () {

//     it('should return all existing scores', function () {
//       let res;
//       return chai.request(app)
//         .get('/api/scores')
//         .then(_res => {
//           res = _res;
//           res.should.have.status(200);
//     });
// });
//     it('should return predictions with right fields', function () {

//       let resScore;
//       return chai.request(app)
//         .get('/api/scores')
//         .then(function (res) {

//           res.should.have.status(200);
//           res.should.be.json;
//           res.body.forEach(function (scores) {
//             scores.should.include.keys('id', 'AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore', 'Week', 'AwayTeamID', 'HomeTeamID')
//           })
    
//           resScore = res.body[0];
//           return Scores.findById(resScore.id);
//         })
//         .then(score => {
//           resScore.AwayTeamName.should.equal(score.AwayTeamName);
//           resScore.HomeTeamName.should.equal(score.HomeTeamName);
//           resScore.AwayTeamScore.should.equal(score.AwayTeamScore);
//           resScore.HomeTeamScore.should.equal(score.HomeTeamScore);
//         });
//     });
//   });

//   describe('POST endpoint', function () {

//     it('should add a new prediction', function () {

//       const newPrediction = {
//         AwayTeamName: faker.lorem.text(),
//         HomeTeamName: faker.lorem.text(),
//         AwayTeamScore: faker.lorem.text(),
//         HomeTeamScore: faker.lorem.text()
//       };

//       return chai.request(app)
//         .post('/api/scores')
//         console.log(newPrediction)
//         .send(newPrediction)
//         .then(function (res) {
//           res.should.have.status();
//           res.should.be.json;
//           res.body.should.be.a('object');
//           res.body.should.include.keys(
//             'id', 'AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore', 'week');
//           res.body.AwayTeamName.should.equal(newPrediction.AwayTeamName);
//           res.body.HomeTeamName.should.equal(newPrediction.HomeTeamName)
//           res.body.id.should.not.be.null;
//           res.body.AwayTeamScore.should.equal(newPrediction.AwayTeamScore);
//            res.body.HomeTeamScore.should.equal(newPrediction.HomeTeamScore)
//           return Scores.findById(res.body.id);
//         })
//         .then(function (score) {
//           score.AwayTeamName.should.equal(newPrediction.AwayTeamName);
//           score.HomeTeamName.should.equal(newPrediction.HomeTeamName);
//           score.AwayTeamScore.should.equal(newPrediction.AwayTeamScore);
//           score.HomeTeamScore.should.equal(newPrediction.HomeTeamScore);
//         });
//     });
//   });

//   describe('PUT endpoint', function () {
//     it('should update fields you send over', function () {
//       const updateData = {
//         AwayTeamName: 'Florida Gators',
//         HomeTeamName: 'Tennessee Volunteers',
//         AwayTeamScore: '21',
//         HomeTeamScore: '42'
//       };

//       return Scores
//         .findOne()
//         .then(score => {
//           updateData.id = score.id;

//           return chai.request(app)
//             .put(`/api/scores/${score.id}`)
//             .send(updateData);
//         })
//         .then(res => {
//           res.should.have.status(203);
//           return Scores.findById(updateData.id);
//         })
//         .then(score => {
//           score.AwayTeamName.should.equal(updateData.AwayTeamName);
//           score.HomeTeamName.should.equal(updateData.HomeTeamName);
//           score.AwayTeamScore.should.equal(updateData.AwayTeamScore);
//           score.HomeTeamScore.should.equal(updateData.HomeTeamScore);
//         });
//     });
//   });

//   describe('DELETE endpoint', function () {

//     it('should delete a score by id', function () {

//       let score;

//       return Scores
//         .findOne()
//         .then(_score => {
//           score = _score;
//           return chai.request(app).delete(`/api/scores/${score.id}`);
//         })
//         .then(res => {
//           res.should.have.status(204);
//           return Scores.findById(score.id);
//         })
//         .then(_score => {
//           should.not.exist(_score);
//         });
//     });
//   });
// });

// // 'use strict';

// // const chai = require('chai');

// // const chaiHttp = require('chai-http');
// // const faker = require('faker');
// // const mongoose = require('mongoose');

// // const { runServer, app, closeServer} = require('../server');
// // const { TEST_DATABASE_URL } = require('../config');
// // const { Scores } = require('../models/scores')

// // const should = chai.should();

// // chai.use(chaiHttp);

// // function tearDownDb() {
// //   return new Promise((resolve, reject) => {
// //     console.warn('Deleting database');
// //     mongoose.connection.dropDatabase()
// //       .then(result => resolve(result))
// //       .catch(err => reject(err));
// //   });
// // }

// // function seedScoreData() {
// //   const seedData = [];
// //   for(let i = 1; i <= 20; i++) {
// //     seedData.push({
// //     AwayTeamName: 'Florida Gators',
// //     HomeTeamName: 'Tennessee',
// //     AwayTeamScore: '23',
// //     HomeTeamScore: '28',
// //     Week: '4'
// //   });
// //     return Scores.insertMany(seedData)
// //   }
// // }

// // describe('API resource', function() {
// //   before(function() {
// //     return runServer(TEST_DATABASE_URL)
// //   })
// //   beforeEach(function() {
// //     return seedScoreData()
// //   })
// //   afterEach(function() {
// //     return  tearDownDb()
// //   })
// //   after(function() {
// //     return closeServer()
// //   });

// //  describe('GET endpoint', function () {

// //     it('should return all existing scores', function () {
// //       let res;
// //       return chai.request(app)
// //         .get('/api/scores')
// //         .then(_res => {
// //           res = _res;
// //           res.should.have.status(200);
// //     });
// // });
// //     it('should return predictions with right fields', function () {

// //       let resScore;
// //       return chai.request(app)
// //         .get('/api/scores')
// //         .then(function (res) {

// //           res.should.have.status(200);
// //           res.should.be.json;
// //         //   res.body.forEach(function (score) {
// //         //     post.should.include.keys('id', 'AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore', 'Week', 'AwayTeamID', 'HomeTeamID');
// //         //   });
    
// //         //   resScore = res.body[0];
// //         //   return Scores.findById(resScore.id);
// //         // })
// //         // .then(score => {
// //         //   // resScore.AwayTeamName.should.equal(score.AwayTeamName);
// //         //   resScore.HomeTeamName.should.equal(score.HomeTeamName);
// //         //   resScore.AwayTeamScore.should.equal(score.AwayTeamScore);
// //         //   resScore.HomeTeamScore.should.equal(score.HomeTeamScore);
// //         });
// //     });
// //   });

// //   describe('POST endpoint', function () {

// //     it('should add a new prediction', function () {

// //       const newPrediction = {
// //         AwayTeamName: faker.lorem.text(),
// //         HomeTeamName: faker.lorem.text(),
// //         AwayTeamScore: faker.lorem.text(),
// //         HomeTeamScore: faker.lorem.text()
// //       };

// //       return chai.request(app)
// //         .post('/api/scores')
// //         console.log(newPrediction)
// //         .send(newPrediction)
// //         .then(function (res) {
// //           res.should.have.status();
// //           res.should.be.json;
// //           res.body.should.be.a('object');
// //           res.body.should.include.keys(
// //             'id', 'AwayTeamName', 'HomeTeamName', 'AwayTeamScore', 'HomeTeamScore', 'week');
// //           res.body.AwayTeamName.should.equal(newPrediction.AwayTeamName);
// //           res.body.HomeTeamName.should.equal(newPrediction.HomeTeamName)
// //           res.body.id.should.not.be.null;
// //           res.body.AwayTeamScore.should.equal(newPrediction.AwayTeamScore);
// //            res.body.HomeTeamScore.should.equal(newPrediction.HomeTeamScore)
// //           return Scores.findById(res.body.id);
// //         })
// //         .then(function (score) {
// //           score.AwayTeamName.should.equal(newPrediction.AwayTeamName);
// //           score.HomeTeamName.should.equal(newPrediction.HomeTeamName);
// //           score.AwayTeamScore.should.equal(newPrediction.AwayTeamScore);
// //           score.HomeTeamScore.should.equal(newPrediction.HomeTeamScore);
// //         });
// //     });
// //   });

// //   describe('PUT endpoint', function () {
// //     it('should update fields you send over', function () {
// //       const updateData = {
// //         AwayTeamName: 'Tennessee Volunteers',
// //         HomeTeamName: 'Georgia Bulldogs',
// //         AwayTeamScore: '21',
// //         HomeTeamScore: '42'
// //       };

// //       return Scores
// //         .findOne()
// //         .then(score => {
// //           updateData.id = score.id;

// //           return chai.request(app)
// //             .put(`/api/scores/${score.id}`)
// //             .send(updateData);
// //         })
// //         .then(res => {
// //           res.should.be.json;
// //           (res.body).should.be.a('object')
// //           // res.should.have.status(204);
// //           return Scores.findById(updateData.id);
// //         })
// //         .then(score => {
// //           score.AwayTeamName.should.equal(updateData.AwayTeamName);
// //           score.HomeTeamName.should.equal(updateData.HomeTeamName);
// //           score.AwayTeamScore.should.equal(updateData.AwayTeamScore);
// //           score.HomeTeamScore.should.equal(updateData.HomeTeamScore);
// //         });
// //     });
// //   });

// //   describe('DELETE endpoint', function () {

// //     it('should delete a score by id', function () {

// //       let score;

// //       return Scores
// //         .findOne()
// //         .then(_score => {
// //           score = _score;
// //           return chai.request(app).delete(`/api/scores/${score.id}`);
// //         })
// //         .then(res => {
// //           res.should.have.status(204);
// //           return Scores.findById(score.id);
// //         })
// //         .then(_score => {
// //           // when a variable's value is null, chaining `should`
// //           // doesn't work. so `_post.should.be.null` would raise
// //           // an error. `should.be.null(_post)` is how we can
// //           // make assertions about a null value.
// //           should.not.exist(_score);
// //         });
// //     });
// //   });
// // });
// >>>>>>> temp-branch

