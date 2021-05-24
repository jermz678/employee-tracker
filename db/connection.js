const mysql = require('mysql2');
//require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
  },
  console.log('Connected to the election database.')
  );

  module.exports = db;