
'use strict';

const chai = require('chai');

const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');
const { TEST_DATABASE_URL } = require('../config');
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
    AwayTeamName: 'Florida Gators',
    HomeTeamName: 'Tennessee Volunteers',
    AwayTeamScore: '23',
    HomeTeamScore: '28',
    Week: '4'
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

    it('should return all existing user inputted predictions', function () {
      let res;
      return chai.request(app)
        .get('/api/predictions')
        .then(_res => {
          res = _res;
          expect(res).to.have.status(200);
    });
});
    it('should return user inputted predictions with right fields', function () {

      let resScore;
      return chai.request(app)
        .get('/api/predictions')
        .then(function (res) {
          expect(res).to.have.status(200)
          expect(res).to.be.json;
        });
    });
  });
})