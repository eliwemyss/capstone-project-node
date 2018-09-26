'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/scores-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-scores-app';
exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
