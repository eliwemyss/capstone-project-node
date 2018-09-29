'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('./config');

const userRouter  = require('./user/user-router.js');
const authRouter = require('./user/auth-router');
const scoreRouter  = require('./router');
const { localStrategy, jwtStrategy } = require('./user/auth-strategies')


const app = express();

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(express.static("public"));
app.use(morgan('common'));
app.use(express.json());

app.use('/api/users', userRouter);
app.use(scoreRouter);

app.use('/api/auth', authRouter);


let server;

module.exports = { 
  runServer, 
  app, 
  closeServer 
};

// function runServer(databaseUrl = DATABASE_URL, port = PORT) {
function runServer(testEnv) {

    return new Promise((resolve, reject) => {
        let databaseUrl;

        if (testEnv) {
           databaseUrl = TEST_DATABASE_URL;
        } else {
            databaseUrl = DATABASE_URL;
        }
        mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
            if (err) {
                console.error(err);
                return reject(err);
            } else {
                server = app.listen(PORT, () => {
                    console.log(`App is listening on http://localhost:${PORT}`);
                    resolve();
                }).on('error', err => {
                    mongoose.disconnect();
                    console.error(err);
                    reject(err);
                });
            }
        });
    });
}

function closeServer() {
    return mongoose
        .disconnect()
        .then(() => new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    console.error(err);
                    return reject(err);
                } else {
                    console.log('Closing server');
                    resolve();
                }
            });
            }));
      }
  

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

