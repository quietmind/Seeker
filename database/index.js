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

module.exports.createUser = function(userEmail, password, googleId, callback) {
  connection.query(
    `INSERT INTO users (id, user_email, password, google_id) VALUES (?, ?, ?, ?)`,
    [null, userEmail, password, googleId],
    function(err, response) {
      callback(err, response)
    }
  )
}

module.exports.createPhase = function(data, callback) {
  connection.query(
    `INSERT INTO phases (id, user_id, phase_label, phase_order) VALUES (?, ?, ?, ?)`,
    [null, data.userId, data.phaseLabel, data.phaseOrder],
    function(err) {
      callback(err)
    }
  )
}

module.exports.createApp = function(userId, data, callback) {
  connection.query(
    `INSERT INTO applications (id, user_id, phase_id, reminder_id, resume_id, cover_letter_id, job_title, company, point_of_contact, date_created, last_update) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [null, userId, data.phaseId, data.reminderId, data.resumeId, data.coverLetterId, data.jobTitle, data.company, data.contact, data.date, data.date],
    function(err) {
      if (err) console.error(err);
      callback(err)
    }
  )
}

module.exports.addDefaultPhases = function(userId, callback) {
  connection.query(
    `INSERT INTO phases (id, user_id, phase_label, phase_order)
    VALUES (null, ${userId}, 'Not Yet Applied', 0),
    (null, ${userId}, 'Applied', 1),
    (null, ${userId}, 'Received Response', 2),
    (null, ${userId}, 'Interviewed', 3),
    (null, ${userId}, 'Received Job Offer', 4)`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.addFile = function(userId, s3url, filename, callback) {
  connection.query(
    `INSERT INTO files (id, user_id, s3_url, file_name)
    VALUES (null, ${userId}, '${s3url}', '${filename}')`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.getUser = function(userId, callback) {
  connection.query(
    `SELECT * FROM users WHERE id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getUserCredentials = function(userEmail, callback) {
  connection.query(
    `SELECT * FROM users WHERE user_email = '${userEmail}'`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getGoogleCredentials = function(googleId, callback) {
  connection.query(
    `SELECT * FROM users WHERE google_id = '${googleId}'`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getUserPhases = function(userId, callback) {
  connection.query(
    `SELECT * FROM phases WHERE user_id = ${userId} ORDER BY phase_order ASC`,
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

module.exports.getNotes = function(userId, callback) {
  connection.query(
    `SELECT * FROM notes WHERE user_id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getReminders = function(userId, callback) {
  connection.query(
    `SELECT * FROM reminders WHERE user_id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.getFiles = function(userId, callback) {
  connection.query(
    `SELECT * FROM files WHERE user_id = ${userId}`,
    function(err, results) {
      callback(err, results)
    }
  )
}

module.exports.updateToken = function(userId, accessToken, refreshToken, callback) {
  connection.query(
    `UPDATE users SET access_token = '${accessToken}', refresh_token = '${refreshToken}' WHERE id = ${userId}`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.updatePhaseOrder = function(phases, callback) {
  for (let i = 0; i < phases.length; i++) {
    connection.query(
      `UPDATE phases SET phase_order = ${i} WHERE id = ${phases[i].id}`,
      function(err) {
        callback(err)
      }
    )
  }
}

module.exports.updateApp = function(data, callback) {
  connection.query(
    `UPDATE applications
    SET phase_id = ${data.phaseId},
    reminder_id = ${data.reminderId},
    resume_id = ${data.resumeId},
    cover_letter_id = ${data.coverLetterId},
    job_title = '${data.jobTitle}',
    company = '${data.company}',
    point_of_contact = '${data.contact},
    last_update = ${data.date}
    WHERE id = ${data.appId}`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.updateStatus = function(data, callback){
  connection.query(`UPDATE applications
    SET phase_id=${data.newStatusId}
    WHERE id=${data.appId}`,
    function(err){
      callback(err)
    }
  )
}

module.exports.deletePhase = function(phaseId, callback) {
  connection.query(`UPDATE applications
    SET phase_id=1
    WHERE phase_id=${phaseId}`, (err) => callback(err)
  )
  connection.query(
    `DELETE FROM phases WHERE id=${phaseId}`,
    (err) => callback(err)
  )
}

module.exports.deleteApp = function(appId, callback) {
  connection.query(
    `DELETE FROM applications WHERE id = ${appId}`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.deleteNotes = function(appId, callback) {
  connection.query(
    `DELETE FROM notes WHERE app_id = ${appId}`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.deleteReminders = function(appId, callback) {
  connection.query(
    `DELETE FROM reminders WHERE app_id = ${appId}`,
    function(err) {
      callback(err)
    }
  )
}

module.exports.addReminder = function(body, callback) {
  connection.query(
    `INSERT INTO reminders (id, user_id, user_email, job_title, company, point_of_contact, due_date, text_desc, app_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [null, body.userId, body.email, body.job_title, body.company, body.point_of_contact, body.date, body.description, body.appId],
    function(err) {
      callback(err)
    }
  )
}

module.exports.addNotes = function(body, callback) {
  connection.query(
    `INSERT INTO notes (id, app_id, note_text, user_id)
    VALUES (?, ?, ?, ?)`,
    [null, body.appId, body.text, body.userId],
    function(err) {
      callback(err)
    }
  )
}

module.exports.saveNotificationData = function(body, callback){
  body = JSON.parse(body)
  connection.query(`UPDATE users
    SET notif_endpoint="${body.endpoint}",
    notif_key="${body.keys.p256dh}",
    notif_auth="${body.keys.auth}"
    WHERE id=${body.id}
    `)
}
