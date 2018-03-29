const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const request = require('request')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const strategy = require('./passport.js');
const db = require('../database/index.js')
const app = express()
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const RateLimit = require('express-rate-limit')
const config = require('../configurations')
const fs = require('fs')
const webpush = require('web-push')

const vapidKeys = {
  publicKey:  'BKn9Z71eyV2fgYztoT3XDC31ANF3HLmKuXKmkQR9OoMw-9trIi4JguYx-Y5kJ0xLddXlJTrPWmpnWcA5ebFHRfY',
  privateKey: 'TDqrGVKsB2ioHKEvpCqje8AIjQiahRRFOpXoUbAFyOU'
}

webpush.setVapidDetails(
  'mailto:adammateo@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

app.enable('trust proxy');
const limiter = new RateLimit({
  windowMs: 15*60*1000,
  max: 0,
  delayMs: 0
})

app.use(express.static(__dirname + '/../client/dist'))
app.use(bodyParser.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.session.secret,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function() {
  console.log('listening on port 3000!')
})

const checkSession =function(req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    console.log("user not logged in")
    res.redirect('/')
  }
}

aws.config.update({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyID,
    region: 'us-east-2'
})

var s3 = new aws.S3()

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      cb(null, `${new Date()}-${file.originalname}`)
    }
  })
})

app.get('/oauth', passport.authenticate('google', {
  scope: ['profile', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/contacts', 'https://www.googleapis.com/auth/gmail.insert']
}))

app.get('/google', passport.authenticate('google'), (req, res) => {
  console.log(req.user.id)
  req.session.userId = req.user.id
  res.redirect('/')
})

app.get('/session', function(req, res) {
  if (req.session.userId) {
    res.status(200).send(`${req.session.userId}`)
  } else
    res.status(403).send()
})

app.post('/users', function(req, res) {
  console.log('received post request', req.body)
  db.getUserCredentials(req.body.userEmail, function(err, results) {
    if (err) console.error(err)
    console.log('queried the db', results)
    if (results.length === 0) {
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if (err) console.error(err)
        console.log('hashed password')
        db.createUser(req.body.userEmail, hash, null, function(err, results) {
          if (err) console.error(err)
          console.log('created new user', results.insertId)
          db.addDefaultPhases(results.insertId, function(err) {
            if (err) console.error(err)
            console.log('added default phases')
            res.status(201).send(`${results.insertId}`)
          })
        })
      })
    } else {
      res.status(403).send()
    }
  })
})

app.post('/phase', checkSession, function(req, res) {
  console.log(req.body)
  db.createPhase(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.post('/applications', checkSession, function(req, res) {
  db.createApp(req.session.userId, req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.post('/files', checkSession, upload.any(), function(req, res) {
  db.addFile(req.session.userId, req.files[0].location, req.body.name, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.get('/users', function(req, res) {
  console.log('request query', req.query)
  db.getUserCredentials(req.query.userEmail, function(err, results) {
    console.log('got a response from the db', results)
    if (err) console.error(err)
    if (results) {
      console.log('results array contained at least one entry', results[0])
      bcrypt.compare(req.query.password, results[0].password, function(err, match) {
        if (match) {
          console.log('results array contained a match')
          req.session.userId = results[0].id
          var sendingData = [];
          sendingData.push(results[0].id, results[0].user_email);
          res.status(200).send(sendingData)
        } else {
          res.status(403).send()
        }
      })
    } else {
      res.status(403).send()
    }
  })
})

app.post('/saveSubscription', checkSession, function(req,res) {
  let newSub = JSON.parse(req.body.data)
  newSub.id = req.session.userId
  newSub = JSON.stringify(newSub)
  db.saveNotificationData(newSub, function(err, results){
    if(err) throw err
    res.status(200).end()
  })


})

app.post('/triggerPushNotifications', function(req, res) {
  let subscriptionDetails = req.body.user
  let content = req.body.reminder

  let subscripObject = {
      endpoint: subscriptionDetails.notif_endpoint,
      keys: {
          "p256dh": subscriptionDetails.notif_key,
          "auth": subscriptionDetails.notif_auth
      }
    }
  console.log(subscripObject)
  const note = {
    notification: {
      "title": `Don't forget to...`,
      "body": content.text_desc,
      "icon": ""
    }
  }
  webpush.sendNotification(subscripObject, JSON.stringify(note))
         .then((done) => console.log('finished'))
         .catch((err) => console.log(err))
  res.end()
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
  db.getReminders(req.session.userId, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.post('/reminders', checkSession, function(req, res) {
  db.addReminder(req.body, function(err, results) {
    res.status(200).send(results)
  })
})

app.get('/notes', checkSession, function(req, res) {
  db.getNotes(req.session.userId, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.get('/files', checkSession, function(req, res) {
  db.getFiles(req.session.userId, function(err, results) {
    if (err) console.error(err)
    res.status(200).send(results)
  })
})

app.post('/order', checkSession, function(req, res) {
  console.log(req.body)
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

app.post('/phases', checkSession, function(req, res) {
  db.deletePhase(req.body.phaseId, function(err) {
    if (err) console.error(err)
    res.status(202).send()
  })
})

app.delete('/applications', checkSession, function(req, res) {
  db.deleteNotes(req.body.appId, function(err) {
    if (err) console.error(err)
    else db.deleteReminders(req.body.appId, function(err) {
      if (err) console.error(err)
      else db.deleteApp(req.body.appId, function(err) {
        if (err) console.error(err)
        res.status(201).send()
      })
    })
  })
})

app.post('/logout', checkSession, function(req,res) {
  console.log('axios received')
  req.session.destroy()
  res.status(200).redirect('/')
})

app.post('/notes', checkSession, function(req, res) {
  console.log(req.body);
  db.addNotes(req.body, function(err) {
    if (err) console.error(err)
    res.status(201).send()
  })
})

app.get('/*', checkSession, function(req, res) {
  res.status(200).redirect('/')
})
