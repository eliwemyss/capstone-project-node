const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const { JWT_SECRET, JWT_EXPIRY, TEST_DATABASE_URL } = require('../config');
const { runServer, app, closeServer } = require('../server.js');
const { User } = require('../models/users');


const expect = chai.expect; 
chai.use(chaiHttp); 

describe('Integration tests for: /api/auth', function () {
    let testUser, jwtToken;

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        testUser = createFakerUser();

        return User.hashPassword(testUser.password).then(hashedPassword => {
            return User.create({
                name: testUser.name,
                username: testUser.username,
                password: hashedPassword
            })
                .then(createdUser => {
                    testUser.id = createdUser.id;

                    jwtToken = jsonwebtoken.sign(
                        {
                            user: {
                                id: testUser.id,
                                name: testUser.name,
                                username: testUser.username
                            }
                        },
                        JWT_SECRET,
                        {
                            algorithm: 'HS256',
                            expiresIn: JWT_EXPIRY,
                            subject: testUser.username
                        }
                    );
                })
                .catch(err => {
                    console.error(err);
                });
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

    it('Should login correctly and return a valid JSON Web Token', function () {
        return chai.request(app)
            .post('/api/auth/login')
            .send({
                username: testUser.username,
                password: testUser.password
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('jwtToken');

                const jwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
                    algorithm: ['HS256']
                });
                expect(jwtPayload.user).to.be.a('object');
                expect(jwtPayload.user).to.deep.include({
                    username: testUser.username,
                    name: testUser.name
                });
            });
    });

    // it('Should refresh the user JSON Web Token', function () {
    //     const firstJwtPayload = jsonwebtoken.verify(jwtToken, JWT_SECRET, {
    //         algorithm: ['HS256']
    //     });
    //     return chai.request(app)
    //         .post('/api/auth/refresh')
    //         .set('Authorization', `Bearer ${jwtToken}`)
    //         .then(res => {
    //             // expect(res).to.have.status(200);
    //             expect(res).to.be.json;
    //             expect(res.body).to.be.a('object');
    //             expect(res.body).to.include.keys('jwtToken');

    //             const newJwtPayload = jsonwebtoken.verify(res.body.jwtToken, JWT_SECRET, {
    //                 algorithm: ['HS256']
    //             });
    //             expect(newJwtPayload.user).to.be.a('object');
    //             expect(newJwtPayload.user).to.deep.include({
    //                 username: testUser.username,
    //                 name: testUser.name
    //             });

    //             expect(newJwtPayload.exp).to.be.at.least(firstJwtPayload.exp);
    // //         });
    // });

    function createFakerUser() {
        return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
        };
    }
});