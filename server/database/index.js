const pgPromise = require('pg-promise')();
const database = pgPromise(process.env.DATABASE_URL);

module.exports = database;
