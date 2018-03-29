const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/index.js')
const schedule = require('node-schedule')
const axios = require('axios')
const app = express()
app.use(bodyParser.json())

const sendReminder = require('./issue.js')



app.listen(8080, function() {
  console.log('listening on port 8080!')
})

// '* * * 24 * *'
schedule.scheduleJob('0 * * * * *', function(){
	db.query(`SELECT * FROM reminders`, (err,result) =>{
		if(err) console.error(err)
		var data = result
		data.forEach(reminder => {

			db.query(`SELECT * FROM users WHERE id=${reminder.user_id}`, (err,result) =>{
				if(err) throw err
				if(result[0].notif_endpoint){

					const packet = { user: result[0], reminder: reminder }

					axios.post("http://localhost:3000/triggerPushNotifications", packet)
					     .then((done) => console.log('done'))
					     .catch((err) => console.log(err))
					
				}else{
					console.log('sending email')
					sendReminder(reminder)
				}
			} )
		})
	})
})




