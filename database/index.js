var mysql = require('mysql')

var connection = mysql.createConnection({
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

module.exports.getUserPhases = function(userId, callback) {
  connection.query(
    `SELECT * FROM phases INNER JOIN phase_order ON phases.id = phase_order.phase_id WHERE user_id = ${userId}`,
    // `SELECT * FROM phases INNER JOIN phase_order ON phases.id = phase_order.phase_id WHERE phase.user_id = ${userId} AND phase_order.user_id = ${userId}`,
    // `SELECT * FROM phases, phase_order WHERE phases.id = phase_order.phase_id AND user_id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getUserApps = function(userId, callback) {
  connection.query(
    `SELECT * FROM applications WHERE user_id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}