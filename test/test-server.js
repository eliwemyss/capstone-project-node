'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server');

const { TEST_DATABASE_URL } = require('../config');

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

describe('API', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL)
	});
	after(function() {
		return closeServer();
	});

	it('should respond with status 200', function(){
		return chai
			.request(app)
			.get('/api/scores')
			.then(function(res) {
				expect(res).to.have.status(200)
			})
	})
})

