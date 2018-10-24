
'use strict';

const chai = require('chai');

const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { Scores } = require('../models/scores')
const { Predictions } = require('../models/predictions')

const expect = chai.expect;

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedScoreData() {
  const seedData = [];
  for(let i = 1; i <= 20; i++) {
    seedData.push({
    'AwayTeamName': 'Florida Gators',
    'HomeTeamName': 'Tennessee Volunteers',
    'AwayTeamScore': '23',
    'HomeTeamScore': '28',
    'Week': '4'
  });
    return Predictions.insertMany(seedData)
  }
}

describe('API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL)
  })
  beforeEach(function() {
    return seedScoreData()
  })
  afterEach(function() {
    return  tearDownDb()
  })
  after(function() {
    return closeServer()
  });

 describe('GET endpoint', function () {

    it('should return matchups', function () {
      let res;
      return chai.request(app)
        .get('/api/scores')
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
    });
});

    it('should return user inputted predictions', function () {
      let res;
      return chai.request(app)
        .get('/api/predictions')
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
    });
});
    it('should return predictions with right fields', function () {

      let resScore;
      return chai.request(app)
        .get('/api/scores')
        .then(function (res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json;
        });
    });
  });

  describe('POST endpoint', function () {

    it('should add a new prediction', function () {

      const newPrediction = createFakeScore();

      return chai.request(app)
        .post('/api/predictions')
        console.log(newPrediction)
        .send(newPrediction)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object')
          expect(res.body).to.include.keys(
            'id','AwayTeamName','AwayTeamScore', 'HomeTeamName', 'HomeTeamScore');
          expect(res.body.AwayTeamScore).to.equal(newPrediction.AwayTeamScore);
          expect(res.body.HomeTeamScore).to.equal(newPrediction.HomeTeamScore);
          return Scores.findById(res.body.id);
        })
        .then(function (score) {
          expect(res.body.AwayTeamScore).to.equal(newPrediction.AwayTeamScore);
          expect(res.body.HomeTeamScore).to.equal(newPrediction.HomeTeamScore);
          expect(res.body.AwayTeamName).to.equal(newPrediction.AwayTeamName);
          expect(res.body.HomeTeamName).to.equal(newPrediction.HomeTeamName);
        });
    });
  });

  describe('PUT endpoint', function () {
    it('should update fields you send over', function () {
      let scoreToUpdate;
      const newScore = createFakeScore();
      return Predictions.find()
        .then(scores => {
          expect(scores).to.be.a('array');
          scoreToUpdate = scores [0];
        })
      })
  })

  describe('DELETE endpoint', function () {

    it('should delete a score by id', function () {

      let score;

      return Predictions
        .findOne()
        .then(_score => {
          score = _score;
          return chai.request(app).delete(`/api/predictions/${score.id}`);
        })
        .then(res => {
          expect(res).to.have.status(204);
          return Predictions.findById(score.id);
        })
        .then(_score => {
          expect(_score).to.not.exist;
        });
    });
  });
});

function createFakeScore() {
  return{
    'AwayTeamName': faker.random.number(100),
    'HomeTeamScore': faker.random.number(100)
  };
}





