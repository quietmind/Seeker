var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt');
var passport = require('passport');
var db = require('../database/index.js');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'someSuperSecretString',
  cookie: {maxAge: 600000}
}))

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

var checkSession = function(req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    console.error('not logged in')
  }
}

app.post('/users', function(req, res) {
  db.getUserCredentials(req.body, function(err, results) {
    if (err) console.error(err)
    if (results.length === 0) {
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if (err) console.error(err)
        db.createUser(req.body.username, hash, function(err) {
          if (err) console.error(err)
          db.getUserCredentials(req.body, function(err, results) {
            if (err) console.error(err)
            db.addDefaultPhases(results.id, function(err) {
              if (err) console.error(err)
              res.status(201).send()
            })
          })
        })
      })
    } else {
      res.status(403).send()
    }
  })
})

app.post('/phases', checkSession, function(req, res) {
  db.createPhase(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.post('/applications', checkSession, function(req, res) {
  db.createApp(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.get('/users', function(req, res) {
  db.getUserCredentials(req.body, function(err, results) {
    if (err) console.error(err)
    if (results.length > 0) {
      bcrypt.compare(pass, results[0].password, function(err, match) {
        if (match) {
          req.session.userId = results[0].id
          res.send()
        } else {
          res.status(403).send()
        }
      })
    } else {
      res.status(403).send()
    }
  })
})

app.get('/phases', checkSession, function(req, res) {
  db.getUserPhases(req.body, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.get('/applications', checkSession, function(req, res) {
  db.getUserApps(req.body, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.post('/order', checkSession, function(req, res) {
  db.updatePhase(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.post('/details', checkSession, function(req, res) {
  db.updateApp(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.delete('/phases', checkSession, function(req, res) {
  db.deletePhase(req.body, function(err) {
    if (err) console.error(err)
    res.status(202).send()
  })
})

app.delete('/applications', checkSession, function(req, res) {
  db.deleteApp(req.body, function(err) {
    if (err) console.error(err)
    res.status(202).send()
  })
})