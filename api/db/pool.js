require ('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DBURL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false,
  } : false
});

module.exports = pool;