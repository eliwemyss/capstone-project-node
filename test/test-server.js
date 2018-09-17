'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const {app, runServer, closeServer} = require('../server');

const { TEST_DATABASE_URL } = require('../config');
const { Scores } = require('../models/scores')

const expect = chai.expect

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

// function seedData() {
// 	const seedScores = [];
// 	for(let i = 0; i <= 25; i++) {
// 		seedScores.push({
// 			scores: {
// 				awayTeamName: faker.name.firstName(),
// 				homeTeamName: faker.name.lastName(),
// 				awayTeamScore: faker.random(),
// 				homeTeamScore: faker.random()
// 			}
// 		});
// 	}
// 	return Scores.insertMany(seedScores);
// }

// describe('score predictions API resource', function() {
// 	before(function() {
		
// 	})
// })


describe('GET endpoint', function() {
	// it('should respond with status 200', function(){
	// 	return chai
	// 		.request(app)
	// 		.get('/')
	// 		.then(function(res) {
	// 			expect(res).to.have.status(200);
	// 		})
	// })



    // it("should POST a prediction given proper input", function (done) {
    //   const newPrediction = {
    //     awayTeamName: "Tennessee",
    //     homeTeamName: "Georgia",
    //     week: "5",
    //     awayTeamScore: "28",
    //     homeTeamScore: "31"
    //   };
    //   const expectedKeys = ["_id", "awayTeamName", "homeTeamName", "week", "awayTeamScore", "homeTeamScore"].concat(Object.keys(newPrediction));

    //   return chai
    //     .request(app)
    //     .post("/api/scores")
    //     .send(newPrediction)
    //     .then(function (res) {
    //       expect(res).to.have.status(201);
    //       expect(res).to.be.json;
    //       expect(res).to.be.a("object");
    //       expect(res.body).to.have.all.keys(expectedKeys);
    //       expect(res.body.awayTeamName).to.equal(newPrediction.awayTeamName);
    //       expect(res.body.homeTeamName).to.equal(newPrediction.homeTeamName);
    //       expect(res.body.week).to.equal(newPrediction.week);
    //       expect(res.body.awayTeamScore).to.equal(newPrediction.awayTeamScore);
    //       expect(res.body.homeTeamScore).to.equal(newPrediction.homeTeamScore);

    //     })
    //     .then(done, done);
    // });

    //   it("should error if POST does not contain expected keys", function () {
    //     const badRequestData = {};
    //     return chai
    //       .request(app)
    //       .post("/")
    //       .send(badRequestData)
    //       .catch(function (res) {
    //         expect(res).to.have.status(400);
    //       });
    //   });
    // });

    // it("should GET a collection of scores", function () {
    //   return chai.request(app)
    //     .get("/")
    //     .then(function (res) {
    //       expect(res).to.have.status(200);
    //       // expect(res).to.be.json;
    //       // expect(res).to.be.a("array")
    //       // expect(res).to.have.length.of.at.least(1);
    //     });

    // });

    // it("should PUT a user edit to an existing prediction given a valid ID", function () {
    //   const updateData = {
    //   awayTeamScore: '33',
    //   homeTeamScore: '45'
    // };

    // return Scores
    //   .findOne(_id)
    //   .then(function(res) {
    //     updateData.id = scores.id;

    //     return chai.request(app)
    //       .put(`/api/scores/${score.id}`)
    //       .send(updateData);
    //   })
    //   .then(function(res) {
    //     expect(res).to.have.status(204);

    //     return Scores.findById(updateData.id);
    //   })
    //   .then(function(scores) {
    //     expect(scores.awayTeamScore).to.equal(updateData.awayTeamScore);
    //     expect(scores.homeTeamScore).to.equal(updateData.homeTeamScore);
    //   });

    // });

    it("should DELETE a prediction given a valid ID", function () {
      let scores;

      return Scores
        .findOne()
        .then(function(_score) {
          score = _score;
          return chai.request(app).delete(`/api/scores/${score.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Scores.findById(score.id);
        })
        .then(function(_score) {
          expect(_score).to.be.null;
        });
    });

});


