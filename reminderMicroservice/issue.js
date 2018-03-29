const axios = require('axios')

const sendReminder = (reminder) =>{
  var rootUrl = 'https://api.elasticemail.com/v2/email/send?apikey=11247b43-8015-4e70-b075-4327381d0e0f'
  var subject = `&subject="HEY! DON'T FORGET TO..."`
  var sender = '&from=' + 'adammateo@gmail.com'
  var senderName = '&fromName' + 'Seeker'
  var receiver = '&to=' + `adammateo@gmail.com` //donaters email address
  var message = '&bodyText=' + 'Hey there, you have asked us to remind you about ' +  reminder.text_desc + '. \n\n Thanks for using Seeker! \n\n'
  var isTransactional = '&isTransactional=true'

  var URL = rootUrl + subject + sender + senderName + receiver + message + isTransactional

  axios.post(URL)
  .then((response) => {
    console.log('email sent')
  })
  .catch((err) => {
    throw(err)
  })
}

module.exports = sendReminder



