var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var db = require('../database/index.js');
var app = express();
var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var RateLimit = require('express-rate-limit');
var config = require('../configurations');
var fs = require('fs');


app.enable('trust proxy');
var limiter = new RateLimit({
  windowMs: 15*60*1000, 
  max: 0, 
  delayMs: 0 
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'someSuperSecretString',
  cookie: {maxAge: 600000}
}));
//app.use('/updateStatus',limiter);


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

aws.config.update({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyID,
    region: 'us-east-2'
});

var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucket,
    key: function(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`);
    }
  })
});

app.post('/users', function(req, res) {
  console.log('received post request', req.body)
  db.getUserCredentials(req.body.username, function(err, results) {
    if (err) console.error(err)
    console.log('queried the db', results)
    if (results.length === 0) {
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if (err) console.error(err)
        console.log('hashed password')
        db.createUser(req.body.username, hash, function(err) {
          if (err) console.error(err)
          console.log('created new user')
          db.getUserCredentials(req.body.username, function(err, results) {
            if (err) console.error(err)
            console.log('got user id from db', results)
            db.addDefaultPhases(results[0].id, function(err) {
              if (err) console.error(err)
              console.log('added default phases')
              res.status(201).send(`${results[0].id}`)
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
  console.log('received post request from client', req.body)
  db.createApp(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.get('/users', function(req, res) {
  console.log('request query', req.query)
  db.getUserCredentials(req.query.username, function(err, results) {
    console.log('got a response from the db', results)
    if (err) console.error(err)
    if (results.length > 0) {
      console.log('results array contained at least one entry', results[0])
      bcrypt.compare(req.query.password, results[0].password, function(err, match) {
        if (match) {
          console.log('results array contained a match')
          req.session.userId = results[0].id
          res.status(200).send(`${results[0].id}`)
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
  db.getUserPhases(req.session.userId, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.get('/applications', checkSession, function(req, res) {
  db.getUserApps(req.session.userId, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.get('/reminders', checkSession, function(req, res) {
  console.log('received get request for reminders from client', req.query)
  db.getReminders(req.query.reminderIds, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.get('/resumes', checkSession, function(req, res) {
  console.log('received get request for resumes from client', req.query)
  db.getResumes(req.query.resumeIds, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.post('/resumes', checkSession, upload.any(), function(req, res) {
  console.log("Did it go through?");
})

app.get('/coverletters', checkSession, function(req, res) {
  console.log('received get request for cover letters from client', req.query)
  db.getCoverletters(req.query.coverletterIds, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.post('/order', checkSession, function(req, res) {
  db.updatePhaseOrder(req.body.phases, function(err) {
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

app.post('/updateStatus', checkSession, function(req, res){
  db.updateStatus(req.body, function(err){
    if(err) console.error(err)
    res.status(201).send()
  })
})

app.delete('/phases', checkSession, function(req, res) {
  db.deletePhase(req.query.phaseId, function(err) {
    if (err) console.error(err)
    res.status(202).send()
  })
})

app.delete('/applications', checkSession, function(req, res) {
  db.deleteApp(req.query.appId, function(err) {
    if (err) console.error(err)
    res.status(202).send()
  })
})
