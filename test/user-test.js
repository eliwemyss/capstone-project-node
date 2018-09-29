const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const faker = require('faker');

const { runServer, app, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');
const { User } = require('../models/users');

const expect = chai.expect; 
chai.use(chaiHttp); 
describe('Integration tests for: /api/users', function () {
    let testUser;

    before(function () {

        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        testUser = createFakerUser();
        return User.create(testUser)
            .then(() => { })
            .catch(err => {
                console.error(err);
            });
    });

    afterEach(function () {
        return new Promise((resolve, reject) => {
            mongoose.connection.dropDatabase()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    });

    after(function () {
        return closeServer();
    });

    it('Should return all users', function () {
        return chai.request(app)
            .get('/api/users')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                expect(res.body[0]).to.include.keys('id', 'name', 'username');
                expect(res.body[0]).to.not.include.keys('password');
            });
    });

    it('Should return a specific user', function () {
        let foundUser;
        return chai.request(app)
            .get('/api/users')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                foundUser = res.body[0];
                return chai.request(app).get(`/api/users/${foundUser.id}`);
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body.id).to.equal(foundUser.id);
            });
    });

    it('Should create a new user', function () {
        let newUser = createFakerUser();
        return chai.request(app)
            .post('/api/users')
            .send(newUser)
            .then(res => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('id', 'name', 'username');
                expect(res.body.name).to.equal(newUser.name);
                expect(res.body.username).to.equal(newUser.username);
            });
    });

    function createFakerUser() {
        return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
        };
    }
});