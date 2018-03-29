const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DB_URL || 'seeker.c7l7qn51j1yo.us-east-2.rds.amazonaws.com',
  user: 'HouseLannister',
  password: 'hearmeroar',
  database: 'seeker'
})

connection.connect((err) => {
  if (err) {
    console.log('error connecting to the db');
  } else {
    console.log('connected to the db');
  }
})

module.exports = connection