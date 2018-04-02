const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/index.js')
const schedule = require('node-schedule')
const axios = require('axios')
const app = express()
const moment = require('moment')
const sendReminder = require('./issue.js')
app.use(bodyParser.json())

app.listen(8080, function() {
  console.log('listening on port 8080!')
})

// '* * * 24 * *'
schedule.scheduleJob('0 * * * * *', function(){
	//get current date
	let today = moment(new Date()).format('YYYY-MM-DD')

	//query reminders db for all reminders that are due today
	db.query(`SELECT * FROM reminders WHERE due_date="${today}"`, (err,result) =>{
		if(err) console.error(err)
		var data = result

		//for each reminder find the user assocaited
		data.forEach(reminder => {
			db.query(`SELECT * FROM users WHERE id=${reminder.user_id}`, (err,result) =>{
				if(err) throw err

					//if this user has subscribed to push notifications
				if(result[0].notif_endpoint){

					//prepare packet to be sent
					const packet = { user: result[0], reminder: reminder }

					//post to web server for client delivery
					axios.post("http://localhost:3000/triggerPushNotifications", packet)
					     .then((done) => console.log('done'))
					     .catch((err) => console.log(err))

				} else {
					//if the user has not subscribed to push notifiations
					// send them an email reminder
					console.log('sending email')
					const packet = { email: result[0].user_email, reminder: reminder.text_desc }
					sendReminder(reminder)
				}
			} )
		})
	})
})
