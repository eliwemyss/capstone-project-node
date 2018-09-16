'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');

const { TEST_DATABASE_URL } = require('../config');
// const { Scores } = require('/models/scores')

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

describe("score object", function () {
  before(function () {
    return runServer(TEST_DATABASE_URL)

    after(function () {
      return closeServer();
    });

    it("should POST a prediction given proper input", function () {
      const newPrediction = {
        awayTeam: "Tennessee",
        homeTeam: "Georgia",
        week: "5",
        awayScore: "28",
        homeScore: "31"
      };
      const expectedKeys = ["_id", "awayScore", "homeScore"].concat(Object.keys(newPrediction));

      return chai
        .request(app)
        .post("/api/records")
        .send(newPrediction)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res).to.be.a("object");
          expect(res.body).to.have.all.keys(expectedKeys);
          expect(res.body.awayTeam).to.equal(newPrediction.awayTeam);
          expect(res.body.homeTeam).to.equal(newPrediction.homeTeam);
          expect(res.body.week).to.equal(newPrediction.week);
          expect(res.body.awayScore).to.equal(newPrediction.awayScore);
          expect(res.body.homeScore).to.equal(newPrediction.homeScore);
        });

      it("should error if POST does not contain expected keys", function () {
        const badRequestData = {};
        return chai
          .request(app)
          .post("/")
          .send(badRequestData)
          .catch(function (res) {
            expect(res).to.have.status(400);
          });
      });
    });

    it("should GET a collection of scores", function () {
      return chai.request(app)
        .get("/")
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.be.a("array")
          expect(res).to.have.length.of.at.least(1);
        });

    });

    it("should PUT a user edit to an existing prediction given a valid ID", function () {
      const updateData = {
      awayScore: '33',
      homeScore: '45'
    };

    return Scores
      .findOne()
      .then(function(res) {
        updateData.id = scores.id;

        return chai.request(app)
          .put(`/api/records/${record.id}`)
          .send(updateData);
      })
      .then(function(res) {
        expect(res).to.have.status(204);

        return Scores.findById(updateData.id);
      })
      .then(function(scores) {
        expect(scores.awayScore).to.equal(updateData.awayScore);
        expect(scores.homeScore).to.equal(updateData.homeScore);
      });

    });

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
  });


